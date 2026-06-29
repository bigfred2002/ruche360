import type { PrismaClient } from "@prisma/client";

import {
  assertCanManageEquipment,
  assertCanReadEquipment,
  assertCanWriteEquipment,
  type EquipmentActionContext,
} from "./access";
import { prisma } from "./prisma";
import type {
  EquipmentItemStatus,
  EquipmentItemSummary,
  EquipmentStockSummary,
  EquipmentTypeSummary,
} from "./types";
import {
  normalizeOptionalText,
  requireEquipmentItemStatus,
  requirePositiveQuantity,
  requireText,
  requireTrackingMode,
} from "./validation";

type EquipmentReader = Pick<
  PrismaClient,
  "apiary" | "equipmentEvent" | "equipmentItem" | "equipmentStock" | "equipmentType"
>;
type EquipmentDatabase = EquipmentReader & Pick<PrismaClient, "$transaction">;

export type EquipmentCommandResult<T> = {
  ok: true;
  data: T;
};

export type CreateEquipmentTypeInput = {
  name: string;
  category: string;
  trackingMode: string;
  code?: string | null;
  defaultUnit?: string | null;
  notes?: string | null;
};

export type CreateEquipmentStockInput = {
  equipmentTypeId: string;
  quantity: number;
  unit: string;
  apiaryId?: string | null;
  locationLabel?: string | null;
  notes?: string | null;
};

export type AdjustEquipmentStockInput = {
  stockId: string;
  quantityDelta: number;
  notes?: string | null;
};

export type CreateEquipmentItemInput = {
  equipmentTypeId: string;
  fieldIdentifier: string;
  apiaryId?: string | null;
  locationLabel?: string | null;
  notes?: string | null;
  status?: string | null;
};

export type UpdateEquipmentItemStatusInput = {
  itemId: string;
  status: string;
  notes?: string | null;
};

export type MoveEquipmentItemInput = {
  itemId: string;
  apiaryId?: string | null;
  locationLabel?: string | null;
  notes?: string | null;
};

export type EquipmentInventorySnapshot = {
  types: EquipmentTypeSummary[];
  stocks: EquipmentStockSummary[];
  items: EquipmentItemSummary[];
};

export async function listEquipmentInventory(
  context: EquipmentActionContext,
  db: EquipmentDatabase = prisma,
): Promise<EquipmentInventorySnapshot> {
  assertCanReadEquipment(context);

  const [types, stocks, items] = await Promise.all([
    db.equipmentType.findMany({
      where: {
        OR: [{ organizationId: context.organizationId }, { organizationId: null }],
        status: "ACTIVE",
      },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    }),
    db.equipmentStock.findMany({
      where: { organizationId: context.organizationId },
      orderBy: [{ updatedAt: "desc" }],
    }),
    db.equipmentItem.findMany({
      where: { organizationId: context.organizationId, archivedAt: null },
      orderBy: [{ updatedAt: "desc" }],
    }),
  ]);

  return {
    types: types.map(toEquipmentTypeSummary),
    stocks: stocks.map(toEquipmentStockSummary),
    items: items.map(toEquipmentItemSummary),
  };
}

export async function createEquipmentType(
  context: EquipmentActionContext,
  input: CreateEquipmentTypeInput,
  db: EquipmentDatabase = prisma,
): Promise<EquipmentCommandResult<EquipmentTypeSummary>> {
  assertCanManageEquipment(context);

  const type = await db.equipmentType.create({
    data: {
      organizationId: context.organizationId,
      code: normalizeOptionalText(input.code),
      name: requireText(input.name, "Le nom du type de matériel"),
      category: requireText(input.category, "La catégorie"),
      trackingMode: requireTrackingMode(input.trackingMode),
      defaultUnit: normalizeOptionalText(input.defaultUnit),
      notes: normalizeOptionalText(input.notes),
    },
  });

  return { ok: true, data: toEquipmentTypeSummary(type) };
}

export async function createEquipmentStock(
  context: EquipmentActionContext,
  input: CreateEquipmentStockInput,
  db: EquipmentDatabase = prisma,
): Promise<EquipmentCommandResult<EquipmentStockSummary>> {
  assertCanWriteEquipment(context);

  return db.$transaction(async (tx) => {
    const equipmentType = await getUsableEquipmentType(tx, context, input.equipmentTypeId);
    await assertApiaryBelongsToOrganization(tx, context.organizationId, input.apiaryId);

    const stock = await tx.equipmentStock.create({
      data: {
        organizationId: context.organizationId,
        equipmentTypeId: equipmentType.id,
        apiaryId: normalizeOptionalText(input.apiaryId),
        quantity: requirePositiveQuantity(input.quantity),
        unit: requireText(input.unit, "L'unité"),
        locationLabel: normalizeOptionalText(input.locationLabel),
        notes: normalizeOptionalText(input.notes),
      },
    });

    await tx.equipmentEvent.create({
      data: {
        organizationId: context.organizationId,
        equipmentTypeId: equipmentType.id,
        apiaryId: stock.apiaryId,
        eventType: "QUANTITY_ADJUSTED",
        quantity: stock.quantity,
        unit: stock.unit,
        targetLocation: stock.locationLabel,
        notes: normalizeOptionalText(input.notes) ?? "Création du stock initial.",
      },
    });

    return { ok: true, data: toEquipmentStockSummary(stock) };
  });
}

export async function adjustEquipmentStock(
  context: EquipmentActionContext,
  input: AdjustEquipmentStockInput,
  db: EquipmentDatabase = prisma,
): Promise<EquipmentCommandResult<EquipmentStockSummary>> {
  assertCanWriteEquipment(context);

  return db.$transaction(async (tx) => {
    const stock = await tx.equipmentStock.findFirstOrThrow({
      where: { id: input.stockId, organizationId: context.organizationId },
    });
    const quantityDelta = requireQuantityDelta(input.quantityDelta);
    const nextQuantity = Number(stock.quantity) + quantityDelta;

    if (nextQuantity < 0) {
      throw new Error("L'ajustement rendrait la quantité négative.");
    }

    const updatedStock = await tx.equipmentStock.update({
      where: { id: stock.id },
      data: { quantity: Number(nextQuantity.toFixed(3)) },
    });

    await tx.equipmentEvent.create({
      data: {
        organizationId: context.organizationId,
        equipmentTypeId: stock.equipmentTypeId,
        apiaryId: stock.apiaryId,
        eventType: "QUANTITY_ADJUSTED",
        quantity: quantityDelta,
        unit: stock.unit,
        targetLocation: stock.locationLabel,
        notes: normalizeOptionalText(input.notes),
      },
    });

    return { ok: true, data: toEquipmentStockSummary(updatedStock) };
  });
}

export async function createEquipmentItem(
  context: EquipmentActionContext,
  input: CreateEquipmentItemInput,
  db: EquipmentDatabase = prisma,
): Promise<EquipmentCommandResult<EquipmentItemSummary>> {
  assertCanWriteEquipment(context);

  return db.$transaction(async (tx) => {
    const equipmentType = await getUsableEquipmentType(tx, context, input.equipmentTypeId);
    await assertApiaryBelongsToOrganization(tx, context.organizationId, input.apiaryId);
    const status: EquipmentItemStatus = input.status
      ? requireEquipmentItemStatus(input.status)
      : "AVAILABLE";

    const item = await tx.equipmentItem.create({
      data: {
        organizationId: context.organizationId,
        equipmentTypeId: equipmentType.id,
        apiaryId: normalizeOptionalText(input.apiaryId),
        fieldIdentifier: requireText(input.fieldIdentifier, "L'identifiant terrain"),
        status,
        locationLabel: normalizeOptionalText(input.locationLabel),
        notes: normalizeOptionalText(input.notes),
      },
    });

    await tx.equipmentEvent.create({
      data: {
        organizationId: context.organizationId,
        equipmentTypeId: equipmentType.id,
        equipmentItemId: item.id,
        apiaryId: item.apiaryId,
        eventType: "ITEM_CREATED",
        targetLocation: item.locationLabel,
        notes: normalizeOptionalText(input.notes) ?? "Création de l'élément matériel.",
      },
    });

    return { ok: true, data: toEquipmentItemSummary(item) };
  });
}

export async function updateEquipmentItemStatus(
  context: EquipmentActionContext,
  input: UpdateEquipmentItemStatusInput,
  db: EquipmentDatabase = prisma,
): Promise<EquipmentCommandResult<EquipmentItemSummary>> {
  assertCanWriteEquipment(context);

  return db.$transaction(async (tx) => {
    const status = requireEquipmentItemStatus(input.status);
    const item = await tx.equipmentItem.findFirstOrThrow({
      where: { id: input.itemId, organizationId: context.organizationId, archivedAt: null },
    });
    const updatedItem = await tx.equipmentItem.update({
      where: { id: item.id },
      data: { status },
    });

    await tx.equipmentEvent.create({
      data: {
        organizationId: context.organizationId,
        equipmentTypeId: item.equipmentTypeId,
        equipmentItemId: item.id,
        apiaryId: item.apiaryId,
        eventType: eventTypeForStatus(status),
        targetLocation: item.locationLabel,
        notes: normalizeOptionalText(input.notes),
      },
    });

    return { ok: true, data: toEquipmentItemSummary(updatedItem) };
  });
}

export async function moveEquipmentItem(
  context: EquipmentActionContext,
  input: MoveEquipmentItemInput,
  db: EquipmentDatabase = prisma,
): Promise<EquipmentCommandResult<EquipmentItemSummary>> {
  assertCanWriteEquipment(context);

  return db.$transaction(async (tx) => {
    await assertApiaryBelongsToOrganization(tx, context.organizationId, input.apiaryId);

    const item = await tx.equipmentItem.findFirstOrThrow({
      where: { id: input.itemId, organizationId: context.organizationId, archivedAt: null },
    });
    const targetLocation = normalizeOptionalText(input.locationLabel);
    const targetApiaryId = normalizeOptionalText(input.apiaryId);
    const updatedItem = await tx.equipmentItem.update({
      where: { id: item.id },
      data: {
        apiaryId: targetApiaryId,
        locationLabel: targetLocation,
      },
    });

    await tx.equipmentEvent.create({
      data: {
        organizationId: context.organizationId,
        equipmentTypeId: item.equipmentTypeId,
        equipmentItemId: item.id,
        apiaryId: targetApiaryId,
        eventType: "MOVED",
        sourceLocation: item.locationLabel,
        targetLocation,
        notes: normalizeOptionalText(input.notes),
      },
    });

    return { ok: true, data: toEquipmentItemSummary(updatedItem) };
  });
}

function requireQuantityDelta(value: number): number {
  if (!Number.isFinite(value) || value === 0) {
    throw new Error("L'ajustement de quantité doit être non nul.");
  }

  return Number(value.toFixed(3));
}

async function getUsableEquipmentType(
  db: EquipmentReader,
  context: EquipmentActionContext,
  equipmentTypeId: string,
) {
  return db.equipmentType.findFirstOrThrow({
    where: {
      id: requireText(equipmentTypeId, "Le type de matériel"),
      status: "ACTIVE",
      OR: [{ organizationId: context.organizationId }, { organizationId: null }],
    },
  });
}

async function assertApiaryBelongsToOrganization(
  db: EquipmentReader,
  organizationId: string,
  apiaryId: string | null | undefined,
): Promise<void> {
  const normalizedApiaryId = normalizeOptionalText(apiaryId);

  if (!normalizedApiaryId) {
    return;
  }

  await db.apiary.findFirstOrThrow({
    where: { id: normalizedApiaryId, organizationId },
  });
}

function eventTypeForStatus(status: EquipmentItemStatus) {
  if (status === "MAINTENANCE") {
    return "MAINTENANCE";
  }

  if (status === "RETIRED" || status === "LOST") {
    return "RETIRED";
  }

  return "STATUS_CHANGED";
}

function toEquipmentTypeSummary(type: {
  id: string;
  organizationId: string | null;
  name: string;
  category: string;
  trackingMode: EquipmentTypeSummary["trackingMode"];
  status: EquipmentTypeSummary["status"];
}): EquipmentTypeSummary {
  return {
    id: type.id,
    organizationId: type.organizationId,
    name: type.name,
    category: type.category,
    trackingMode: type.trackingMode,
    status: type.status,
  };
}

function toEquipmentStockSummary(stock: {
  id: string;
  organizationId: string;
  equipmentTypeId: string;
  apiaryId: string | null;
  quantity: unknown;
  unit: string;
  locationLabel: string | null;
}): EquipmentStockSummary {
  return {
    id: stock.id,
    organizationId: stock.organizationId,
    equipmentTypeId: stock.equipmentTypeId,
    apiaryId: stock.apiaryId,
    quantity: Number(stock.quantity),
    unit: stock.unit,
    locationLabel: stock.locationLabel,
  };
}

function toEquipmentItemSummary(item: {
  id: string;
  organizationId: string;
  equipmentTypeId: string;
  apiaryId: string | null;
  fieldIdentifier: string;
  status: EquipmentItemStatus;
  locationLabel: string | null;
}): EquipmentItemSummary {
  return {
    id: item.id,
    organizationId: item.organizationId,
    equipmentTypeId: item.equipmentTypeId,
    apiaryId: item.apiaryId,
    fieldIdentifier: item.fieldIdentifier,
    status: item.status,
    locationLabel: item.locationLabel,
  };
}
