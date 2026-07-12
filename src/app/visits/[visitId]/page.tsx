import { notFound } from "next/navigation";

import { VisitDetailPreview } from "@/components/VisitDetailPreview";
import { createDevelopmentApplicationSession } from "@/features/auth";
import { getVisitDetailForSessionAction } from "@/features/visits/actions";

export const dynamic = "force-dynamic";

type VisitDetailPageProps = {
  params: Promise<{
    visitId: string;
  }>;
};

export default async function VisitDetailPage({
  params,
}: VisitDetailPageProps) {
  const { visitId } = await params;
  const session = createDevelopmentApplicationSession();
  const visit = await getVisitDetailForSessionAction(session, visitId);

  if (!visit) {
    notFound();
  }

  return <VisitDetailPreview visit={visit} />;
}
