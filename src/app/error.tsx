"use client";

import { ErrorPageShell } from "@/components/ErrorPageShell";

export default function Error() {
  return (
    <ErrorPageShell
      code="500"
      detail="Une erreur inattendue s'est produite dans l'interface. Les données ne sont pas modifiées par cette page."
      humor="Le cockpit a secoué un peu trop fort. On pose l'enfumoir, on respire, et on revient proprement."
      title="Quelque chose a déraillé"
    />
  );
}
