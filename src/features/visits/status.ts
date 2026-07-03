import type { VisitStatus } from "./types";

const closedVisitStatuses = new Set<VisitStatus>([
  "COMPLETED",
  "CANCELLED",
  "ARCHIVED",
]);

export function isVisitClosed(status: VisitStatus): boolean {
  return closedVisitStatuses.has(status);
}

export function canEditVisit(status: VisitStatus): boolean {
  return !closedVisitStatuses.has(status);
}
