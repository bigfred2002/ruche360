import { ShellRoutePage } from "@/components/ShellRoutePage";

export default function HornetPage() {
  return (
    <ShellRoutePage
      currentPath="/health/hornet"
      eyebrow="Sous-parcours sanitaire"
      highlights={["Signalement", "Localisation", "Suivi visuel"]}
      title="Frelon"
    />
  );
}
