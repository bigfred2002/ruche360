import type { PrismaClient } from "@prisma/client";

import {
  assertCanManageHiveMovements,
  assertCanReadHiveMovements,
  assertCanWriteHiveMovements,
  type HiveMovementActionContext,
} from "./access";
import { prisma } from "./prisma";
import type {
  HiveMovementReason,
  HiveMovementStatus,
  HiveMovementSummary,
} from "./types";
import {
  normalizeOptionalDate,
  normalizeOptionalText,
  requireDate,
  requireHiveIds,
  requireHiveMovementReason,
  requireHiveMovementStatus,
  requireText,
} from "./validation";

type HiveMovementReader = Pick<PrismaClient, "apiary" | "hive" | "hiveMovement">;
type HiveMovementDatabase = HiveMovementReader & Pick<PrismaClient, "$transaction">;

export type HiveMovementCommandResult<T> = {
  ok: true;
  data: T;
};

export type CreateHiveMovementInput = {
  destinationApiaryId: string;
  sourceApiaryId?: string | null;
  departureDate: Date | string;
  arrivalDate?: Date | string | null;
  reason?: string | null;
  notes?: string | null;
  hiveIds?: string[];
};

export type AddHivesToMovementInput = {
  movementId: string;
  hiveIds: string[];
  notes?: string | null;
};

export type UpdateHiveMovementStatusInput = {
  movementId: string;
  status: string;
  arrivalDate?: Date | string | null;
  notes?: string | null;
};

export async function listHiveMovements(
  context: HiveMovementActionContext,
  db: HiveMovementDatabase = prisma,
): Promise<HiveMovementSummary[]> {
  assertCanReadHiveMovements(context);

  const movements = await db.hiveMovement.findMany({
    where: { organizationId: context.organizationId },
    include: { items: true },
    orderBy: [{ departureDate: "desc" }, { createdAt: "desc" }],
  });

  return movements.map(toHiveMovementSummary);
}

export async function createHiveMovement(
  context: HiveMovementActionContext,
  input: CreateHiveMovementInput,
  db: HiveMovementDatabase = prisma,
): Promise<HiveMovementCommandResult<HiveMovementSummary>> {
  assertCanWriteHiveMovements(context);

  return db.$transaction(async (tx) => {
    const destinationApiaryId = requireText(input.destinationApiaryId, "Le rucher destination");
    const sourceApiaryId = normalizeOptionalText(input.sourceApiaryId);
    const hiveIds = requireHiveIds(input.hiveIds);
    const departureDate = requireDate(input.departureDate, "La date de depart");
    const arrivalDate = normalizeOptionalDate(input.arrivalDate);
    const reason = input.reason ? requireHiveMovementReason(input.reason) : "OTHER";

    await assertApiaryBelongsToOrganization(tx, context.organizationId, destinationApiaryId);
    await assertApiaryBelongsToOrganization(tx, context.organizationId, sourceApiaryId);
    await assertHivesBelongToOrganization(tx, context.organizationId, hiveIds);

    const movement = await tx.hiveMovement.create({
      data: {
        organizationId: context.organizationId,
        sourceApiaryId,
        destinationApiaryId,
        authorMembershipId: context.membershipId ?? null,
        departureDate,
        arrivalDate,
        reason,
        notes: normalizeOptionalText(input.notes),
        items: {
          create: hiveIds.map((hiveId) => ({ hiveId })),
        },
      },
      include: { items: true },
    });

    return { ok: true, data: toHiveMovementSummary(movement) };
  });
}

export async function addHivesToMovement(
  context: HiveMovementActionContext,
  input: AddHivesToMovementInput,
  db: HiveMovementDatabase = prisma,
): Promise<HiveMovementCommandResult<HiveMovementSummary>> {
  assertCanWriteHiveMovements(context);

  return db.$transaction(async (tx) => {
    const movement = await tx.hiveMovement.findFirstOrThrow({
      where: {
        id: requireText(input.movementId, "Le mouvement"),
        organizationId: context.organizationId,
      },
      include: { items: true },
    });

    assertMovementCanBeEdited(movement.status);

    const hiveIds = requireHiveIds(input.hiveIds);
    await assertHivesBelongToOrganization(tx, context.organizationId, hiveIds);

    await Promise.all(
      hiveIds.map((hiveId) =>
        tx.hiveMovementItem.upsert({
          where: {
            movementId_hiveId: {
              movementId: movement.id,
              hiveId,
            },
          },
          create: {
            movementId: movement.id,
            hiveId,
            notes: normalizeOptionalText(input.notes),
          },
          update: {
            notes: normalizeOptionalText(input.notes),
          },
        }),
      ),
    );

    const updatedMovement = await tx.hiveMovement.findFirstOrThrow({
      where: { id: movement.id, organizationId: context.organizationId },
      include: { items: true },
    });

    return { ok: true, data: toHiveMovementSummary(updatedMovement) };
  });
}

export async function updateHiveMovementStatus(
  context: HiveMovementActionContext,
  input: UpdateHiveMovementStatusInput,
  db: HiveMovementDatabase = prisma,
): Promise<HiveMovementCommandResult<HiveMovementSummary>> {
  const status = requireHiveMovementStatus(input.status);

  if (status === "CANCELLED") {
    assertCanManageHiveMovements(context);
  } else {
    assertCanWriteHiveMovements(context);
  }

  return db.$transaction(async (tx) => {
    const movement = await tx.hiveMovement.findFirstOrThrow({
      where: {
        id: requireText(input.movementId, "Le mouvement"),
        organizationId: context.organizationId,
      },
      include: { items: true },
    });

    assertMovementCanBeEdited(movement.status);

    const arrivalDate =
      status === "COMPLETED"
        ? normalizeOptionalDate(input.arrivalDate) ?? new Date()
        : normalizeOptionalDate(input.arrivalDate);

    const updatedMovement = await tx.hiveMovement.update({
      where: { id: movement.id },
      data: {
        status,
        arrivalDate,
        notes: normalizeOptionalText(input.notes) ?? movement.notes,
      },
      include: { items: true },
    });

    if (status === "COMPLETED") {
      await tx.hive.updateMany({
        where: {
          id: { in: movement.items.map((item) => item.hiveId) },
          organizationId: context.organizationId,
          archivedAt: null,
        },
        data: { apiaryId: movement.destinationApiaryId },
      });
    }

    return { ok: true, data: toHiveMovementSummary(updatedMovement) };
  });
}

function assertMovementCanBeEdited(status: HiveMovementStatus): void {
  if (status === "COMPLETED" || status === "CANCELLED") {
    throw new Error("Un mouvement termine ou annule ne peut plus etre modifie.");
  }
}

async function assertApiaryBelongsToOrganization(
  db: HiveMovementReader,
  organizationId: string,
  apiaryId: string | null | undefined,
): Promise<void> {
  const normalizedApiaryId = normalizeOptionalText(apiaryId);

  if (!normalizedApiaryId) {
    return;
  }

  await db.apiary.findFirstOrThrow({
    where: { id: normalizedApiaryId, organizationId, archivedAt: null },
  });
}

async function assertHivesBelongToOrganization(
  db: HiveMovementReader,
  organizationId: string,
  hiveIds: string[],
): Promise<void> {
  const hives = await db.hive.findMany({
    where: {
      id: { in: hiveIds },
      organizationId,
      archivedAt: null,
    },
    select: { id: true },
  });

  if (hives.length !== hiveIds.length) {
    throw new Error("Une ou plusieurs ruches ne sont pas disponibles dans l'organisation.");
  }
}

function toHiveMovementSummary(movement: {
  id: string;
  destinationApiaryId: string;
  sourceApiaryId: string | null;
  departureDate: Date;
  arrivalDate: Date | null;
  status: HiveMovementStatus;
  reason: HiveMovementReason;
  items: {
    hiveId: string;
    notes: string | null;
  }[];
}): HiveMovementSummary {
  return {
    id: movement.id,
    destinationApiaryId: movement.destinationApiaryId,
    sourceApiaryId: movement.sourceApiaryId,
    departureDate: movement.departureDate,
    arrivalDate: movement.arrivalDate,
    status: movement.status,
    reason: movement.reason,
    items: movement.items.map((item) => ({
      hiveId: item.hiveId,
      notes: item.notes,
    })),
  };
}
