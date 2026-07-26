import {
  getActiveSessionScope,
  type ApplicationSession,
} from "@/features/auth";

import type { HealthActionContext } from "./access";

export class HealthSessionContextError extends Error {
  constructor(message = "Aucune organisation active pour le module sanitaire.") {
    super(message);
    this.name = "HealthSessionContextError";
  }
}

export function createHealthActionContextFromSession(
  session: ApplicationSession,
): HealthActionContext {
  const scope = getActiveSessionScope(session);

  if (!scope) {
    throw new HealthSessionContextError();
  }

  return {
    organizationId: scope.organizationId,
    membershipId: scope.membershipId,
    enabledModules: scope.enabledModules,
    permissions: scope.permissions,
  };
}
