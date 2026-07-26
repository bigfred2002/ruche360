import {
  healthObservationCategories,
  healthSeverities,
  hornetPressureLevels,
  varroaCheckMethods,
  type HealthObservationCategory,
  type HealthSeverity,
  type HornetPressureLevel,
  type VarroaCheckMethod,
} from "./types";

export class HealthValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HealthValidationError";
  }
}

export function normalizeOptionalText(value: string | null | undefined): string | null {
  const normalized = value?.trim();

  return normalized ? normalized : null;
}

export function requireText(value: string | null | undefined, fieldLabel: string): string {
  const normalized = normalizeOptionalText(value);

  if (!normalized) {
    throw new HealthValidationError(`${fieldLabel} est obligatoire.`);
  }

  return normalized;
}

export function requireHealthObservationCategory(
  value: string,
): HealthObservationCategory {
  if (!healthObservationCategories.includes(value as HealthObservationCategory)) {
    throw new HealthValidationError("Categorie sanitaire invalide.");
  }

  return value as HealthObservationCategory;
}

export function requireHealthSeverity(value: string): HealthSeverity {
  if (!healthSeverities.includes(value as HealthSeverity)) {
    throw new HealthValidationError("Niveau sanitaire invalide.");
  }

  return value as HealthSeverity;
}

export function requireVarroaCheckMethod(value: string): VarroaCheckMethod {
  if (!varroaCheckMethods.includes(value as VarroaCheckMethod)) {
    throw new HealthValidationError("Methode varroa invalide.");
  }

  return value as VarroaCheckMethod;
}

export function requireHornetPressureLevel(value: string): HornetPressureLevel {
  if (!hornetPressureLevels.includes(value as HornetPressureLevel)) {
    throw new HealthValidationError("Pression frelon invalide.");
  }

  return value as HornetPressureLevel;
}

export function normalizeOptionalDate(value: Date | string | null | undefined): Date | null {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new HealthValidationError("La date d'observation doit etre valide.");
  }

  return date;
}

export function normalizeOptionalInteger(
  value: number | string | null | undefined,
  fieldLabel: string,
): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = typeof value === "number" ? value : Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new HealthValidationError(`${fieldLabel} doit etre un entier positif.`);
  }

  return parsed;
}

export function normalizeOptionalDecimalText(
  value: number | string | null | undefined,
  fieldLabel: string,
): string | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const normalized = String(value).replace(",", ".").trim();
  const parsed = Number.parseFloat(normalized);

  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new HealthValidationError(`${fieldLabel} doit etre un nombre positif.`);
  }

  return normalized;
}
