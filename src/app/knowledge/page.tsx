import { ShellRoutePage } from "@/components/ShellRoutePage";
import { visualAssets } from "@/components/visualAssets";

export default function KnowledgePage() {
  return (
    <ShellRoutePage
      currentPath="/knowledge"
      eyebrow="Parcours connaissance"
      highlights={["Fiches pratiques", "Procédures", "Notes internes"]}
      title="Base de connaissance"
      visual={{ ...visualAssets.hiveSquare, aspect: "square" }}
    />
  );
}
