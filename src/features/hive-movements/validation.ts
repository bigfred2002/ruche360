import {
  hiveMovementReasons,
  hiveMovementStatuses,
  type HiveMovementReason,
  type HiveMovementStatus,
} from "./types";

export class HiveMovementValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HiveMovementValidationError";
  }
}

export function normalizeOptionalText(value: string | null | undefined): string | null {
  const normalized = value?.trim();

  return normalized ? normalized : null;
}

export function requireText(value: string | null | undefined, fieldLabel: string): string {
  const normalized = normalizeOptionalText(value);

  if (!normalized) {
    throw new HiveMovementValidationError(`${fieldLabel} est obligatoire.`);
  }

  return normalized;
}

export function requireHiveMovementStatus(value: string): HiveMovementStatus {
  if (!hiveMovementStatuses.includes(value as HiveMovementStatus)) {
    throw new HiveMovementValidationError("Statut de transhumance invalide.");
  }

  return value as HiveMovementStatus;
}

export function requireHiveMovementReason(value: string): HiveMovementReason {
  if (!hiveMovementReasons.includes(value as HiveMovementReason)) {
    throw new HiveMovementValidationError("Motif de transhumance invalide.");
  }

  return value as HiveMovementReason;
}

export function requireDate(value: Date | string, fieldLabel: string): Date {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new HiveMovementValidationError(`${fieldLabel} doit etre une date valide.`);
  }

  return date;
}

export function normalizeOptionalDate(value: Date | string | null | undefined): Date | null {
  if (!value) {
    return null;
  }

  return requireDate(value, "La date optionnelle");
}

export function requireHiveIds(value: readonly string[] | null | undefined): string[] {
  const hiveIds = [...new Set(value?.map((id) => normalizeOptionalText(id)).filter(Boolean))];

  if (hiveIds.length === 0) {
    throw new HiveMovementValidationError("Au moins une ruche est obligatoire.");
  }

  return hiveIds as string[];
}
