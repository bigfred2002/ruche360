import { ClassicJourneyPreview } from "@/components/ClassicJourneyPreview";
import { listHivesForSessionAction } from "@/features/apiary/actions";
import { createDevelopmentApplicationSession } from "@/features/auth";
import { listEquipmentInventoryForSessionAction } from "@/features/equipment/actions";
import { listHiveMovementsForSessionAction } from "@/features/hive-movements/actions";
import { listTasksForSessionAction } from "@/features/tasks/actions";
import { listVisitsForSessionAction } from "@/features/visits/actions";

export const dynamic = "force-dynamic";

export default async function JourneyPage() {
  const session = createDevelopmentApplicationSession();
  const [hives, visits, tasks, equipment, movements] = await Promise.all([
    listHivesForSessionAction(session).catch(() => null),
    listVisitsForSessionAction(session).catch(() => null),
    listTasksForSessionAction(session).catch(() => null),
    listEquipmentInventoryForSessionAction(session).catch(() => null),
    listHiveMovementsForSessionAction(session).catch(() => null),
  ]);

  return (
    <ClassicJourneyPreview
      equipment={equipment}
      hives={hives}
      movements={movements}
      tasks={tasks}
      visits={visits}
    />
  );
}
