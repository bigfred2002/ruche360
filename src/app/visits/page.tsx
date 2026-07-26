import { VisitsShellPreview } from "@/components/VisitsShellPreview";
import { createDevelopmentApplicationSession } from "@/features/auth";
import { listHivesForSessionAction } from "@/features/apiary/actions";
import {
  listHealthObservationsForSessionAction,
  listHornetRecordsForSessionAction,
  listVarroaRecordsForSessionAction,
} from "@/features/health/actions";
import { listVisitsForSessionAction } from "@/features/visits/actions";

export const dynamic = "force-dynamic";

export default async function VisitsPage() {
  const session = createDevelopmentApplicationSession();
  const [visits, hives, observations, varroaRecords, hornetRecords] = await Promise.all([
    listVisitsForSessionAction(session).catch(() => null),
    listHivesForSessionAction(session).catch(() => null),
    listHealthObservationsForSessionAction(session).catch(() => null),
    listVarroaRecordsForSessionAction(session).catch(() => null),
    listHornetRecordsForSessionAction(session).catch(() => null),
  ]);

  return (
    <VisitsShellPreview
      hives={hives}
      hornetRecords={hornetRecords}
      observations={observations}
      varroaRecords={varroaRecords}
      visits={visits}
    />
  );
}
