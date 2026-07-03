import type { TaskStatus } from "./types";

const closedTaskStatuses = new Set<TaskStatus>([
  "DONE",
  "CANCELLED",
  "ARCHIVED",
]);

export function isTaskClosed(status: TaskStatus): boolean {
  return closedTaskStatuses.has(status);
}

export function canEditTask(status: TaskStatus): boolean {
  return !closedTaskStatuses.has(status);
}
