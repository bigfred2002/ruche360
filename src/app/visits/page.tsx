import { VisitsShellPreview } from "@/components/VisitsShellPreview";
import { createDevelopmentApplicationSession } from "@/features/auth";
import { listVisitsForSessionAction } from "@/features/visits/actions";

export const dynamic = "force-dynamic";

export default async function VisitsPage() {
  const session = createDevelopmentApplicationSession();
  const visits = await listVisitsForSessionAction(session).catch(() => null);

  return <VisitsShellPreview visits={visits} />;
}
