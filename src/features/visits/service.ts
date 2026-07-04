import type { PrismaClient } from "@prisma/client";

import {
  assertCanReadVisits,
  assertCanWriteVisits,
  type VisitActionContext,
} from "./access";
import { canEditVisit } from "./status";
import { prisma } from "./prisma";
import type {
  VisitObservationSummary,
  VisitStatus,
  VisitSummary,
} from "./types";
import {
  normalizeOptionalDate,
  normalizeOptionalInteger,
  normalizeOptionalText,
  requireText,
  requireVisitObservationCategory,
  requireVisitStatus,
} from "./validation";

type VisitReader = Pick<
  PrismaClient,
  "apiary" | "hive" | "colony" | "visit" | "visitObservation"
>;
type VisitDatabase = VisitReader & Pick<PrismaClient, "$transaction">;

export type VisitCommandResult<T> = {
  ok: true;
  data: T;
};

export type CreateVisitInput = {
  apiaryId?: string | null;
  hiveId?: string | null;
  colonyId?: string | null;
  status?: string | null;
  visitedAt?: Date | string | null;
  objective?: string | null;
  weatherSummary?: string | null;
  colonyStrength?: number | string | null;
  notes?: string | null;
  followUpSummary?: string | null;
};

export type UpdateVisitStatusInput = {
  visitId: string;
  status: string;
};

export type AddVisitObservationInput = {
  visitId: string;
  category: string;
  label: string;
  value?: string | null;
  notes?: string | null;
};

export async function listVisits(
  context: VisitActionContext,
  db: VisitReader = prisma,
): Promise<VisitSummary[]> {
  assertCanReadVisits(context);

  const visits = await db.visit.findMany({
    where: {
      organizationId: context.organizationId,
      archivedAt: null,
    },
    orderBy: [{ visitedAt: "desc" }, { createdAt: "desc" }],
  });

  return visits.map(toVisitSummary);
}

export async function createVisit(
  context: VisitActionContext,
  input: CreateVisitInput,
  db: VisitDatabase = prisma,
): Promise<VisitCommandResult<VisitSummary>> {
  assertCanWriteVisits(context);

  return db.$transaction(async (tx) => {
    const apiaryId = normalizeOptionalText(input.apiaryId);
    const hiveId = normalizeOptionalText(input.hiveId);
    const colonyId = normalizeOptionalText(input.colonyId);
    const status = input.status ? requireVisitStatus(input.status) : "DRAFT";

    assertVisitCanBeCreatedWithStatus(status);
    await assertApiaryBelongsToOrganization(tx, context.organizationId, apiaryId);
    await assertHiveBelongsToOrganization(tx, context.organizationId, hiveId);
    await assertColonyBelongsToOrganization(tx, context.organizationId, colonyId);

    const visit = await tx.visit.create({
      data: {
        organizationId: context.organizationId,
        apiaryId,
        hiveId,
        colonyId,
        authorMembershipId: context.membershipId ?? null,
        status,
        visitedAt: normalizeOptionalDate(input.visitedAt),
        objective: normalizeOptionalText(input.objective),
        weatherSummary: normalizeOptionalText(input.weatherSummary),
        colonyStrength: normalizeOptionalInteger(input.colonyStrength),
        notes: normalizeOptionalText(input.notes),
        followUpSummary: normalizeOptionalText(input.followUpSummary),
      },
    });

    return { ok: true, data: toVisitSummary(visit) };
  });
}

export async function updateVisitStatus(
  context: VisitActionContext,
  input: UpdateVisitStatusInput,
  db: VisitDatabase = prisma,
): Promise<VisitCommandResult<VisitSummary>> {
  assertCanWriteVisits(context);

  return db.$transaction(async (tx) => {
    const visit = await tx.visit.findFirstOrThrow({
      where: {
        id: requireText(input.visitId, "La visite"),
        organizationId: context.organizationId,
      },
    });

    if (!canEditVisit(visit.status)) {
      throw new Error("Une visite terminee, annulee ou archivee ne peut plus etre modifiee.");
    }

    const status = requireVisitStatus(input.status);
    const updatedVisit = await tx.visit.update({
      where: { id: visit.id },
      data: { status },
    });

    return { ok: true, data: toVisitSummary(updatedVisit) };
  });
}

export async function addVisitObservation(
  context: VisitActionContext,
  input: AddVisitObservationInput,
  db: VisitDatabase = prisma,
): Promise<VisitCommandResult<VisitObservationSummary>> {
  assertCanWriteVisits(context);

  return db.$transaction(async (tx) => {
    const visit = await tx.visit.findFirstOrThrow({
      where: {
        id: requireText(input.visitId, "La visite"),
        organizationId: context.organizationId,
      },
    });

    if (!canEditVisit(visit.status)) {
      throw new Error("Une visite terminee, annulee ou archivee ne peut plus recevoir d'observation.");
    }

    const observation = await tx.visitObservation.create({
      data: {
        organizationId: context.organizationId,
        visitId: visit.id,
        category: requireVisitObservationCategory(input.category),
        label: requireText(input.label, "Le libelle d'observation"),
        value: normalizeOptionalText(input.value),
        notes: normalizeOptionalText(input.notes),
      },
    });

    return { ok: true, data: toVisitObservationSummary(observation) };
  });
}

function assertVisitCanBeCreatedWithStatus(status: VisitStatus): void {
  if (status === "COMPLETED" || status === "ARCHIVED") {
    throw new Error("Une nouvelle visite doit demarrer en brouillon, prevue ou en cours.");
  }
}

async function assertApiaryBelongsToOrganization(
  db: VisitReader,
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
  db: VisitReader,
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
  db: VisitReader,
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

function toVisitSummary(visit: {
  id: string;
  organizationId: string;
  apiaryId: string | null;
  hiveId: string | null;
  colonyId: string | null;
  authorMembershipId: string | null;
  status: VisitStatus;
  visitedAt: Date | null;
  objective: string | null;
  followUpSummary: string | null;
}): VisitSummary {
  return {
    id: visit.id,
    organizationId: visit.organizationId,
    apiaryId: visit.apiaryId,
    hiveId: visit.hiveId,
    colonyId: visit.colonyId,
    authorMembershipId: visit.authorMembershipId,
    status: visit.status,
    visitedAt: visit.visitedAt,
    objective: visit.objective,
    followUpSummary: visit.followUpSummary,
  };
}

function toVisitObservationSummary(observation: {
  id: string;
  organizationId: string;
  visitId: string;
  category: VisitObservationSummary["category"];
  label: string;
  value: string | null;
}): VisitObservationSummary {
  return {
    id: observation.id,
    organizationId: observation.organizationId,
    visitId: observation.visitId,
    category: observation.category,
    label: observation.label,
    value: observation.value,
  };
}
