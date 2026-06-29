import {
  canUseModulePermission,
  createEnabledModuleSet,
  createPermissionSet,
} from "@/features/rbac";
import type { ModuleCode } from "@/features/rbac";
import type { PermissionCode } from "@/features/rbac";

export type EquipmentActionContext = {
  organizationId: string;
  membershipId?: string | null;
  enabledModules: ModuleCode[];
  permissions: PermissionCode[];
};

export class EquipmentAccessError extends Error {
  constructor(message = "Accès matériel refusé.") {
    super(message);
    this.name = "EquipmentAccessError";
  }
}

export function assertCanReadEquipment(context: EquipmentActionContext): void {
  assertCanUseEquipmentPermission(context, "equipment.read");
}

export function assertCanWriteEquipment(context: EquipmentActionContext): void {
  assertCanUseEquipmentPermission(context, "equipment.write");
}

export function assertCanManageEquipment(context: EquipmentActionContext): void {
  assertCanUseEquipmentPermission(context, "equipment.manage");
}

function assertCanUseEquipmentPermission(
  context: EquipmentActionContext,
  permission: PermissionCode,
): void {
  const enabledModules = createEnabledModuleSet(
    context.enabledModules.filter((module) => module === "equipment"),
  );
  const permissions = createPermissionSet(context.permissions);

  if (!canUseModulePermission(permissions, enabledModules, "equipment", permission)) {
    throw new EquipmentAccessError();
  }
}
