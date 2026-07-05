import { ShellRoutePage } from "@/components/ShellRoutePage";
import { visualAssets } from "@/components/visualAssets";

export default function HealthPage() {
  return (
    <ShellRoutePage
      currentPath="/health"
      eyebrow="Parcours sanitaire"
      highlights={["Observations", "Signaux", "Historique"]}
      title="Sanitaire"
      visual={{ ...visualAssets.health, aspect: "card" }}
    />
  );
}
