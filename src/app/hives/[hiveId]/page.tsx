import { notFound } from "next/navigation";

import { HiveDetailPreview } from "@/components/HiveDetailPreview";
import { getHiveDetailForSessionAction } from "@/features/apiary/actions";
import { createDevelopmentApplicationSession } from "@/features/auth";

export const dynamic = "force-dynamic";

type HiveDetailPageProps = {
  params: Promise<{
    hiveId: string;
  }>;
};

export default async function HiveDetailPage({ params }: HiveDetailPageProps) {
  const { hiveId } = await params;
  const session = createDevelopmentApplicationSession();
  const hive = await getHiveDetailForSessionAction(session, hiveId);

  if (!hive) {
    notFound();
  }

  return <HiveDetailPreview hive={hive} />;
}
