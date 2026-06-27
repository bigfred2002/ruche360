import { StatusBadge } from "./StatusBadge";

type WorkflowStep = {
  label: string;
  title: string;
};

type WorkflowPreview = {
  accent: "amber" | "forest" | "sage" | "slate";
  detail: string;
  entry: string;
  marker: string;
  steps: WorkflowStep[];
  title: string;
};

const workflowPreviews: WorkflowPreview[] = [
  {
    accent: "amber",
    detail: "Accès rapide depuis le cockpit, puis fiche synthèse lisible en extérieur avant tout futur détail.",
    entry: "Cockpit · carte Ruchers",
    marker: "Ru",
    title: "Rucher",
    steps: [
      { label: "1", title: "Vue liste courte" },
      { label: "2", title: "Fiche site" },
      { label: "3", title: "Modules liés" },
    ],
  },
  {
    accent: "forest",
    detail: "Parcours pensé pour le terrain: préparation, observation, puis confirmation, sans formulaire actif ici.",
    entry: "Cockpit · priorités",
    marker: "Vi",
    title: "Visite",
    steps: [
      { label: "1", title: "Préparer" },
      { label: "2", title: "Observer" },
      { label: "3", title: "Relire" },
    ],
  },
  {
    accent: "sage",
    detail: "Catalogue séparé de l'accueil pour garder la navigation mobile légère et éviter les options trop visibles.",
    entry: "Entrée secondaire",
    marker: "Mo",
    title: "Modules",
    steps: [
      { label: "1", title: "Comparer" },
      { label: "2", title: "Comprendre" },
      { label: "3", title: "Activer plus tard" },
    ],
  },
  {
    accent: "slate",
    detail: "Profil organisation comme zone de réglages, membres et permissions, distincte des actions apicoles.",
    entry: "Sidebar desktop",
    marker: "Or",
    title: "Organisation",
    steps: [
      { label: "1", title: "Espace" },
      { label: "2", title: "Membres" },
      { label: "3", title: "Permissions" },
    ],
  },
];

const accentClasses: Record<WorkflowPreview["accent"], string> = {
  amber: "bg-amber-100 text-amber-950 ring-amber-200",
  forest: "bg-forest-100 text-forest-900 ring-forest-200",
  sage: "bg-sage-100 text-forest-900 ring-sage-200",
  slate: "bg-slate-100 text-slate-900 ring-slate-200",
};

export function ResponsiveWorkflowsPreview() {
  return (
    <section className="surface-panel rounded-3xl p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-kicker">
            Parcours responsive
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Chemins mobile-first prévus
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-field-muted">
            Ces parcours cadrent l&apos;enchaînement des futurs écrans sans
            créer de route, de formulaire ou d&apos;action métier.
          </p>
        </div>
        <StatusBadge label="Workflow statique" tone="preview" />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {workflowPreviews.map((workflow) => (
          <article
            className="rounded-2xl border border-cream-300 bg-cream-50 p-4"
            key={workflow.title}
          >
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={`grid size-12 shrink-0 place-items-center rounded-2xl text-sm font-black ring-1 ${accentClasses[workflow.accent]}`}
              >
                {workflow.marker}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-black text-slate-950">
                      {workflow.title}
                    </h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                      {workflow.entry}
                    </p>
                  </div>
                  <StatusBadge label="Prévu" tone="soon" />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-650">
                  {workflow.detail}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {workflow.steps.map((step) => (
                <div
                  className="rounded-2xl border border-cream-300 bg-white p-3"
                  key={`${workflow.title}-${step.label}`}
                >
                  <span className="grid size-7 place-items-center rounded-xl bg-amber-50 text-xs font-black text-amber-900">
                    {step.label}
                  </span>
                  <p className="mt-2 text-sm font-black text-slate-950">
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-4">
        <p className="text-sm font-black text-slate-950">
          Mobile d&apos;abord, détails ensuite.
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-650">
          La bottom nav garde les actions terrain principales. Les réglages,
          modules et options restent dans des surfaces secondaires.
        </p>
      </div>
    </section>
  );
}
