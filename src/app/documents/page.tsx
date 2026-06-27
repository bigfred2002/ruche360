import { ShellRoutePage } from "@/components/ShellRoutePage";

export default function DocumentsPage() {
  return (
    <ShellRoutePage
      currentPath="/documents"
      eyebrow="Parcours documents"
      highlights={["Classement", "Liens futurs", "Conservation"]}
      title="Documents"
    />
  );
}
