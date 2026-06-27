import { ShellRoutePage } from "@/components/ShellRoutePage";

export default function HealthPage() {
  return (
    <ShellRoutePage
      currentPath="/health"
      eyebrow="Parcours sanitaire"
      highlights={["Observations", "Signaux", "Historique"]}
      title="Sanitaire"
    />
  );
}
