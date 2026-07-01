"use server";

import { revalidatePath } from "next/cache";

import type { ApplicationSession } from "@/features/auth";
import { createDevelopmentApplicationSession } from "@/features/auth";

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

export async function createDevelopmentHiveMovementFormAction(formData: FormData) {
  const session = createDevelopmentApplicationSession();

  await createHiveMovementForSessionAction(session, {
    sourceApiaryId: readOptionalFormText(formData, "sourceApiaryId"),
    destinationApiaryId: readFormText(formData, "destinationApiaryId"),
    departureDate: readFormText(formData, "departureDate"),
    reason: readOptionalFormText(formData, "reason"),
    notes: readOptionalFormText(formData, "notes"),
    hiveIds: readFormTextList(formData, "hiveIds"),
  });

  revalidatePath("/transhumance");
}

export async function addDevelopmentHivesToMovementFormAction(formData: FormData) {
  const session = createDevelopmentApplicationSession();

  await addHivesToMovementForSessionAction(session, {
    movementId: readFormText(formData, "movementId"),
    hiveIds: readFormTextList(formData, "hiveIds"),
    notes: readOptionalFormText(formData, "notes"),
  });

  revalidatePath("/transhumance");
}

export async function updateDevelopmentHiveMovementStatusFormAction(formData: FormData) {
  const session = createDevelopmentApplicationSession();

  await updateHiveMovementStatusForSessionAction(session, {
    movementId: readFormText(formData, "movementId"),
    status: readFormText(formData, "status"),
    arrivalDate: readOptionalFormText(formData, "arrivalDate"),
    notes: readOptionalFormText(formData, "notes"),
  });

  revalidatePath("/transhumance");
}

function readFormText(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value;
}

function readOptionalFormText(formData: FormData, key: string) {
  const value = readFormText(formData, key).trim();

  return value.length > 0 ? value : null;
}

function readFormTextList(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .filter((value): value is string => typeof value === "string");
}
