export const taskStatuses = [
  "TODO",
  "IN_PROGRESS",
  "DONE",
  "CANCELLED",
  "ARCHIVED",
] as const;

export const taskPriorities = ["LOW", "NORMAL", "HIGH", "URGENT"] as const;

export type TaskStatus = (typeof taskStatuses)[number];
export type TaskPriority = (typeof taskPriorities)[number];

export type TaskSummary = {
  id: string;
  organizationId: string;
  apiaryId: string | null;
  hiveId: string | null;
  colonyId: string | null;
  visitId: string | null;
  assignedToMembershipId: string | null;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueAt: Date | null;
};

export type TaskDetail = TaskSummary & {
  apiaryName: string | null;
  assignedToLabel: string | null;
  colonyStatus: string | null;
  description: string | null;
  hiveIdentifier: string | null;
  visitObjective: string | null;
  visitStatus: string | null;
};
