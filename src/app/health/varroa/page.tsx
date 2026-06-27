import { ShellRoutePage } from "@/components/ShellRoutePage";

export default function VarroaPage() {
  return (
    <ShellRoutePage
      currentPath="/health/varroa"
      eyebrow="Sous-parcours sanitaire"
      highlights={["Comptage manuel", "Seuils à cadrer", "Historique"]}
      title="Varroa"
    />
  );
}
