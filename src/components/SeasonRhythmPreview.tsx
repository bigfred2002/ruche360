import { StatusBadge } from "./StatusBadge";

const rhythmSteps = [
  {
    title: "Observer",
    detail: "Signaux terrain, météo ressentie et points à vérifier.",
    timing: "Matin",
    tone: "active" as const,
  },
  {
    title: "Prioriser",
    detail: "Ruchers, tâches et alertes à traiter en premier.",
    timing: "Tournée",
    tone: "amber" as const,
  },
  {
    title: "Noter",
    detail: "Visites, constats et décisions à garder en historique.",
    timing: "Retour",
    tone: "preview" as const,
  },
  {
    title: "Préparer",
    detail: "Matériel, documents et prochaines actions à anticiper.",
    timing: "Suite",
    tone: "soon" as const,
  },
];

const fieldSignals = [
  { label: "Lecture terrain", value: "Rapide", accent: "bg-sage-100 text-forest-900" },
  { label: "Actions réelles", value: "Aucune", accent: "bg-amber-100 text-amber-950" },
  { label: "Données", value: "Statiques", accent: "bg-slate-100 text-slate-800" },
];

export function SeasonRhythmPreview() {
  return (
    <section className="rounded-3xl border border-cream-300 bg-white p-5 shadow-field sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-kicker">Rythme de saison</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Un cockpit pensé pour décider sans se disperser.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-field-muted">
            Cette surface cadre le futur tempo de l&apos;application: lecture rapide,
            priorités visibles et modules rangés par contexte, sans activer de
            fonction métier.
          </p>
        </div>
        <StatusBadge label="Preview statique" tone="preview" />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_18rem]">
        <div className="grid gap-3 sm:grid-cols-2">
          {rhythmSteps.map((step, index) => (
            <article
              className="motion-card rounded-2xl border border-cream-300 bg-cream-50 p-4"
              key={step.title}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white text-sm font-black text-amber-900 ring-1 ring-cream-300">
                  {index + 1}
                </span>
                <StatusBadge label={step.timing} tone={step.tone} />
              </div>
              <h3 className="mt-4 text-base font-black text-slate-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-field-muted">
                {step.detail}
              </p>
            </article>
          ))}
        </div>

        <aside className="rounded-3xl bg-slate-950 p-5 text-white shadow-field">
          <p className="text-sm font-black uppercase tracking-wide text-amber-100">
            Ambiance cockpit
          </p>
          <p className="mt-3 text-3xl font-black leading-tight">
            Plus vivant, toujours calme.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-200">
            Les micro-surfaces guident l&apos;oeil, mais aucun bouton ne laisse
            croire qu&apos;une opération réelle est disponible.
          </p>
          <div className="mt-5 space-y-3">
            {fieldSignals.map((signal) => (
              <div
                className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 p-3"
                key={signal.label}
              >
                <span className="text-sm font-bold text-slate-100">
                  {signal.label}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-black uppercase ${signal.accent}`}
                >
                  {signal.value}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
