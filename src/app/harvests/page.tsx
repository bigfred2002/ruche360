import { ShellRoutePage } from "@/components/ShellRoutePage";

export default function HarvestsPage() {
  return (
    <ShellRoutePage
      currentPath="/harvests"
      eyebrow="Parcours récoltes"
      highlights={["Lots simples", "Extraction", "Notes"]}
      title="Récoltes simples"
    />
  );
}
