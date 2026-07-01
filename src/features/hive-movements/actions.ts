"use server";

import type { ApplicationSession } from "@/features/auth";

import type { HiveMovementActionContext } from "./access";
import { createHiveMovementActionContextFromSession } from "./session-context";
import {
  addHivesToMovement,
  createHiveMovement,
  listHiveMovements,
  updateHiveMovementStatus,
  type AddHivesToMovementInput,
  type CreateHiveMovementInput,
  type UpdateHiveMovementStatusInput,
} from "./service";

export async function listHiveMovementsAction(context: HiveMovementActionContext) {
  return listHiveMovements(context);
}

export async function listHiveMovementsForSessionAction(session: ApplicationSession) {
  return listHiveMovements(createHiveMovementActionContextFromSession(session));
}

export async function createHiveMovementAction(
  context: HiveMovementActionContext,
  input: CreateHiveMovementInput,
) {
  return createHiveMovement(context, input);
}

export async function createHiveMovementForSessionAction(
  session: ApplicationSession,
  input: CreateHiveMovementInput,
) {
  return createHiveMovement(createHiveMovementActionContextFromSession(session), input);
}

export async function addHivesToMovementAction(
  context: HiveMovementActionContext,
  input: AddHivesToMovementInput,
) {
  return addHivesToMovement(context, input);
}

export async function addHivesToMovementForSessionAction(
  session: ApplicationSession,
  input: AddHivesToMovementInput,
) {
  return addHivesToMovement(createHiveMovementActionContextFromSession(session), input);
}

export async function updateHiveMovementStatusAction(
  context: HiveMovementActionContext,
  input: UpdateHiveMovementStatusInput,
) {
  return updateHiveMovementStatus(context, input);
}

export async function updateHiveMovementStatusForSessionAction(
  session: ApplicationSession,
  input: UpdateHiveMovementStatusInput,
) {
  return updateHiveMovementStatus(createHiveMovementActionContextFromSession(session), input);
}
