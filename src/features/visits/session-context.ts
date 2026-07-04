import {
  getActiveSessionScope,
  type ApplicationSession,
} from "@/features/auth";

import type { VisitActionContext } from "./access";

export class VisitSessionContextError extends Error {
  constructor(message = "Aucune organisation active pour le module visites.") {
    super(message);
    this.name = "VisitSessionContextError";
  }
}

export function createVisitActionContextFromSession(
  session: ApplicationSession,
): VisitActionContext {
  const scope = getActiveSessionScope(session);

  if (!scope) {
    throw new VisitSessionContextError();
  }

  return {
    organizationId: scope.organizationId,
    membershipId: scope.membershipId,
    enabledModules: scope.enabledModules,
    permissions: scope.permissions,
  };
}
