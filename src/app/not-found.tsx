import { ErrorPageShell } from "@/components/ErrorPageShell";

export default function NotFound() {
  return (
    <ErrorPageShell
      code="404"
      detail="La page demandée n'existe pas encore dans Rucher360 ou a changé de chemin."
      humor="On a fouillé le rucher, les hausses et même le carnet de terrain: cette page n'a pas été trouvée."
      title="Page introuvable"
    />
  );
}
