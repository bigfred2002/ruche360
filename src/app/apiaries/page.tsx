import { ShellRoutePage } from "@/components/ShellRoutePage";

export default function ApiariesPage() {
  return (
    <ShellRoutePage
      currentPath="/apiaries"
      eyebrow="Parcours ruchers"
      highlights={["Liste des sites", "Fiche rucher", "Modules liés"]}
      title="Ruchers"
    />
  );
}
