import {
  equipmentItemStatuses,
  equipmentTrackingModes,
  type EquipmentItemStatus,
  type EquipmentTrackingMode,
} from "./types";

export class EquipmentValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EquipmentValidationError";
  }
}

export function normalizeOptionalText(value: string | null | undefined): string | null {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

export function requireText(value: string | null | undefined, fieldLabel: string): string {
  const normalized = normalizeOptionalText(value);

  if (!normalized) {
    throw new EquipmentValidationError(`${fieldLabel} est obligatoire.`);
  }

  return normalized;
}

export function requirePositiveQuantity(value: number, fieldLabel = "La quantité"): number {
  if (!Number.isFinite(value) || value <= 0) {
    throw new EquipmentValidationError(`${fieldLabel} doit être positive.`);
  }

  return Number(value.toFixed(3));
}

export function requireTrackingMode(value: string): EquipmentTrackingMode {
  if (!equipmentTrackingModes.includes(value as EquipmentTrackingMode)) {
    throw new EquipmentValidationError("Mode de suivi matériel invalide.");
  }

  return value as EquipmentTrackingMode;
}

export function requireEquipmentItemStatus(value: string): EquipmentItemStatus {
  if (!equipmentItemStatuses.includes(value as EquipmentItemStatus)) {
    throw new EquipmentValidationError("Statut matériel invalide.");
  }

  return value as EquipmentItemStatus;
}
