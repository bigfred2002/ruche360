export const apiaryStatuses = ["ACTIVE", "PAUSED", "ARCHIVED"] as const;
export const hiveStatuses = ["ACTIVE", "STORED", "MAINTENANCE", "ARCHIVED"] as const;
export const colonyStatuses = ["ACTIVE", "WEAK", "LOST", "ARCHIVED"] as const;

export type ApiaryStatus = (typeof apiaryStatuses)[number];
export type HiveStatus = (typeof hiveStatuses)[number];
export type ColonyStatus = (typeof colonyStatuses)[number];

export type ApiarySummary = {
  id: string;
  organizationId: string;
  name: string;
  status: ApiaryStatus;
  locationDescription: string | null;
};

export type HiveSummary = {
  id: string;
  organizationId: string;
  apiaryId: string | null;
  fieldIdentifier: string;
  status: HiveStatus;
};

export type ColonySummary = {
  id: string;
  organizationId: string;
  hiveId: string | null;
  status: ColonyStatus;
  queenKnown: boolean;
};
