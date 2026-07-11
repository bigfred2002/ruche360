import {
  getActiveSessionScope,
  type ApplicationSession,
} from "@/features/auth";

import type { ApiaryActionContext } from "./access";

export class ApiarySessionContextError extends Error {
  constructor(message = "Aucune organisation active pour le module ruchers.") {
    super(message);
    this.name = "ApiarySessionContextError";
  }
}

export function createApiaryActionContextFromSession(
  session: ApplicationSession,
): ApiaryActionContext {
  const scope = getActiveSessionScope(session);

  if (!scope) {
    throw new ApiarySessionContextError();
  }

  return {
    organizationId: scope.organizationId,
    membershipId: scope.membershipId,
    enabledModules: scope.enabledModules,
    permissions: scope.permissions,
  };
}
