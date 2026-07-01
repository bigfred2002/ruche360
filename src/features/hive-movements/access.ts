import {
  canUseModulePermission,
  createEnabledModuleSet,
  createPermissionSet,
} from "@/features/rbac";
import type { ModuleCode, PermissionCode } from "@/features/rbac";

export type HiveMovementActionContext = {
  organizationId: string;
  membershipId?: string | null;
  enabledModules: ModuleCode[];
  permissions: PermissionCode[];
};

export class HiveMovementAccessError extends Error {
  constructor(message = "Accès transhumance refusé.") {
    super(message);
    this.name = "HiveMovementAccessError";
  }
}

export function assertCanReadHiveMovements(context: HiveMovementActionContext): void {
  assertCanUseHiveMovementPermission(context, "transhumance.read");
}

export function assertCanWriteHiveMovements(context: HiveMovementActionContext): void {
  assertCanUseHiveMovementPermission(context, "transhumance.write");
}

export function assertCanManageHiveMovements(context: HiveMovementActionContext): void {
  assertCanUseHiveMovementPermission(context, "transhumance.manage");
}

function assertCanUseHiveMovementPermission(
  context: HiveMovementActionContext,
  permission: PermissionCode,
): void {
  const enabledModules = createEnabledModuleSet(
    context.enabledModules.filter((module) => module === "transhumance"),
  );
  const permissions = createPermissionSet(context.permissions);

  if (!canUseModulePermission(permissions, enabledModules, "transhumance", permission)) {
    throw new HiveMovementAccessError();
  }
}
