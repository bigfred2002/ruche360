import {
  getActiveSessionScope,
  type ApplicationSession,
} from "@/features/auth";

import type { TaskActionContext } from "./access";

export class TaskSessionContextError extends Error {
  constructor(message = "Aucune organisation active pour le module taches.") {
    super(message);
    this.name = "TaskSessionContextError";
  }
}

export function createTaskActionContextFromSession(
  session: ApplicationSession,
): TaskActionContext {
  const scope = getActiveSessionScope(session);

  if (!scope) {
    throw new TaskSessionContextError();
  }

  return {
    organizationId: scope.organizationId,
    membershipId: scope.membershipId,
    enabledModules: scope.enabledModules,
    permissions: scope.permissions,
  };
}
