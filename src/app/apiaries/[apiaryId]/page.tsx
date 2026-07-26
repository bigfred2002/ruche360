import { notFound } from "next/navigation";

import { ApiaryDetailPreview } from "@/components/ApiaryDetailPreview";
import { getApiaryDetailForSessionAction } from "@/features/apiary/actions";
import { createDevelopmentApplicationSession } from "@/features/auth";
import {
  listHealthObservationsForSessionAction,
  listHornetRecordsForSessionAction,
  listVarroaRecordsForSessionAction,
} from "@/features/health/actions";

export const dynamic = "force-dynamic";

type ApiaryDetailPageProps = {
  params: Promise<{
    apiaryId: string;
  }>;
};

export default async function ApiaryDetailPage({
  params,
}: ApiaryDetailPageProps) {
  const { apiaryId } = await params;
  const session = createDevelopmentApplicationSession();
  const [apiary, observations, varroaRecords, hornetRecords] = await Promise.all([
    getApiaryDetailForSessionAction(session, apiaryId),
    listHealthObservationsForSessionAction(session).catch(() => null),
    listVarroaRecordsForSessionAction(session).catch(() => null),
    listHornetRecordsForSessionAction(session).catch(() => null),
  ]);

  if (!apiary) {
    notFound();
  }

  return (
    <ApiaryDetailPreview
      apiary={apiary}
      hornetRecords={hornetRecords}
      observations={observations}
      varroaRecords={varroaRecords}
    />
  );
}
