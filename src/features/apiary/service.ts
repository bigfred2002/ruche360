import type { PrismaClient } from "@prisma/client";

import {
  assertCanReadApiaries,
  assertCanWriteApiaries,
  type ApiaryActionContext,
} from "./access";
import { prisma } from "./prisma";
import type {
  ApiaryDetail,
  ApiarySummary,
  ColonySummary,
  HiveDetail,
  HiveSummary,
} from "./types";
import {
  normalizeOptionalText,
  requireApiaryStatus,
  requireHiveStatus,
  requireText,
} from "./validation";

type ApiaryReader = Pick<PrismaClient, "apiary" | "hive">;
type ApiaryDatabase = ApiaryReader & Pick<PrismaClient, "$transaction">;

export type ApiaryCommandResult<T> = {
  ok: true;
  data: T;
};

export type CreateApiaryInput = {
  name: string;
  description?: string | null;
  locationDescription?: string | null;
  accessNotes?: string | null;
  status?: string | null;
};

export type CreateHiveInput = {
  apiaryId?: string | null;
  fieldIdentifier: string;
  hiveType?: string | null;
  status?: string | null;
  notes?: string | null;
};

export async function listApiaries(
  context: ApiaryActionContext,
  db: ApiaryReader = prisma,
): Promise<ApiarySummary[]> {
  assertCanReadApiaries(context);

  const apiaries = await db.apiary.findMany({
    where: {
      organizationId: context.organizationId,
      archivedAt: null,
    },
    include: {
      hives: {
        where: { archivedAt: null },
        select: { status: true },
      },
    },
    orderBy: [{ status: "asc" }, { name: "asc" }],
  });

  return apiaries.map((apiary) => ({
    id: apiary.id,
    organizationId: apiary.organizationId,
    name: apiary.name,
    description: apiary.description,
    locationDescription: apiary.locationDescription,
    accessNotes: apiary.accessNotes,
    status: apiary.status,
    hiveCount: apiary.hives.length,
    activeHiveCount: apiary.hives.filter((hive) => hive.status === "ACTIVE").length,
  }));
}

export async function getApiaryDetail(
  context: ApiaryActionContext,
  apiaryId: string,
  db: ApiaryReader = prisma,
): Promise<ApiaryDetail | null> {
  assertCanReadApiaries(context);

  const apiary = await db.apiary.findFirst({
    where: {
      id: apiaryId,
      organizationId: context.organizationId,
      archivedAt: null,
    },
    include: {
      hives: {
        where: { archivedAt: null },
        include: {
          colonies: {
            where: { archivedAt: null },
            orderBy: [{ status: "asc" }, { createdAt: "desc" }],
          },
        },
        orderBy: [{ status: "asc" }, { fieldIdentifier: "asc" }],
      },
    },
  });

  if (!apiary) {
    return null;
  }

  return {
    id: apiary.id,
    organizationId: apiary.organizationId,
    name: apiary.name,
    description: apiary.description,
    locationDescription: apiary.locationDescription,
    accessNotes: apiary.accessNotes,
    status: apiary.status,
    hiveCount: apiary.hives.length,
    activeHiveCount: apiary.hives.filter((hive) => hive.status === "ACTIVE").length,
    hives: apiary.hives.map((hive) => {
      const colonies = hive.colonies.map(toColonySummary);

      return {
        ...toHiveSummary(hive),
        colonyCount: colonies.length,
        activeColonyCount: colonies.filter((colony) => colony.status === "ACTIVE").length,
      };
    }),
  };
}

export async function listHives(
  context: ApiaryActionContext,
  db: ApiaryReader = prisma,
): Promise<HiveSummary[]> {
  assertCanReadApiaries(context);

  const hives = await db.hive.findMany({
    where: {
      organizationId: context.organizationId,
      archivedAt: null,
    },
    orderBy: [{ fieldIdentifier: "asc" }],
  });

  return hives.map(toHiveSummary);
}

export async function getHiveDetail(
  context: ApiaryActionContext,
  hiveId: string,
  db: ApiaryReader = prisma,
): Promise<HiveDetail | null> {
  assertCanReadApiaries(context);

  const hive = await db.hive.findFirst({
    where: {
      id: hiveId,
      organizationId: context.organizationId,
      archivedAt: null,
    },
    include: {
      apiary: true,
      colonies: {
        where: { archivedAt: null },
        orderBy: [{ status: "asc" }, { createdAt: "desc" }],
      },
    },
  });

  if (!hive) {
    return null;
  }

  const colonies = hive.colonies.map(toColonySummary);

  return {
    ...toHiveSummary(hive),
    apiaryName: hive.apiary?.name ?? null,
    colonies,
    colonyCount: colonies.length,
    activeColonyCount: colonies.filter((colony) => colony.status === "ACTIVE").length,
  };
}

export async function createApiary(
  context: ApiaryActionContext,
  input: CreateApiaryInput,
  db: ApiaryDatabase = prisma,
): Promise<ApiaryCommandResult<ApiarySummary>> {
  assertCanWriteApiaries(context);

  return db.$transaction(async (tx) => {
    const status = input.status ? requireApiaryStatus(input.status) : "ACTIVE";
    const apiary = await tx.apiary.create({
      data: {
        organizationId: context.organizationId,
        name: requireText(input.name, "Le nom du rucher"),
        description: normalizeOptionalText(input.description),
        locationDescription: normalizeOptionalText(input.locationDescription),
        accessNotes: normalizeOptionalText(input.accessNotes),
        status,
      },
      include: {
        hives: {
          where: { archivedAt: null },
          select: { status: true },
        },
      },
    });

    return {
      ok: true,
      data: {
        id: apiary.id,
        organizationId: apiary.organizationId,
        name: apiary.name,
        description: apiary.description,
        locationDescription: apiary.locationDescription,
        accessNotes: apiary.accessNotes,
        status: apiary.status,
        hiveCount: 0,
        activeHiveCount: 0,
      },
    };
  });
}

export async function createHive(
  context: ApiaryActionContext,
  input: CreateHiveInput,
  db: ApiaryDatabase = prisma,
): Promise<ApiaryCommandResult<HiveSummary>> {
  assertCanWriteApiaries(context);

  return db.$transaction(async (tx) => {
    const apiaryId = normalizeOptionalText(input.apiaryId);

    if (apiaryId) {
      await tx.apiary.findFirstOrThrow({
        where: {
          id: apiaryId,
          organizationId: context.organizationId,
          archivedAt: null,
        },
      });
    }

    const status = input.status ? requireHiveStatus(input.status) : "ACTIVE";
    const hive = await tx.hive.create({
      data: {
        organizationId: context.organizationId,
        apiaryId,
        fieldIdentifier: requireText(input.fieldIdentifier, "L'identifiant de ruche"),
        hiveType: normalizeOptionalText(input.hiveType),
        status,
        notes: normalizeOptionalText(input.notes),
      },
    });

    return { ok: true, data: toHiveSummary(hive) };
  });
}

function toHiveSummary(hive: {
  id: string;
  organizationId: string;
  apiaryId: string | null;
  fieldIdentifier: string;
  hiveType: string | null;
  status: HiveSummary["status"];
  notes: string | null;
}): HiveSummary {
  return {
    id: hive.id,
    organizationId: hive.organizationId,
    apiaryId: hive.apiaryId,
    fieldIdentifier: hive.fieldIdentifier,
    hiveType: hive.hiveType,
    status: hive.status,
    notes: hive.notes,
  };
}

function toColonySummary(colony: {
  id: string;
  organizationId: string;
  hiveId: string | null;
  status: ColonySummary["status"];
  queenKnown: boolean;
}): ColonySummary {
  return {
    id: colony.id,
    organizationId: colony.organizationId,
    hiveId: colony.hiveId,
    status: colony.status,
    queenKnown: colony.queenKnown,
  };
}
