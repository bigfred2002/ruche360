"use server";

import type { EquipmentActionContext } from "./access";
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

export async function createEquipmentTypeAction(
  context: EquipmentActionContext,
  input: CreateEquipmentTypeInput,
) {
  return createEquipmentType(context, input);
}

export async function createEquipmentStockAction(
  context: EquipmentActionContext,
  input: CreateEquipmentStockInput,
) {
  return createEquipmentStock(context, input);
}

export async function adjustEquipmentStockAction(
  context: EquipmentActionContext,
  input: AdjustEquipmentStockInput,
) {
  return adjustEquipmentStock(context, input);
}

export async function createEquipmentItemAction(
  context: EquipmentActionContext,
  input: CreateEquipmentItemInput,
) {
  return createEquipmentItem(context, input);
}

export async function updateEquipmentItemStatusAction(
  context: EquipmentActionContext,
  input: UpdateEquipmentItemStatusInput,
) {
  return updateEquipmentItemStatus(context, input);
}

export async function moveEquipmentItemAction(
  context: EquipmentActionContext,
  input: MoveEquipmentItemInput,
) {
  return moveEquipmentItem(context, input);
}
