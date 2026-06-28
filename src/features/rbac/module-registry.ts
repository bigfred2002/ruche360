import {
  hasPermission,
  isModuleEnabled,
  type EnabledModuleSet,
  type PermissionSet,
} from "./access";
import { modules, type ModuleCode, type ModuleDefinition } from "./modules";
import type { PermissionCode } from "./permissions";

export const moduleAvailabilityStatuses = ["ACTIVE", "DISABLED", "PLANNED"] as const;
export const moduleNavigationSurfaces = ["mobile", "desktop", "catalog"] as const;

export type ModuleAvailabilityStatus = (typeof moduleAvailabilityStatuses)[number];
export type ModuleNavigationSurface = (typeof moduleNavigationSurfaces)[number];

export type ModuleRegistryEntry = ModuleDefinition & {
  route: string | null;
  requiredPermissions: PermissionCode[];
  availability: ModuleAvailabilityStatus;
  navigation: ReadonlySet<ModuleNavigationSurface>;
};

type ModuleRegistryConfig = {
  route: string | null;
  requiredPermissions: PermissionCode[];
  availability: ModuleAvailabilityStatus;
  navigation: ModuleNavigationSurface[];
};

const moduleRegistryConfig = {
  organizations: {
    route: "/organization",
    requiredPermissions: ["organization.manage"],
    availability: "ACTIVE",
    navigation: ["desktop", "catalog"],
  },
  users_roles: {
    route: "/organization/members",
    requiredPermissions: ["users.manage", "roles.manage"],
    availability: "ACTIVE",
    navigation: ["desktop", "catalog"],
  },
  apiaries: {
    route: "/apiaries",
    requiredPermissions: ["apiaries.read"],
    availability: "ACTIVE",
    navigation: ["mobile", "desktop", "catalog"],
  },
  hives: {
    route: "/hives",
    requiredPermissions: ["hives.read"],
    availability: "ACTIVE",
    navigation: ["desktop", "catalog"],
  },
  colonies: {
    route: "/colonies",
    requiredPermissions: ["colonies.read"],
    availability: "ACTIVE",
    navigation: ["desktop", "catalog"],
  },
  visits: {
    route: "/visits",
    requiredPermissions: ["visits.read"],
    availability: "ACTIVE",
    navigation: ["mobile", "desktop", "catalog"],
  },
  tasks: {
    route: "/tasks",
    requiredPermissions: ["tasks.read"],
    availability: "ACTIVE",
    navigation: ["catalog"],
  },
  health: {
    route: "/health",
    requiredPermissions: ["health.read"],
    availability: "ACTIVE",
    navigation: ["catalog"],
  },
  varroa: {
    route: "/health/varroa",
    requiredPermissions: ["health.read"],
    availability: "ACTIVE",
    navigation: ["catalog"],
  },
  hornet: {
    route: "/health/hornet",
    requiredPermissions: ["health.read"],
    availability: "ACTIVE",
    navigation: ["catalog"],
  },
  knowledge: {
    route: "/knowledge",
    requiredPermissions: ["knowledge.read"],
    availability: "ACTIVE",
    navigation: ["mobile", "desktop", "catalog"],
  },
  contacts: {
    route: "/contacts",
    requiredPermissions: ["contacts.read"],
    availability: "ACTIVE",
    navigation: ["catalog"],
  },
  documents: {
    route: "/documents",
    requiredPermissions: ["documents.read"],
    availability: "ACTIVE",
    navigation: ["catalog"],
  },
  harvests: {
    route: "/harvests",
    requiredPermissions: ["harvests.read"],
    availability: "ACTIVE",
    navigation: ["catalog"],
  },
  equipment: {
    route: "/equipment",
    requiredPermissions: ["equipment.read"],
    availability: "PLANNED",
    navigation: ["catalog"],
  },
  low_power_config: {
    route: "/low-power",
    requiredPermissions: [],
    availability: "PLANNED",
    navigation: ["catalog"],
  },
  connected_scale: {
    route: null,
    requiredPermissions: [],
    availability: "DISABLED",
    navigation: ["catalog"],
  },
  apiary_weather: {
    route: null,
    requiredPermissions: [],
    availability: "DISABLED",
    navigation: ["catalog"],
  },
  camera: {
    route: null,
    requiredPermissions: [],
    availability: "DISABLED",
    navigation: ["catalog"],
  },
  sensors: {
    route: null,
    requiredPermissions: [],
    availability: "DISABLED",
    navigation: ["catalog"],
  },
  gps: {
    route: null,
    requiredPermissions: [],
    availability: "DISABLED",
    navigation: ["catalog"],
  },
  ai_visit_analysis: {
    route: null,
    requiredPermissions: [],
    availability: "DISABLED",
    navigation: ["catalog"],
  },
  ai_knowledge_assistant: {
    route: null,
    requiredPermissions: [],
    availability: "DISABLED",
    navigation: ["catalog"],
  },
  ai_species_recognition: {
    route: null,
    requiredPermissions: [],
    availability: "DISABLED",
    navigation: ["catalog"],
  },
  ai_varroa_counting: {
    route: null,
    requiredPermissions: [],
    availability: "DISABLED",
    navigation: ["catalog"],
  },
} satisfies Record<ModuleCode, ModuleRegistryConfig>;

export const moduleRegistry: ModuleRegistryEntry[] = modules.map((module) => {
  const config = moduleRegistryConfig[module.code];

  return {
    ...module,
    route: config.route,
    requiredPermissions: config.requiredPermissions,
    availability: config.availability,
    navigation: new Set(config.navigation),
  };
});

export function getModuleRegistryEntry(module: ModuleCode): ModuleRegistryEntry {
  const entry = moduleRegistry.find((candidate) => candidate.code === module);

  if (!entry) {
    throw new Error(`Unknown module registry entry: ${module}`);
  }

  return entry;
}

export function canDisplayModuleEntry(
  entry: ModuleRegistryEntry,
  enabledModules: EnabledModuleSet,
  permissions: PermissionSet,
  surface: ModuleNavigationSurface,
): boolean {
  if (entry.availability !== "ACTIVE" || !entry.navigation.has(surface)) {
    return false;
  }

  if (!isModuleEnabled(enabledModules, entry.code)) {
    return false;
  }

  if (entry.requiredPermissions.length === 0) {
    return true;
  }

  return entry.requiredPermissions.some((permission) => hasPermission(permissions, permission));
}

export function getVisibleModuleEntries(
  enabledModules: EnabledModuleSet,
  permissions: PermissionSet,
  surface: ModuleNavigationSurface,
): ModuleRegistryEntry[] {
  return moduleRegistry.filter((entry) =>
    canDisplayModuleEntry(entry, enabledModules, permissions, surface),
  );
}
