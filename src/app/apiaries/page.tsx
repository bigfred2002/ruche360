import { ApiariesFormsPreview } from "@/components/ApiariesFormsPreview";
import { createDevelopmentApplicationSession } from "@/features/auth";
import {
  listApiariesForSessionAction,
  listHivesForSessionAction,
} from "@/features/apiary/actions";

export const dynamic = "force-dynamic";

export default async function ApiariesPage() {
  const session = createDevelopmentApplicationSession();
  const [apiaries, hives] = await Promise.all([
    listApiariesForSessionAction(session).catch(() => null),
    listHivesForSessionAction(session).catch(() => null),
  ]);

  return <ApiariesFormsPreview apiaries={apiaries} hives={hives} />;
}
