import { ShellRoutePage } from "@/components/ShellRoutePage";

export default function ColoniesPage() {
  return (
    <ShellRoutePage
      currentPath="/colonies"
      eyebrow="Parcours colonies"
      highlights={["Vie de colonie", "Reine", "Historique prévu"]}
      title="Colonies"
    />
  );
}
