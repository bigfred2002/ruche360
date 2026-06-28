import type { EquipmentItemSummary, EquipmentTypeSummary } from "./types";

export function isActiveEquipmentType(type: EquipmentTypeSummary): boolean {
  return type.status === "ACTIVE";
}

export function isAvailableEquipmentItem(item: EquipmentItemSummary): boolean {
  return item.status === "AVAILABLE";
}

export function shouldCleanEquipmentItem(item: EquipmentItemSummary): boolean {
  return item.status === "TO_CLEAN";
}
