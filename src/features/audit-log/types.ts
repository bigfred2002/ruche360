export const activityLogImportances = [
  "INFO",
  "IMPORTANT",
  "SENSITIVE",
  "SECURITY",
] as const;

export type ActivityLogImportance = (typeof activityLogImportances)[number];

export type ActivityLogEntrySummary = {
  id: string;
  organizationId: string;
  actorMembershipId: string | null;
  moduleCode: string;
  actionType: string;
  targetType: string | null;
  targetId: string | null;
  label: string;
  importance: ActivityLogImportance;
  summary: string | null;
  occurredAt: Date;
};

export type ActivityLogDraft = {
  organizationId: string;
  actorMembershipId?: string | null;
  moduleCode: string;
  actionType: string;
  targetType?: string | null;
  targetId?: string | null;
  label: string;
  importance?: ActivityLogImportance;
  summary?: string | null;
  metadata?: Record<string, string | number | boolean | null>;
};
