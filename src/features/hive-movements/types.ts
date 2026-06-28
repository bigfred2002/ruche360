export const hiveMovementStatuses = [
  "PLANNED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
] as const;

export type HiveMovementStatus = (typeof hiveMovementStatuses)[number];

export const hiveMovementReasons = [
  "HONEY_FLOW",
  "POLLINATION",
  "WINTERING",
  "EMERGENCY",
  "HEALTH",
  "GROUPING",
  "OTHER",
] as const;

export type HiveMovementReason = (typeof hiveMovementReasons)[number];

export type HiveMovementItemSummary = {
  hiveId: string;
  notes?: string | null;
};

export type HiveMovementSummary = {
  id: string;
  destinationApiaryId: string;
  sourceApiaryId?: string | null;
  departureDate: Date;
  arrivalDate?: Date | null;
  status: HiveMovementStatus;
  reason: HiveMovementReason;
  items: HiveMovementItemSummary[];
};
