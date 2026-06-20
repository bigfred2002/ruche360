import type { ApiarySummary, ColonySummary, HiveSummary } from "./types";

export function isActiveApiary(apiary: ApiarySummary): boolean {
  return apiary.status === "ACTIVE";
}

export function isActiveHive(hive: HiveSummary): boolean {
  return hive.status === "ACTIVE";
}

export function isActiveColony(colony: ColonySummary): boolean {
  return colony.status === "ACTIVE";
}
