import {
  taskPriorities,
  taskStatuses,
  type TaskPriority,
  type TaskStatus,
} from "./types";

export class TaskValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TaskValidationError";
  }
}

export function normalizeOptionalText(value: string | null | undefined): string | null {
  const normalized = value?.trim();

  return normalized ? normalized : null;
}

export function requireText(value: string | null | undefined, fieldLabel: string): string {
  const normalized = normalizeOptionalText(value);

  if (!normalized) {
    throw new TaskValidationError(`${fieldLabel} est obligatoire.`);
  }

  return normalized;
}

export function requireTaskStatus(value: string): TaskStatus {
  if (!taskStatuses.includes(value as TaskStatus)) {
    throw new TaskValidationError("Statut de tache invalide.");
  }

  return value as TaskStatus;
}

export function requireTaskPriority(value: string): TaskPriority {
  if (!taskPriorities.includes(value as TaskPriority)) {
    throw new TaskValidationError("Priorite de tache invalide.");
  }

  return value as TaskPriority;
}

export function normalizeOptionalDate(value: Date | string | null | undefined): Date | null {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new TaskValidationError("La date d'echeance doit etre valide.");
  }

  return date;
}
