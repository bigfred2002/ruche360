import { ShellRoutePage } from "@/components/ShellRoutePage";
import { visualAssets } from "@/components/visualAssets";

export default function ApiariesPage() {
  return (
    <ShellRoutePage
      currentPath="/apiaries"
      eyebrow="Parcours ruchers"
      highlights={["Liste des sites", "Fiche rucher", "Modules liés"]}
      title="Ruchers"
      visual={visualAssets.apiaries}
    />
  );
}
