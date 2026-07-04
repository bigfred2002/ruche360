import {
  visitObservationCategories,
  visitStatuses,
  type VisitObservationCategory,
  type VisitStatus,
} from "./types";

export class VisitValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "VisitValidationError";
  }
}

export function normalizeOptionalText(value: string | null | undefined): string | null {
  const normalized = value?.trim();

  return normalized ? normalized : null;
}

export function requireText(value: string | null | undefined, fieldLabel: string): string {
  const normalized = normalizeOptionalText(value);

  if (!normalized) {
    throw new VisitValidationError(`${fieldLabel} est obligatoire.`);
  }

  return normalized;
}

export function requireVisitStatus(value: string): VisitStatus {
  if (!visitStatuses.includes(value as VisitStatus)) {
    throw new VisitValidationError("Statut de visite invalide.");
  }

  return value as VisitStatus;
}

export function requireVisitObservationCategory(value: string): VisitObservationCategory {
  if (!visitObservationCategories.includes(value as VisitObservationCategory)) {
    throw new VisitValidationError("Categorie d'observation invalide.");
  }

  return value as VisitObservationCategory;
}

export function normalizeOptionalDate(value: Date | string | null | undefined): Date | null {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new VisitValidationError("La date de visite doit etre valide.");
  }

  return date;
}

export function normalizeOptionalInteger(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = typeof value === "number" ? value : Number(value);

  if (!Number.isInteger(number)) {
    throw new VisitValidationError("La valeur numerique doit etre un entier.");
  }

  return number;
}
