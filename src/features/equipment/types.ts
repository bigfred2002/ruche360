export const equipmentTrackingModes = ["QUANTITY", "INDIVIDUAL", "HYBRID"] as const;
export const equipmentTypeStatuses = ["ACTIVE", "ARCHIVED"] as const;
export const equipmentItemStatuses = [
  "AVAILABLE",
  "IN_USE",
  "TO_CLEAN",
  "MAINTENANCE",
  "RETIRED",
  "LOST",
] as const;
export const equipmentEventTypes = [
  "QUANTITY_ADJUSTED",
  "ITEM_CREATED",
  "STATUS_CHANGED",
  "MOVED",
  "CLEANED",
  "MAINTENANCE",
  "RETIRED",
  "NOTE",
] as const;

export type EquipmentTrackingMode = (typeof equipmentTrackingModes)[number];
export type EquipmentTypeStatus = (typeof equipmentTypeStatuses)[number];
export type EquipmentItemStatus = (typeof equipmentItemStatuses)[number];
export type EquipmentEventType = (typeof equipmentEventTypes)[number];

export type EquipmentTypeSummary = {
  id: string;
  organizationId: string | null;
  name: string;
  category: string;
  trackingMode: EquipmentTrackingMode;
  status: EquipmentTypeStatus;
};

export type EquipmentStockSummary = {
  id: string;
  organizationId: string;
  equipmentTypeId: string;
  apiaryId: string | null;
  quantity: number;
  unit: string;
  locationLabel: string | null;
};

export type EquipmentItemSummary = {
  id: string;
  organizationId: string;
  equipmentTypeId: string;
  apiaryId: string | null;
  fieldIdentifier: string;
  status: EquipmentItemStatus;
  locationLabel: string | null;
};
