import {
  canUseModulePermission,
  createEnabledModuleSet,
  createPermissionSet,
} from "@/features/rbac";
import type { ModuleCode, PermissionCode } from "@/features/rbac";

export type HealthActionContext = {
  organizationId: string;
  membershipId?: string | null;
  enabledModules: ModuleCode[];
  permissions: PermissionCode[];
};

export class HealthAccessError extends Error {
  constructor(message = "Acces sanitaire refuse.") {
    super(message);
    this.name = "HealthAccessError";
  }
}

export function assertCanReadHealth(context: HealthActionContext): void {
  assertCanUseHealthPermission(context, "health.read");
}

export function assertCanWriteHealth(context: HealthActionContext): void {
  assertCanUseHealthPermission(context, "health.write");
}

function assertCanUseHealthPermission(
  context: HealthActionContext,
  permission: PermissionCode,
): void {
  const enabledModules = createEnabledModuleSet(
    context.enabledModules.filter((module) =>
      module === "health" || module === "varroa" || module === "hornet"
    ),
  );
  const permissions = createPermissionSet(context.permissions);

  if (!canUseModulePermission(permissions, enabledModules, "health", permission)) {
    throw new HealthAccessError();
  }
}
