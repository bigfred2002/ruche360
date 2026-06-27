import { ShellRoutePage } from "@/components/ShellRoutePage";

export default function KnowledgePage() {
  return (
    <ShellRoutePage
      currentPath="/knowledge"
      eyebrow="Parcours connaissance"
      highlights={["Fiches pratiques", "Procédures", "Notes internes"]}
      title="Base de connaissance"
    />
  );
}
