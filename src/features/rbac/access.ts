import type { ModuleCode } from "./modules";
import type { PermissionCode } from "./permissions";

export type PermissionSet = ReadonlySet<PermissionCode>;
export type EnabledModuleSet = ReadonlySet<ModuleCode>;
export type ModuleActivationStatus = "ENABLED" | "DISABLED";

export type ModuleActivationRecord = {
  code: ModuleCode;
  status: ModuleActivationStatus;
};

export function createPermissionSet(permissions: PermissionCode[]): PermissionSet {
  return new Set(permissions);
}

export function createEnabledModuleSet(modules: ModuleCode[]): EnabledModuleSet {
  return new Set(modules);
}

export function hasPermission(permissions: PermissionSet, permission: PermissionCode): boolean {
  return permissions.has(permission);
}

export function isModuleEnabled(modules: EnabledModuleSet, module: ModuleCode): boolean {
  return modules.has(module);
}

export function createEffectiveModuleSet(
  organizationModules: ModuleActivationRecord[],
  membershipModulePreferences: ModuleActivationRecord[] = [],
): EnabledModuleSet {
  const enabledModules = new Set<ModuleCode>(
    organizationModules
      .filter((module) => module.status === "ENABLED")
      .map((module) => module.code),
  );

  for (const preference of membershipModulePreferences) {
    if (preference.status === "DISABLED") {
      enabledModules.delete(preference.code);
    }
  }

  return enabledModules;
}

export function canUseModulePermission(
  permissions: PermissionSet,
  enabledModules: EnabledModuleSet,
  module: ModuleCode,
  permission: PermissionCode,
): boolean {
  return isModuleEnabled(enabledModules, module) && hasPermission(permissions, permission);
}
