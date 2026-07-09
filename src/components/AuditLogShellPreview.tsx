import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { StatePanel } from "./StatePanel";
import { StatusBadge } from "./StatusBadge";

const filterChips = [
  "Organisation",
  "Module",
  "Importance",
  "Période",
  "Cible",
] as const;

const previewEvents = [
  {
    detail: "Changement structurant, sans recopier toute la configuration.",
    importance: "SECURITY",
    label: "Module matériel activé",
    module: "modules",
  },
  {
    detail: "Trace courte liée au contexte, sans localisation précise.",
    importance: "IMPORTANT",
    label: "Mouvement de transhumance terminé",
    module: "transhumance",
  },
  {
    detail: "Résumé d'action, sans description longue ni donnée sensible.",
    importance: "INFO",
    label: "Tâche terrain clôturée",
    module: "tasks",
  },
] as const;

const guardrails = [
  "Lecture shell uniquement dans ce lot.",
  "Aucune émission automatique d'événement.",
  "Aucun export de journal.",
  "Aucun secret, token ou contenu complet sensible.",
] as const;

export function AuditLogShellPreview() {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation("/admin");

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-6">
          <section className="surface-panel rounded-3xl p-5 sm:p-7 lg:p-8">
            <StatusBadge label="Shell journal" tone="preview" />
            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-end">
              <div>
                <p className="section-kicker">Administration</p>
                <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
                  Journal d&apos;activité
                </h1>
                <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-700">
                  Surface de prévisualisation pour consulter plus tard les
                  actions importantes d&apos;une organisation. Les événements
                  affichés ici sont statiques et ne lisent pas encore la base.
                </p>
              </div>
              <div className="rounded-3xl bg-gradient-amber p-5 text-white shadow-amber">
                <p className="text-sm font-bold uppercase tracking-wide text-amber-100">
                  Statut
                </p>
                <p className="mt-3 text-3xl font-black">Lecture</p>
                <p className="mt-2 text-sm leading-6 text-amber-50">
                  Route prête, journal réel non branché.
                </p>
              </div>
            </div>
          </section>

          <section className="surface-panel rounded-3xl p-5 sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="section-kicker">Filtres prévus</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Retrouver une action sans exposer trop de détails
                </h2>
              </div>
              <StatusBadge label="Statique" tone="soon" />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {filterChips.map((filter) => (
                <span
                  className="rounded-full border border-cream-300 bg-cream-50 px-4 py-2 text-sm font-bold text-slate-800"
                  key={filter}
                >
                  {filter}
                </span>
              ))}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_22rem]">
            <div className="surface-panel rounded-3xl p-5 sm:p-6">
              <p className="section-kicker">Exemples non dynamiques</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Entrées de journal cibles
              </h2>
              <div className="mt-5 space-y-3">
                {previewEvents.map((event) => (
                  <article
                    className="rounded-2xl border border-cream-300 bg-white p-4"
                    key={event.label}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-black uppercase text-amber-800">
                          {event.module}
                        </p>
                        <h3 className="mt-2 text-lg font-black text-slate-950">
                          {event.label}
                        </h3>
                      </div>
                      <StatusBadge
                        label={event.importance}
                        tone={event.importance === "INFO" ? "active" : "amber"}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-field-muted">
                      {event.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="surface-muted rounded-3xl p-5">
              <p className="section-kicker">Garde-fous</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Un journal, pas une sauvegarde complète
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
            detail="Lecture Prisma, pagination et filtres arriveront plus tard. Les émissions restent séparées."
            kind="coming-soon"
            label="Sans données réelles"
            title="Le modèle existe, la consultation réelle attend son tour"
          />
        </div>
      </div>
    </AppShell>
  );
}
