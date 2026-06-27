import { ErrorPageShell } from "@/components/ErrorPageShell";

export default function ServerErrorPage() {
  return (
    <ErrorPageShell
      code="500"
      currentPath="/errors/500"
      detail="Cette page illustre l'état prévu pour une erreur interne."
      humor="Une abeille a probablement marché sur le clavier serveur. Hypothèse non contractuelle."
      title="Erreur interne"
    />
  );
}
