import { ErrorPageShell } from "@/components/ErrorPageShell";

export default function ForbiddenPage() {
  return (
    <ErrorPageShell
      code="403"
      currentPath="/errors/403"
      detail="Cette zone sera réservée aux membres ayant les permissions adaptées."
      humor="La porte est fermée, mais au moins elle est bien étiquetée. Il faudra le bon rôle pour entrer."
      title="Accès non autorisé"
    />
  );
}
