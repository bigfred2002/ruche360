import { notFound } from "next/navigation";

import { ApiaryDetailPreview } from "@/components/ApiaryDetailPreview";
import { getApiaryDetailForSessionAction } from "@/features/apiary/actions";
import { createDevelopmentApplicationSession } from "@/features/auth";

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
  const apiary = await getApiaryDetailForSessionAction(session, apiaryId);

  if (!apiary) {
    notFound();
  }

  return <ApiaryDetailPreview apiary={apiary} />;
}
