import { AdminShellPreview } from "@/components/AdminShellPreview";
import {
  createDevelopmentApplicationSession,
  getActiveSessionScope,
} from "@/features/auth";
import { getAdminDataOverview } from "@/features/admin";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = createDevelopmentApplicationSession();
  const scope = getActiveSessionScope(session);
  const overview = scope
    ? await getAdminDataOverview(scope).catch(() => null)
    : null;

  return <AdminShellPreview overview={overview} />;
}
