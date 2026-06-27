import { ShellRoutePage } from "@/components/ShellRoutePage";

export default function OrganizationPage() {
  return (
    <ShellRoutePage
      currentPath="/organization"
      eyebrow="Profil organisation"
      highlights={["Espace", "Paramètres", "Modules"]}
      title="Organisation"
    />
  );
}
