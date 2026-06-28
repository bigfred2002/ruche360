import type { HiveMovementSummary } from "./types";

export function isCompletedHiveMovement(movement: Pick<HiveMovementSummary, "status">): boolean {
  return movement.status === "COMPLETED";
}

export function sortHiveMovementsByDeparture<T extends Pick<HiveMovementSummary, "departureDate" | "id">>(
  movements: readonly T[],
): T[] {
  return [...movements].sort((left, right) => {
    const dateDifference = left.departureDate.getTime() - right.departureDate.getTime();

    if (dateDifference !== 0) {
      return dateDifference;
    }

    return left.id.localeCompare(right.id);
  });
}

export function getCurrentApiaryIdFromMovements(
  initialApiaryId: string | null,
  movements: readonly HiveMovementSummary[],
): string | null {
  return sortHiveMovementsByDeparture(movements)
    .filter(isCompletedHiveMovement)
    .reduce<string | null>((currentApiaryId, movement) => {
      return movement.destinationApiaryId || currentApiaryId;
    }, initialApiaryId);
}
