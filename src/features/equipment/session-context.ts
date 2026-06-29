import {
  getActiveSessionScope,
  type ApplicationSession,
} from "@/features/auth";

import type { EquipmentActionContext } from "./access";

export class EquipmentSessionContextError extends Error {
  constructor(message = "Aucune organisation active pour le module matériel.") {
    super(message);
    this.name = "EquipmentSessionContextError";
  }
}

export function createEquipmentActionContextFromSession(
  session: ApplicationSession,
): EquipmentActionContext {
  const scope = getActiveSessionScope(session);

  if (!scope) {
    throw new EquipmentSessionContextError();
  }

  return {
    organizationId: scope.organizationId,
    membershipId: scope.membershipId,
    enabledModules: scope.enabledModules,
    permissions: scope.permissions,
  };
}
