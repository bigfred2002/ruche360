import { TranshumanceShellPreview } from "@/components/TranshumanceShellPreview";
import { createDevelopmentApplicationSession } from "@/features/auth";
import { listHiveMovementsForSessionAction } from "@/features/hive-movements/actions";

export const dynamic = "force-dynamic";

export default async function TranshumancePage() {
  const session = createDevelopmentApplicationSession();
  const movements = await listHiveMovementsForSessionAction(session).catch(() => null);

  return <TranshumanceShellPreview movements={movements} />;
}
