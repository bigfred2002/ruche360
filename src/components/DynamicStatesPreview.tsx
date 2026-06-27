import { StatePanel, type StatePanelKind } from "./StatePanel";
import { StatusBadge } from "./StatusBadge";

type StatePreview = {
  detail: string;
  kind: StatePanelKind;
  label: string;
  title: string;
};

const statePreviews: StatePreview[] = [
  {
    detail: "Aucune visite planifiée pour ce rucher. Le futur écran proposera une surface calme plutôt qu'une liste vide.",
    kind: "empty",
    label: "Vide",
    title: "Aucune donnée à afficher",
  },
  {
    detail: "Chargement prévu pour les futures vues serveur, sans bloquer la navigation ni masquer le contexte.",
    kind: "loading",
    label: "Chargement",
    title: "Données en préparation",
  },
  {
    detail: "Le membre voit que le module existe, mais son rôle ne donne pas accès à l'action demandée.",
    kind: "no-permission",
    label: "Permission",
    title: "Accès limité par le rôle",
  },
  {
    detail: "Un module désactivé est masqué ou présenté comme indisponible, sans effacer ses données.",
    kind: "disabled",
    label: "Désactivé",
    title: "Module non actif",
  },
  {
    detail: "Les fonctions IA, IoT ou connectées peuvent être annoncées sans être exposées comme utilisables.",
    kind: "coming-soon",
    label: "À venir",
    title: "Fonction prévue",
  },
  {
    detail: "Une alerte doit rester lisible en extérieur et nommer le risque sans déclencher d'action automatique.",
    kind: "alert",
    label: "Alerte",
    title: "Signal à vérifier",
  },
];

export function DynamicStatesPreview() {
  return (
    <section className="surface-muted rounded-3xl p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-kicker">
            États dynamiques
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Vocabulaire visuel des futurs écrans
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-field-muted">
            Ces états préparent les prochains parcours sans appeler d&apos;API,
            sans session et sans logique métier active.
          </p>
        </div>
        <StatusBadge label="Bibliothèque UI" tone="preview" />
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {statePreviews.map((state) => (
          <StatePanel key={state.kind} {...state} />
        ))}
      </div>
    </section>
  );
}
