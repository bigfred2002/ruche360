import {
  getActiveSessionScope,
  type ApplicationSession,
} from "@/features/auth";

import type { HiveMovementActionContext } from "./access";

export class HiveMovementSessionContextError extends Error {
  constructor(message = "Aucune organisation active pour le module transhumance.") {
    super(message);
    this.name = "HiveMovementSessionContextError";
  }
}

export function createHiveMovementActionContextFromSession(
  session: ApplicationSession,
): HiveMovementActionContext {
  const scope = getActiveSessionScope(session);

  if (!scope) {
    throw new HiveMovementSessionContextError();
  }

  return {
    organizationId: scope.organizationId,
    membershipId: scope.membershipId,
    enabledModules: scope.enabledModules,
    permissions: scope.permissions,
  };
}
