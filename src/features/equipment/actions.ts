"use server";

import { revalidatePath } from "next/cache";

import type { ApplicationSession } from "@/features/auth";
import { createDevelopmentApplicationSession } from "@/features/auth";

import type { EquipmentActionContext } from "./access";
import { createEquipmentActionContextFromSession } from "./session-context";
import {
  adjustEquipmentStock,
  createEquipmentItem,
  createEquipmentStock,
  createEquipmentType,
  listEquipmentInventory,
  moveEquipmentItem,
  updateEquipmentItemStatus,
  type AdjustEquipmentStockInput,
  type CreateEquipmentItemInput,
  type CreateEquipmentStockInput,
  type CreateEquipmentTypeInput,
  type MoveEquipmentItemInput,
  type UpdateEquipmentItemStatusInput,
} from "./service";

export async function listEquipmentInventoryAction(context: EquipmentActionContext) {
  return listEquipmentInventory(context);
}

export async function listEquipmentInventoryForSessionAction(session: ApplicationSession) {
  return listEquipmentInventory(createEquipmentActionContextFromSession(session));
}

export async function createEquipmentTypeAction(
  context: EquipmentActionContext,
  input: CreateEquipmentTypeInput,
) {
  return createEquipmentType(context, input);
}

export async function createEquipmentTypeForSessionAction(
  session: ApplicationSession,
  input: CreateEquipmentTypeInput,
) {
  return createEquipmentType(createEquipmentActionContextFromSession(session), input);
}

export async function createEquipmentStockAction(
  context: EquipmentActionContext,
  input: CreateEquipmentStockInput,
) {
  return createEquipmentStock(context, input);
}

export async function createEquipmentStockForSessionAction(
  session: ApplicationSession,
  input: CreateEquipmentStockInput,
) {
  return createEquipmentStock(createEquipmentActionContextFromSession(session), input);
}

export async function adjustEquipmentStockAction(
  context: EquipmentActionContext,
  input: AdjustEquipmentStockInput,
) {
  return adjustEquipmentStock(context, input);
}

export async function adjustEquipmentStockForSessionAction(
  session: ApplicationSession,
  input: AdjustEquipmentStockInput,
) {
  return adjustEquipmentStock(createEquipmentActionContextFromSession(session), input);
}

export async function createEquipmentItemAction(
  context: EquipmentActionContext,
  input: CreateEquipmentItemInput,
) {
  return createEquipmentItem(context, input);
}

export async function createEquipmentItemForSessionAction(
  session: ApplicationSession,
  input: CreateEquipmentItemInput,
) {
  return createEquipmentItem(createEquipmentActionContextFromSession(session), input);
}

export async function updateEquipmentItemStatusAction(
  context: EquipmentActionContext,
  input: UpdateEquipmentItemStatusInput,
) {
  return updateEquipmentItemStatus(context, input);
}

export async function updateEquipmentItemStatusForSessionAction(
  session: ApplicationSession,
  input: UpdateEquipmentItemStatusInput,
) {
  return updateEquipmentItemStatus(createEquipmentActionContextFromSession(session), input);
}

export async function moveEquipmentItemAction(
  context: EquipmentActionContext,
  input: MoveEquipmentItemInput,
) {
  return moveEquipmentItem(context, input);
}

export async function moveEquipmentItemForSessionAction(
  session: ApplicationSession,
  input: MoveEquipmentItemInput,
) {
  return moveEquipmentItem(createEquipmentActionContextFromSession(session), input);
}

export async function createDevelopmentEquipmentTypeFormAction(formData: FormData) {
  const session = createDevelopmentApplicationSession();

  await createEquipmentTypeForSessionAction(session, {
    name: readFormText(formData, "name"),
    category: readFormText(formData, "category"),
    trackingMode: readFormText(formData, "trackingMode"),
    code: readOptionalFormText(formData, "code"),
    defaultUnit: readOptionalFormText(formData, "defaultUnit"),
    notes: readOptionalFormText(formData, "notes"),
  });

  revalidatePath("/equipment");
}

export async function createDevelopmentEquipmentStockFormAction(formData: FormData) {
  const session = createDevelopmentApplicationSession();

  await createEquipmentStockForSessionAction(session, {
    equipmentTypeId: readFormText(formData, "equipmentTypeId"),
    quantity: readFormNumber(formData, "quantity"),
    unit: readFormText(formData, "unit"),
    apiaryId: readOptionalFormText(formData, "apiaryId"),
    locationLabel: readOptionalFormText(formData, "locationLabel"),
    notes: readOptionalFormText(formData, "notes"),
  });

  revalidatePath("/equipment");
}

export async function createDevelopmentEquipmentItemFormAction(formData: FormData) {
  const session = createDevelopmentApplicationSession();

  await createEquipmentItemForSessionAction(session, {
    equipmentTypeId: readFormText(formData, "equipmentTypeId"),
    fieldIdentifier: readFormText(formData, "fieldIdentifier"),
    status: readOptionalFormText(formData, "status"),
    apiaryId: readOptionalFormText(formData, "apiaryId"),
    locationLabel: readOptionalFormText(formData, "locationLabel"),
    notes: readOptionalFormText(formData, "notes"),
  });

  revalidatePath("/equipment");
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

function readFormNumber(formData: FormData, key: string) {
  const value = Number(readFormText(formData, key));

  return Number.isFinite(value) ? value : Number.NaN;
}
