import { ShellRoutePage } from "@/components/ShellRoutePage";

export default function TasksPage() {
  return (
    <ShellRoutePage
      currentPath="/tasks"
      eyebrow="Parcours tâches"
      highlights={["À faire", "Terrain", "Suivi"]}
      title="Tâches"
    />
  );
}
