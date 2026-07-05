import { ShellRoutePage } from "@/components/ShellRoutePage";
import { visualAssets } from "@/components/visualAssets";

export default function HivesPage() {
  return (
    <ShellRoutePage
      currentPath="/hives"
      eyebrow="Parcours ruches"
      highlights={["Parc de ruches", "État matériel", "Lien colonie"]}
      title="Ruches"
      visual={{ ...visualAssets.hiveCard, aspect: "card" }}
    />
  );
}
