import { ClassicJourneyPreview } from "@/components/ClassicJourneyPreview";
import {
  listApiariesForSessionAction,
  listHivesForSessionAction,
} from "@/features/apiary/actions";
import { createDevelopmentApplicationSession } from "@/features/auth";
import { listEquipmentInventoryForSessionAction } from "@/features/equipment/actions";
import { listHiveMovementsForSessionAction } from "@/features/hive-movements/actions";
import { listTasksForSessionAction } from "@/features/tasks/actions";
import { listVisitsForSessionAction } from "@/features/visits/actions";

export const dynamic = "force-dynamic";

export default async function JourneyPage() {
  const session = createDevelopmentApplicationSession();
  const [apiaries, hives, visits, tasks, equipment, movements] = await Promise.all([
    listApiariesForSessionAction(session).catch(() => null),
    listHivesForSessionAction(session).catch(() => null),
    listVisitsForSessionAction(session).catch(() => null),
    listTasksForSessionAction(session).catch(() => null),
    listEquipmentInventoryForSessionAction(session).catch(() => null),
    listHiveMovementsForSessionAction(session).catch(() => null),
  ]);

  return (
    <ClassicJourneyPreview
      apiaries={apiaries}
      equipment={equipment}
      hives={hives}
      movements={movements}
      tasks={tasks}
      visits={visits}
    />
  );
}
