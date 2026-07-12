export const visitStatuses = [
  "DRAFT",
  "PLANNED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
  "ARCHIVED",
] as const;

export const visitObservationCategories = [
  "COLONY",
  "RESERVES",
  "HIVE",
  "HEALTH",
  "ACTION",
  "FOLLOW_UP",
  "NOTE",
] as const;

export type VisitStatus = (typeof visitStatuses)[number];
export type VisitObservationCategory = (typeof visitObservationCategories)[number];

export type VisitSummary = {
  id: string;
  organizationId: string;
  apiaryId: string | null;
  hiveId: string | null;
  colonyId: string | null;
  authorMembershipId: string | null;
  status: VisitStatus;
  visitedAt: Date | null;
  objective: string | null;
  followUpSummary: string | null;
};

export type VisitDetail = VisitSummary & {
  apiaryName: string | null;
  colonyStatus: string | null;
  hiveIdentifier: string | null;
  notes: string | null;
  observations: VisitObservationSummary[];
  weatherSummary: string | null;
};

export type VisitObservationSummary = {
  id: string;
  organizationId: string;
  visitId: string;
  category: VisitObservationCategory;
  label: string;
  value: string | null;
  notes: string | null;
};
