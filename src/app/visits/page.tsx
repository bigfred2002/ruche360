import { VisitsShellPreview } from "@/components/VisitsShellPreview";
import { createDevelopmentApplicationSession } from "@/features/auth";
import { listHivesForSessionAction } from "@/features/apiary/actions";
import { listVisitsForSessionAction } from "@/features/visits/actions";

export const dynamic = "force-dynamic";

export default async function VisitsPage() {
  const session = createDevelopmentApplicationSession();
  const [visits, hives] = await Promise.all([
    listVisitsForSessionAction(session).catch(() => null),
    listHivesForSessionAction(session).catch(() => null),
  ]);

  return <VisitsShellPreview hives={hives} visits={visits} />;
}
