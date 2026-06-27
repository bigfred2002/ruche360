import { ShellRoutePage } from "@/components/ShellRoutePage";

export default function VisitsPage() {
  return (
    <ShellRoutePage
      currentPath="/visits"
      eyebrow="Parcours visites"
      highlights={["Préparer", "Observer", "Relire"]}
      title="Visites"
    />
  );
}
