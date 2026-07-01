import { EquipmentInventoryPreview } from "@/components/EquipmentInventoryPreview";
import { createDevelopmentApplicationSession } from "@/features/auth";
import { listEquipmentInventoryForSessionAction } from "@/features/equipment/actions";

export const dynamic = "force-dynamic";

export default async function EquipmentPage() {
  const session = createDevelopmentApplicationSession();
  const inventory = await listEquipmentInventoryForSessionAction(session).catch(() => null);

  return <EquipmentInventoryPreview inventory={inventory} />;
}
