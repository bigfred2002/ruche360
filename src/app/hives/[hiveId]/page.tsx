import { notFound } from "next/navigation";

import { HiveDetailPreview } from "@/components/HiveDetailPreview";
import { getHiveDetailForSessionAction } from "@/features/apiary/actions";
import { createDevelopmentApplicationSession } from "@/features/auth";
import {
  listHealthObservationsForSessionAction,
  listHornetRecordsForSessionAction,
  listVarroaRecordsForSessionAction,
} from "@/features/health/actions";

export const dynamic = "force-dynamic";

type HiveDetailPageProps = {
  params: Promise<{
    hiveId: string;
  }>;
};

export default async function HiveDetailPage({ params }: HiveDetailPageProps) {
  const { hiveId } = await params;
  const session = createDevelopmentApplicationSession();
  const [hive, observations, varroaRecords, hornetRecords] = await Promise.all([
    getHiveDetailForSessionAction(session, hiveId),
    listHealthObservationsForSessionAction(session).catch(() => null),
    listVarroaRecordsForSessionAction(session).catch(() => null),
    listHornetRecordsForSessionAction(session).catch(() => null),
  ]);

  if (!hive) {
    notFound();
  }

  return (
    <HiveDetailPreview
      hive={hive}
      hornetRecords={hornetRecords}
      observations={observations}
      varroaRecords={varroaRecords}
    />
  );
}
