import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { DecorativeImage } from "./DecorativeImage";
import { StatePanel } from "./StatePanel";
import { StatusBadge } from "./StatusBadge";
import { visualAssets } from "./visualAssets";

const taskLanes = [
  {
    detail: "Actions courtes à préparer avant la prochaine sortie terrain.",
    label: "À faire",
    metric: "TODO",
    tone: "soon" as const,
  },
  {
    detail: "Interventions en cours de suivi, sans automatisme ni rappel actif.",
    label: "En cours",
    metric: "IN_PROGRESS",
    tone: "amber" as const,
  },
  {
    detail: "Actions terminées, annulées ou archivées hors des vues courantes.",
    label: "Clôturées",
    metric: "DONE",
    tone: "active" as const,
  },
] as const;

const taskContexts = [
  "Rucher",
  "Ruche",
  "Colonie",
  "Visite",
  "Membre assigné",
  "Échéance",
] as const;

const guardrails = [
  "Aucune création de tâche dans ce lot.",
  "Aucune notification ou récurrence.",
  "Aucune assignation fonctionnelle.",
  "Aucune prescription sanitaire automatique.",
] as const;

export function TasksShellPreview() {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation("/tasks");

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-6">
          <section className="surface-panel rounded-3xl p-5 sm:p-7 lg:p-8">
            <StatusBadge label="Shell tâches" tone="preview" />
            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-end">
              <div>
                <p className="section-kicker">Actions terrain</p>
                <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
                  Tâches
                </h1>
                <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-700">
                  Première surface mobile-first pour cadrer les actions à faire:
                  prioriser, rattacher au bon contexte et garder les suites
                  visibles. Tout reste statique dans ce lot.
                </p>
              </div>
              <div className="rounded-3xl bg-gradient-amber p-5 text-white shadow-amber">
                <p className="text-sm font-bold uppercase tracking-wide text-amber-100">
                  Principe
                </p>
                <p className="mt-3 text-3xl font-black">Court</p>
                <p className="mt-2 text-sm leading-6 text-amber-50">
                  Une tâche est une action simple, pas un outil de gestion de
                  projet.
                </p>
              </div>
            </div>
            <DecorativeImage
              alt={visualAssets.tasks.alt}
              aspect="wide"
              className="mt-6"
              priority
              src={visualAssets.tasks.src}
            />
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {taskLanes.map((lane) => (
              <article
                className="motion-card surface-panel rounded-2xl p-5"
                key={lane.label}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-slate-100 text-sm font-black text-slate-800 ring-1 ring-slate-200">
                    {lane.label.slice(0, 2)}
                  </span>
                  <StatusBadge label={lane.metric} tone={lane.tone} />
                </div>
                <h2 className="mt-5 text-lg font-black text-slate-950">
                  {lane.label}
                </h2>
                <p className="mt-2 text-sm leading-6 text-field-muted">
                  {lane.detail}
                </p>
              </article>
            ))}
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_22rem]">
            <div className="surface-panel rounded-3xl p-5 sm:p-6">
              <p className="section-kicker">Contexte</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Rattacher sans alourdir
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-field-muted">
                Une tâche pourra vivre seule ou pointer vers une visite, un
                rucher, une ruche ou une colonie. Les liens restent optionnels
                pour préserver la saisie rapide.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {taskContexts.map((context) => (
                  <div
                    className="rounded-2xl border border-cream-300 bg-cream-50 p-4"
                    key={context}
                  >
                    <StatusBadge label="Optionnel" tone="preview" />
                    <p className="mt-3 text-sm font-bold leading-6 text-slate-800">
                      {context}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="surface-muted rounded-3xl p-5">
              <p className="section-kicker">Limites</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Pas encore un gestionnaire actif
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
            detail="Les actions serveur, l'assignation et les changements de statut arriveront dans un lot dédié avec permissions et validations."
            kind="coming-soon"
            label="Sans CRUD"
            title="Le modèle existe, la gestion active attend son tour"
          />
        </div>
      </div>
    </AppShell>
  );
}
