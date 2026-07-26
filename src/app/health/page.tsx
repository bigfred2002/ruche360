import { HealthFormsPreview } from "@/components/HealthFormsPreview";
import { createDevelopmentApplicationSession } from "@/features/auth";
import {
  listApiariesForSessionAction,
  listHivesForSessionAction,
} from "@/features/apiary/actions";
import {
  listHealthObservationsForSessionAction,
  listHornetRecordsForSessionAction,
  listVarroaRecordsForSessionAction,
} from "@/features/health/actions";
import { listVisitsForSessionAction } from "@/features/visits/actions";

export const dynamic = "force-dynamic";

export default async function HealthPage() {
  const session = createDevelopmentApplicationSession();
  const [apiaries, hives, visits, observations, varroaRecords, hornetRecords] =
    await Promise.all([
      listApiariesForSessionAction(session).catch(() => null),
      listHivesForSessionAction(session).catch(() => null),
      listVisitsForSessionAction(session).catch(() => null),
      listHealthObservationsForSessionAction(session).catch(() => null),
      listVarroaRecordsForSessionAction(session).catch(() => null),
      listHornetRecordsForSessionAction(session).catch(() => null),
    ]);

  return (
    <HealthFormsPreview
      apiaries={apiaries}
      hives={hives}
      hornetRecords={hornetRecords}
      observations={observations}
      varroaRecords={varroaRecords}
      visits={visits}
    />
  );
}
