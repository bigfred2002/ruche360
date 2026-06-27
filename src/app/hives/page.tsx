import { ShellRoutePage } from "@/components/ShellRoutePage";

export default function HivesPage() {
  return (
    <ShellRoutePage
      currentPath="/hives"
      eyebrow="Parcours ruches"
      highlights={["Parc de ruches", "État matériel", "Lien colonie"]}
      title="Ruches"
    />
  );
}
