import { ShellRoutePage } from "@/components/ShellRoutePage";

export default function ModulesPage() {
  return (
    <ShellRoutePage
      currentPath="/modules"
      eyebrow="Catalogue modules"
      highlights={["Actifs", "Désactivés", "À venir"]}
      title="Modules"
    />
  );
}
