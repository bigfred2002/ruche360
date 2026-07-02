import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { StatePanel } from "./StatePanel";
import { StatusBadge } from "./StatusBadge";

const visitSteps = [
  {
    detail: "Rucher, ruche ou colonie cible, météo observée, objectif de passage.",
    label: "Préparer",
    metric: "Avant terrain",
  },
  {
    detail: "Force, ponte, réserves, comportement, signes sanitaires et notes courtes.",
    label: "Observer",
    metric: "Sur place",
  },
  {
    detail: "Actions réalisées, matériel utilisé, nourrissement ou contrôle sanitaire.",
    label: "Intervenir",
    metric: "Sans automatisme",
  },
  {
    detail: "Tâches à planifier, points de vigilance et prochaine fenêtre de visite.",
    label: "Suivre",
    metric: "Après visite",
  },
] as const;

const futureFields = [
  "Rucher et ruche concernés",
  "État de la colonie",
  "Réserves et nourrissement",
  "Sanitaire et varroa",
  "Actions réalisées",
  "Tâches à créer",
] as const;

const guardrails = [
  "Aucune saisie réelle dans ce lot.",
  "Aucune prescription sanitaire automatique.",
  "Aucune analyse IA de visite.",
  "Aucun lien obligatoire avec le matériel ou la transhumance.",
] as const;

export function VisitsShellPreview() {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation("/visits");

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-6">
          <section className="surface-panel rounded-3xl p-5 sm:p-7 lg:p-8">
            <StatusBadge label="Shell visites" tone="preview" />
            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-end">
              <div>
                <p className="section-kicker">Parcours terrain</p>
                <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
                  Visites
                </h1>
                <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-700">
                  Première surface mobile-first pour cadrer une future visite:
                  préparer le passage, observer vite, noter les actions et
                  garder les suites visibles. Tout reste statique dans ce lot.
                </p>
              </div>
              <div className="rounded-3xl bg-gradient-amber p-5 text-white shadow-amber">
                <p className="text-sm font-bold uppercase tracking-wide text-amber-100">
                  Statut
                </p>
                <p className="mt-3 text-3xl font-black">Prévu</p>
                <p className="mt-2 text-sm leading-6 text-amber-50">
                  Route prête, aucune visite enregistrée ou modifiée.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {visitSteps.map((step) => (
              <article
                className="motion-card surface-panel rounded-2xl p-5"
                key={step.label}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-sage-100 text-sm font-black text-forest-900 ring-1 ring-sage-200">
                    {step.label.slice(0, 2)}
                  </span>
                  <StatusBadge label={step.metric} tone="soon" />
                </div>
                <h2 className="mt-5 text-lg font-black text-slate-950">
                  {step.label}
                </h2>
                <p className="mt-2 text-sm leading-6 text-field-muted">
                  {step.detail}
                </p>
              </article>
            ))}
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_22rem]">
            <div className="surface-panel rounded-3xl p-5 sm:p-6">
              <p className="section-kicker">Future fiche</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Informations à garder courtes sur mobile
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {futureFields.map((field) => (
                  <div
                    className="rounded-2xl border border-cream-300 bg-cream-50 p-4"
                    key={field}
                  >
                    <StatusBadge label="À cadrer" tone="preview" />
                    <p className="mt-3 text-sm font-bold leading-6 text-slate-800">
                      {field}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="surface-muted rounded-3xl p-5">
              <p className="section-kicker">Limites</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Pas encore un carnet de visite
              </h2>
              <div className="mt-4 space-y-3">
                {guardrails.map((rule) => (
                  <div
                    className="rounded-2xl border border-stone-200 bg-white p-4"
                    key={rule}
                  >
                    <p className="text-sm font-bold leading-6 text-slate-800">
                      {rule}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <StatePanel
            detail="Le prochain lot pourra cadrer le modèle visite/tâches avant tout formulaire actif. Ici, on stabilise seulement le parcours et le vocabulaire terrain."
            kind="coming-soon"
            label="Sans CRUD"
            title="La saisie réelle attend un lot dédié"
          />
        </div>
      </div>
    </AppShell>
  );
}
