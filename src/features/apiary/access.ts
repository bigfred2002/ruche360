import {
  canUseModulePermission,
  createEnabledModuleSet,
  createPermissionSet,
} from "@/features/rbac";
import type { ModuleCode, PermissionCode } from "@/features/rbac";

export type ApiaryActionContext = {
  organizationId: string;
  membershipId?: string | null;
  enabledModules: ModuleCode[];
  permissions: PermissionCode[];
};

export class ApiaryAccessError extends Error {
  constructor(message = "Acces ruchers refuse.") {
    super(message);
    this.name = "ApiaryAccessError";
  }
}

export function assertCanReadApiaries(context: ApiaryActionContext): void {
  assertCanUseApiaryPermission(context, "apiaries.read");
}

export function assertCanWriteApiaries(context: ApiaryActionContext): void {
  assertCanUseApiaryPermission(context, "apiaries.write");
}

function assertCanUseApiaryPermission(
  context: ApiaryActionContext,
  permission: PermissionCode,
): void {
  const enabledModules = createEnabledModuleSet(
    context.enabledModules.filter((module) => module === "apiaries"),
  );
  const permissions = createPermissionSet(context.permissions);

  if (!canUseModulePermission(permissions, enabledModules, "apiaries", permission)) {
    throw new ApiaryAccessError();
  }
}
