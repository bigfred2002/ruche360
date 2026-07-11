import type { ApiaryStatus, HiveStatus } from "./types";
import { apiaryStatuses, hiveStatuses } from "./types";

export function requireText(value: unknown, label: string): string {
  if (typeof value !== "string") {
    throw new Error(`${label} est requis.`);
  }

  const normalized = value.trim();

  if (!normalized) {
    throw new Error(`${label} est requis.`);
  }

  return normalized;
}

export function normalizeOptionalText(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();

  return normalized.length > 0 ? normalized : null;
}

export function requireApiaryStatus(value: unknown): ApiaryStatus {
  if (typeof value === "string" && apiaryStatuses.includes(value as ApiaryStatus)) {
    return value as ApiaryStatus;
  }

  throw new Error("Statut de rucher invalide.");
}

export function requireHiveStatus(value: unknown): HiveStatus {
  if (typeof value === "string" && hiveStatuses.includes(value as HiveStatus)) {
    return value as HiveStatus;
  }

  throw new Error("Statut de ruche invalide.");
}
