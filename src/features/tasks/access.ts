import {
  canUseModulePermission,
  createEnabledModuleSet,
  createPermissionSet,
} from "@/features/rbac";
import type { ModuleCode, PermissionCode } from "@/features/rbac";

export type TaskActionContext = {
  organizationId: string;
  membershipId?: string | null;
  enabledModules: ModuleCode[];
  permissions: PermissionCode[];
};

export class TaskAccessError extends Error {
  constructor(message = "Acces taches refuse.") {
    super(message);
    this.name = "TaskAccessError";
  }
}

export function assertCanReadTasks(context: TaskActionContext): void {
  assertCanUseTaskPermission(context, "tasks.read");
}

export function assertCanWriteTasks(context: TaskActionContext): void {
  assertCanUseTaskPermission(context, "tasks.write");
}

function assertCanUseTaskPermission(
  context: TaskActionContext,
  permission: PermissionCode,
): void {
  const enabledModules = createEnabledModuleSet(
    context.enabledModules.filter((module) => module === "tasks"),
  );
  const permissions = createPermissionSet(context.permissions);

  if (!canUseModulePermission(permissions, enabledModules, "tasks", permission)) {
    throw new TaskAccessError();
  }
}
