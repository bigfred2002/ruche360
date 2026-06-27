import { ErrorPageShell } from "@/components/ErrorPageShell";

export default function UnavailablePage() {
  return (
    <ErrorPageShell
      code="503"
      currentPath="/errors/503"
      detail="Cette page illustre un service temporairement indisponible ou en maintenance."
      humor="Le service est parti butiner deux minutes. Il revient dès que possible, les pattes pleines de pollen."
      title="Service indisponible"
    />
  );
}
