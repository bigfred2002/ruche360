import type { ActiveSessionScope } from "@/features/auth";

import { prisma } from "./prisma";

export type AdminDataMetric = {
  label: string;
  value: number;
  detail: string;
  state: "active" | "archived" | "disabled" | "muted";
};

export type AdminDataOverview = {
  organizationName: string;
  members: {
    total: number;
    active: number;
  };
  modules: {
    enabled: number;
    disabled: number;
  };
  apiaries: {
    total: number;
    active: number;
    archived: number;
  };
  hives: {
    total: number;
    active: number;
    archived: number;
  };
  colonies: {
    total: number;
    active: number;
    archived: number;
  };
  equipment: {
    types: number;
    stocks: number;
    items: number;
    events: number;
  };
  transhumance: {
    total: number;
    planned: number;
    inProgress: number;
    completed: number;
  };
};

export async function getAdminDataOverview(
  scope: ActiveSessionScope,
): Promise<AdminDataOverview | null> {
  const organizationId = scope.organizationId;

  const [
    organization,
    membersTotal,
    membersActive,
    modulesEnabled,
    modulesDisabled,
    apiariesTotal,
    apiariesActive,
    apiariesArchived,
    hivesTotal,
    hivesActive,
    hivesArchived,
    coloniesTotal,
    coloniesActive,
    coloniesArchived,
    equipmentTypes,
    equipmentStocks,
    equipmentItems,
    equipmentEvents,
    movementsTotal,
    movementsPlanned,
    movementsInProgress,
    movementsCompleted,
  ] = await prisma.$transaction([
    prisma.organization.findUnique({
      select: { name: true },
      where: { id: organizationId },
    }),
    prisma.membership.count({ where: { organizationId } }),
    prisma.membership.count({ where: { organizationId, status: "ACTIVE" } }),
    prisma.organizationModule.count({
      where: { organizationId, status: "ENABLED" },
    }),
    prisma.organizationModule.count({
      where: { organizationId, status: "DISABLED" },
    }),
    prisma.apiary.count({ where: { organizationId } }),
    prisma.apiary.count({ where: { organizationId, status: "ACTIVE" } }),
    prisma.apiary.count({ where: { organizationId, archivedAt: { not: null } } }),
    prisma.hive.count({ where: { organizationId } }),
    prisma.hive.count({ where: { organizationId, status: "ACTIVE" } }),
    prisma.hive.count({ where: { organizationId, archivedAt: { not: null } } }),
    prisma.colony.count({ where: { organizationId } }),
    prisma.colony.count({ where: { organizationId, status: "ACTIVE" } }),
    prisma.colony.count({ where: { organizationId, archivedAt: { not: null } } }),
    prisma.equipmentType.count({ where: { organizationId } }),
    prisma.equipmentStock.count({ where: { organizationId } }),
    prisma.equipmentItem.count({ where: { organizationId } }),
    prisma.equipmentEvent.count({ where: { organizationId } }),
    prisma.hiveMovement.count({ where: { organizationId } }),
    prisma.hiveMovement.count({ where: { organizationId, status: "PLANNED" } }),
    prisma.hiveMovement.count({
      where: { organizationId, status: "IN_PROGRESS" },
    }),
    prisma.hiveMovement.count({
      where: { organizationId, status: "COMPLETED" },
    }),
  ]);

  if (!organization) {
    return null;
  }

  return {
    organizationName: organization.name,
    members: {
      total: membersTotal,
      active: membersActive,
    },
    modules: {
      enabled: modulesEnabled,
      disabled: modulesDisabled,
    },
    apiaries: {
      total: apiariesTotal,
      active: apiariesActive,
      archived: apiariesArchived,
    },
    hives: {
      total: hivesTotal,
      active: hivesActive,
      archived: hivesArchived,
    },
    colonies: {
      total: coloniesTotal,
      active: coloniesActive,
      archived: coloniesArchived,
    },
    equipment: {
      types: equipmentTypes,
      stocks: equipmentStocks,
      items: equipmentItems,
      events: equipmentEvents,
    },
    transhumance: {
      total: movementsTotal,
      planned: movementsPlanned,
      inProgress: movementsInProgress,
      completed: movementsCompleted,
    },
  };
}

export function createAdminDataMetrics(
  overview: AdminDataOverview,
): AdminDataMetric[] {
  return [
    {
      label: "Membres",
      value: overview.members.total,
      detail: `${overview.members.active} adhésion(s) active(s)`,
      state: "active",
    },
    {
      label: "Modules actifs",
      value: overview.modules.enabled,
      detail: `${overview.modules.disabled} module(s) désactivé(s), données conservées`,
      state: overview.modules.disabled > 0 ? "disabled" : "active",
    },
    {
      label: "Ruchers",
      value: overview.apiaries.total,
      detail: `${overview.apiaries.active} actif(s), ${overview.apiaries.archived} archivé(s)`,
      state: overview.apiaries.archived > 0 ? "archived" : "active",
    },
    {
      label: "Ruches",
      value: overview.hives.total,
      detail: `${overview.hives.active} active(s), ${overview.hives.archived} archivée(s)`,
      state: overview.hives.archived > 0 ? "archived" : "active",
    },
    {
      label: "Colonies",
      value: overview.colonies.total,
      detail: `${overview.colonies.active} active(s), ${overview.colonies.archived} archivée(s)`,
      state: overview.colonies.archived > 0 ? "archived" : "active",
    },
    {
      label: "Matériel",
      value: overview.equipment.types + overview.equipment.items,
      detail: `${overview.equipment.types} type(s), ${overview.equipment.stocks} stock(s), ${overview.equipment.events} événement(s)`,
      state: "active",
    },
    {
      label: "Transhumance",
      value: overview.transhumance.total,
      detail: `${overview.transhumance.planned} prévue(s), ${overview.transhumance.inProgress} en cours, ${overview.transhumance.completed} terminée(s)`,
      state: overview.transhumance.inProgress > 0 ? "archived" : "muted",
    },
  ];
}

