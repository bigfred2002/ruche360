import {
  canUseModulePermission,
  createEnabledModuleSet,
  createPermissionSet,
} from "@/features/rbac";
import type { ModuleCode, PermissionCode } from "@/features/rbac";

export type VisitActionContext = {
  organizationId: string;
  membershipId?: string | null;
  enabledModules: ModuleCode[];
  permissions: PermissionCode[];
};

export class VisitAccessError extends Error {
  constructor(message = "Acces visites refuse.") {
    super(message);
    this.name = "VisitAccessError";
  }
}

export function assertCanReadVisits(context: VisitActionContext): void {
  assertCanUseVisitPermission(context, "visits.read");
}

export function assertCanWriteVisits(context: VisitActionContext): void {
  assertCanUseVisitPermission(context, "visits.write");
}

function assertCanUseVisitPermission(
  context: VisitActionContext,
  permission: PermissionCode,
): void {
  const enabledModules = createEnabledModuleSet(
    context.enabledModules.filter((module) => module === "visits"),
  );
  const permissions = createPermissionSet(context.permissions);

  if (!canUseModulePermission(permissions, enabledModules, "visits", permission)) {
    throw new VisitAccessError();
  }
}
