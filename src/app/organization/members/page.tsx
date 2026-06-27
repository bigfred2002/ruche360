import { ShellRoutePage } from "@/components/ShellRoutePage";

export default function OrganizationMembersPage() {
  return (
    <ShellRoutePage
      currentPath="/organization/members"
      eyebrow="Gestion des membres"
      highlights={["Membres", "Rôles", "Permissions"]}
      title="Utilisateurs et rôles"
    />
  );
}
