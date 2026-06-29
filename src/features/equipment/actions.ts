"use server";

import type { ApplicationSession } from "@/features/auth";

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
