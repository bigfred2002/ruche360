import { ShellRoutePage } from "@/components/ShellRoutePage";

export default function ContactsPage() {
  return (
    <ShellRoutePage
      currentPath="/contacts"
      eyebrow="Parcours contacts"
      highlights={["Référents", "Sanitaire", "Partenaires"]}
      title="Contacts utiles"
    />
  );
}
