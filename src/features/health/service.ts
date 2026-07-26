import type { PrismaClient } from "@prisma/client";

import {
  assertCanReadHealth,
  assertCanWriteHealth,
  type HealthActionContext,
} from "./access";
import { prisma } from "./prisma";
import type {
  HealthObservationSummary,
  HornetRecordSummary,
  VarroaRecordSummary,
} from "./types";
import {
  normalizeOptionalDate,
  normalizeOptionalDecimalText,
  normalizeOptionalInteger,
  normalizeOptionalText,
  requireHealthObservationCategory,
  requireHealthSeverity,
  requireHornetPressureLevel,
  requireText,
  requireVarroaCheckMethod,
} from "./validation";

type HealthReader = Pick<
  PrismaClient,
  | "apiary"
  | "hive"
  | "colony"
  | "visit"
  | "healthObservation"
  | "varroaRecord"
  | "hornetRecord"
>;
type HealthDatabase = HealthReader & Pick<PrismaClient, "$transaction">;

export type HealthCommandResult<T> = {
  ok: true;
  data: T;
};

export type CreateHealthObservationInput = {
  apiaryId?: string | null;
  hiveId?: string | null;
  colonyId?: string | null;
  visitId?: string | null;
  category?: string | null;
  severity?: string | null;
  observedAt?: Date | string | null;
  label: string;
  notes?: string | null;
};

export type CreateVarroaRecordInput = {
  apiaryId?: string | null;
  hiveId?: string | null;
  colonyId?: string | null;
  visitId?: string | null;
  method?: string | null;
  observedAt?: Date | string | null;
  miteCount?: number | string | null;
  sampleSize?: number | string | null;
  infestationRate?: number | string | null;
  notes?: string | null;
};

export type CreateHornetRecordInput = {
  apiaryId?: string | null;
  visitId?: string | null;
  pressure?: string | null;
  observedAt?: Date | string | null;
  hornetCount?: number | string | null;
  trapCount?: number | string | null;
  notes?: string | null;
};

export async function listHealthObservations(
  context: HealthActionContext,
  db: HealthReader = prisma,
): Promise<HealthObservationSummary[]> {
  assertCanReadHealth(context);

  const observations = await db.healthObservation.findMany({
    where: {
      organizationId: context.organizationId,
      archivedAt: null,
    },
    orderBy: [{ observedAt: "desc" }, { createdAt: "desc" }],
  });

  return observations.map(toHealthObservationSummary);
}

export async function listVarroaRecords(
  context: HealthActionContext,
  db: HealthReader = prisma,
): Promise<VarroaRecordSummary[]> {
  assertCanReadHealth(context);

  const records = await db.varroaRecord.findMany({
    where: {
      organizationId: context.organizationId,
      archivedAt: null,
    },
    orderBy: [{ observedAt: "desc" }, { createdAt: "desc" }],
  });

  return records.map(toVarroaRecordSummary);
}

export async function listHornetRecords(
  context: HealthActionContext,
  db: HealthReader = prisma,
): Promise<HornetRecordSummary[]> {
  assertCanReadHealth(context);

  const records = await db.hornetRecord.findMany({
    where: {
      organizationId: context.organizationId,
      archivedAt: null,
    },
    orderBy: [{ observedAt: "desc" }, { createdAt: "desc" }],
  });

  return records.map(toHornetRecordSummary);
}

export async function createHealthObservation(
  context: HealthActionContext,
  input: CreateHealthObservationInput,
  db: HealthDatabase = prisma,
): Promise<HealthCommandResult<HealthObservationSummary>> {
  assertCanWriteHealth(context);

  return db.$transaction(async (tx) => {
    const apiaryId = normalizeOptionalText(input.apiaryId);
    const hiveId = normalizeOptionalText(input.hiveId);
    const colonyId = normalizeOptionalText(input.colonyId);
    const visitId = normalizeOptionalText(input.visitId);

    await assertApiaryBelongsToOrganization(tx, context.organizationId, apiaryId);
    await assertHiveBelongsToOrganization(tx, context.organizationId, hiveId);
    await assertColonyBelongsToOrganization(tx, context.organizationId, colonyId);
    await assertVisitBelongsToOrganization(tx, context.organizationId, visitId);

    const observation = await tx.healthObservation.create({
      data: {
        organizationId: context.organizationId,
        apiaryId,
        hiveId,
        colonyId,
        visitId,
        authorMembershipId: context.membershipId ?? null,
        category: input.category
          ? requireHealthObservationCategory(input.category)
          : "GENERAL",
        severity: input.severity ? requireHealthSeverity(input.severity) : "INFO",
        observedAt: normalizeOptionalDate(input.observedAt) ?? new Date(),
        label: requireText(input.label, "Le libelle sanitaire"),
        notes: normalizeOptionalText(input.notes),
      },
    });

    return { ok: true, data: toHealthObservationSummary(observation) };
  });
}

export async function createVarroaRecord(
  context: HealthActionContext,
  input: CreateVarroaRecordInput,
  db: HealthDatabase = prisma,
): Promise<HealthCommandResult<VarroaRecordSummary>> {
  assertCanWriteHealth(context);

  return db.$transaction(async (tx) => {
    const apiaryId = normalizeOptionalText(input.apiaryId);
    const hiveId = normalizeOptionalText(input.hiveId);
    const colonyId = normalizeOptionalText(input.colonyId);
    const visitId = normalizeOptionalText(input.visitId);

    await assertApiaryBelongsToOrganization(tx, context.organizationId, apiaryId);
    await assertHiveBelongsToOrganization(tx, context.organizationId, hiveId);
    await assertColonyBelongsToOrganization(tx, context.organizationId, colonyId);
    await assertVisitBelongsToOrganization(tx, context.organizationId, visitId);

    const record = await tx.varroaRecord.create({
      data: {
        organizationId: context.organizationId,
        apiaryId,
        hiveId,
        colonyId,
        visitId,
        authorMembershipId: context.membershipId ?? null,
        method: input.method ? requireVarroaCheckMethod(input.method) : "VISUAL",
        observedAt: normalizeOptionalDate(input.observedAt) ?? new Date(),
        miteCount: normalizeOptionalInteger(input.miteCount, "Le nombre de varroas"),
        sampleSize: normalizeOptionalInteger(input.sampleSize, "La taille d'echantillon"),
        infestationRate: normalizeOptionalDecimalText(
          input.infestationRate,
          "Le taux varroa",
        ),
        notes: normalizeOptionalText(input.notes),
      },
    });

    return { ok: true, data: toVarroaRecordSummary(record) };
  });
}

export async function createHornetRecord(
  context: HealthActionContext,
  input: CreateHornetRecordInput,
  db: HealthDatabase = prisma,
): Promise<HealthCommandResult<HornetRecordSummary>> {
  assertCanWriteHealth(context);

  return db.$transaction(async (tx) => {
    const apiaryId = normalizeOptionalText(input.apiaryId);
    const visitId = normalizeOptionalText(input.visitId);

    await assertApiaryBelongsToOrganization(tx, context.organizationId, apiaryId);
    await assertVisitBelongsToOrganization(tx, context.organizationId, visitId);

    const record = await tx.hornetRecord.create({
      data: {
        organizationId: context.organizationId,
        apiaryId,
        visitId,
        authorMembershipId: context.membershipId ?? null,
        pressure: input.pressure ? requireHornetPressureLevel(input.pressure) : "NONE",
        observedAt: normalizeOptionalDate(input.observedAt) ?? new Date(),
        hornetCount: normalizeOptionalInteger(input.hornetCount, "Le nombre de frelons"),
        trapCount: normalizeOptionalInteger(input.trapCount, "Le nombre de pieges"),
        notes: normalizeOptionalText(input.notes),
      },
    });

    return { ok: true, data: toHornetRecordSummary(record) };
  });
}

async function assertApiaryBelongsToOrganization(
  db: HealthReader,
  organizationId: string,
  apiaryId: string | null | undefined,
): Promise<void> {
  if (!apiaryId) {
    return;
  }

  await db.apiary.findFirstOrThrow({
    where: { id: apiaryId, organizationId, archivedAt: null },
  });
}

async function assertHiveBelongsToOrganization(
  db: HealthReader,
  organizationId: string,
  hiveId: string | null | undefined,
): Promise<void> {
  if (!hiveId) {
    return;
  }

  await db.hive.findFirstOrThrow({
    where: { id: hiveId, organizationId, archivedAt: null },
  });
}

async function assertColonyBelongsToOrganization(
  db: HealthReader,
  organizationId: string,
  colonyId: string | null | undefined,
): Promise<void> {
  if (!colonyId) {
    return;
  }

  await db.colony.findFirstOrThrow({
    where: { id: colonyId, organizationId, archivedAt: null },
  });
}

async function assertVisitBelongsToOrganization(
  db: HealthReader,
  organizationId: string,
  visitId: string | null | undefined,
): Promise<void> {
  if (!visitId) {
    return;
  }

  await db.visit.findFirstOrThrow({
    where: { id: visitId, organizationId, archivedAt: null },
  });
}

function toHealthObservationSummary(observation: {
  id: string;
  organizationId: string;
  apiaryId: string | null;
  hiveId: string | null;
  colonyId: string | null;
  visitId: string | null;
  authorMembershipId: string | null;
  category: HealthObservationSummary["category"];
  severity: HealthObservationSummary["severity"];
  observedAt: Date;
  label: string;
  notes: string | null;
}): HealthObservationSummary {
  return {
    id: observation.id,
    organizationId: observation.organizationId,
    apiaryId: observation.apiaryId,
    hiveId: observation.hiveId,
    colonyId: observation.colonyId,
    visitId: observation.visitId,
    authorMembershipId: observation.authorMembershipId,
    category: observation.category,
    severity: observation.severity,
    observedAt: observation.observedAt,
    label: observation.label,
    notes: observation.notes,
  };
}

function toVarroaRecordSummary(record: {
  id: string;
  organizationId: string;
  apiaryId: string | null;
  hiveId: string | null;
  colonyId: string | null;
  visitId: string | null;
  authorMembershipId: string | null;
  method: VarroaRecordSummary["method"];
  observedAt: Date;
  miteCount: number | null;
  sampleSize: number | null;
  infestationRate: { toString(): string } | null;
  notes: string | null;
}): VarroaRecordSummary {
  return {
    id: record.id,
    organizationId: record.organizationId,
    apiaryId: record.apiaryId,
    hiveId: record.hiveId,
    colonyId: record.colonyId,
    visitId: record.visitId,
    authorMembershipId: record.authorMembershipId,
    method: record.method,
    observedAt: record.observedAt,
    miteCount: record.miteCount,
    sampleSize: record.sampleSize,
    infestationRate: record.infestationRate?.toString() ?? null,
    notes: record.notes,
  };
}

function toHornetRecordSummary(record: {
  id: string;
  organizationId: string;
  apiaryId: string | null;
  visitId: string | null;
  authorMembershipId: string | null;
  pressure: HornetRecordSummary["pressure"];
  observedAt: Date;
  hornetCount: number | null;
  trapCount: number | null;
  notes: string | null;
}): HornetRecordSummary {
  return {
    id: record.id,
    organizationId: record.organizationId,
    apiaryId: record.apiaryId,
    visitId: record.visitId,
    authorMembershipId: record.authorMembershipId,
    pressure: record.pressure,
    observedAt: record.observedAt,
    hornetCount: record.hornetCount,
    trapCount: record.trapCount,
    notes: record.notes,
  };
}
