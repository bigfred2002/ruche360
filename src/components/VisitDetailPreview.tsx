import Link from "next/link";

import {
  canUseSessionModulePermission,
  createDevelopmentApplicationSession,
} from "@/features/auth";
import { createDevelopmentTaskFormAction } from "@/features/tasks/actions";
import type { VisitDetail, VisitObservationCategory, VisitStatus } from "@/features/visits";

import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { StatePanel } from "./StatePanel";
import { StatusBadge } from "./StatusBadge";

type VisitDetailPreviewProps = {
  visit: VisitDetail;
};

const fieldClass =
  "mt-1 min-h-11 w-full rounded-2xl border border-cream-300 bg-cream-50 px-3 py-2 text-sm font-bold text-slate-800 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-200";

export function VisitDetailPreview({ visit }: VisitDetailPreviewProps) {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation("/visits");
  const session = createDevelopmentApplicationSession();
  const canCreateTask = canUseSessionModulePermission(session, "tasks", "tasks.write");

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <main className="mx-auto w-full max-w-5xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-5 lg:space-y-6">
          <Link
            className="inline-flex min-h-11 items-center rounded-2xl border border-cream-300 bg-white px-4 text-sm font-black text-slate-800 transition hover:border-amber-300 hover:text-amber-900 focus-ring"
            href="/visits"
          >
            Retour aux visites
          </Link>

          <section className="surface-panel rounded-3xl p-5 sm:p-7 lg:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge
                label={labelForStatus(visit.status)}
                tone={toneForStatus(visit.status)}
              />
              <StatusBadge label="Lecture seule" tone="preview" />
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
              <div>
                <p className="section-kicker">Fiche visite</p>
                <h1 className="mt-2 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
                  {visit.objective ?? "Visite sans objectif"}
                </h1>
                <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
                  {visit.followUpSummary ??
                    "Relire la visite, ses observations et les suites prévues sans lancer d'automatisme."}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    className="inline-flex min-h-11 items-center rounded-2xl bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-amber-800 focus-ring"
                    href="/visits#visit-quick-entry"
                  >
                    Ajouter une observation
                  </Link>
                  <a
                    className="inline-flex min-h-11 items-center rounded-2xl border border-cream-300 bg-white px-4 text-sm font-black text-slate-800 transition hover:border-amber-300 hover:bg-cream-50 focus-ring"
                    href="#visit-follow-up-task"
                  >
                    Préparer une suite
                  </a>
                </div>
              </div>
              <div className="rounded-3xl border border-sage-200 bg-sage-50 p-5">
                <p className="text-sm font-black uppercase text-forest-900">
                  Date terrain
                </p>
                <p className="mt-2 text-2xl font-black text-slate-950">
                  {formatVisitDate(visit.visitedAt)}
                </p>
                <p className="mt-1 text-sm font-bold leading-6 text-field-muted">
                  {visit.observations.length} observation(s)
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <article className="surface-panel rounded-3xl p-5 sm:p-6">
              <p className="section-kicker">Contexte</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Rattachement terrain
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <InfoBlock label="Rucher" value={visit.apiaryName ?? "Non précisé"} />
                <InfoBlock label="Ruche" value={visit.hiveIdentifier ?? "Non précisée"} />
                <InfoBlock label="Colonie" value={labelForColony(visit.colonyStatus)} />
                <InfoBlock label="Météo" value={visit.weatherSummary ?? "Non renseignée"} />
              </div>
            </article>

            <aside className="surface-muted rounded-3xl p-5">
              <p className="section-kicker">Suite</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Garder le fil
              </h2>
              <p className="mt-3 text-sm font-bold leading-6 text-field-muted">
                La visite reste l&apos;historique. Les tâches portent les suites à ne
                pas oublier.
              </p>
              <div className="mt-4 grid gap-2">
                {visit.hiveId ? (
                  <Link
                    className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cream-300 bg-white px-4 text-sm font-black text-slate-800 transition hover:border-amber-300 focus-ring"
                    href={`/hives/${visit.hiveId}`}
                  >
                    Voir la ruche
                  </Link>
                ) : null}
                <Link
                  className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-forest-900 px-4 text-sm font-black text-white transition hover:bg-forest-800 focus-ring"
                  href="/tasks"
                >
                  Voir les tâches
                </Link>
              </div>
              <form
                action={createDevelopmentTaskFormAction}
                className="mt-4 rounded-2xl border border-cream-300 bg-white p-4"
                id="visit-follow-up-task"
              >
                <input name="visitId" type="hidden" value={visit.id} />
                <input name="hiveId" type="hidden" value={visit.hiveId ?? ""} />
                <input name="status" type="hidden" value="TODO" />
                <input name="priority" type="hidden" value="NORMAL" />
                <label className="block">
                  <span className="text-xs font-black uppercase text-amber-800">
                    Tâche de suivi
                  </span>
                  <input
                    className={fieldClass}
                    defaultValue={visit.followUpSummary ?? "Suite de visite à traiter"}
                    disabled={!canCreateTask}
                    name="title"
                    required
                  />
                </label>
                <label className="mt-3 block">
                  <span className="text-xs font-black uppercase text-amber-800">
                    Note
                  </span>
                  <textarea
                    className={fieldClass}
                    defaultValue={visit.notes ?? ""}
                    disabled={!canCreateTask}
                    name="description"
                    placeholder="Contexte utile pour la prochaine action"
                    rows={3}
                  />
                </label>
                <button
                  className="mt-4 min-h-11 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-field transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
                  disabled={!canCreateTask}
                  type="submit"
                >
                  Créer la tâche de suivi
                </button>
                <p className="mt-3 text-xs font-bold leading-5 text-field-muted">
                  Action volontaire: rien n&apos;est créé automatiquement depuis
                  la visite.
                </p>
              </form>
            </aside>
          </section>

          <section className="surface-panel rounded-3xl p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="section-kicker">Observations</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Notes courtes
                </h2>
              </div>
              <StatusBadge label={`${visit.observations.length} note(s)`} tone="preview" />
            </div>

            {visit.observations.length > 0 ? (
              <div className="mt-5 grid gap-3">
                {visit.observations.map((observation) => (
                  <article
                    className="rounded-2xl border border-cream-300 bg-white p-4"
                    key={observation.id}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="section-kicker">
                          {labelForObservationCategory(observation.category)}
                        </p>
                        <h3 className="mt-2 text-lg font-black text-slate-950">
                          {observation.label}
                        </h3>
                      </div>
                      <StatusBadge label="Observation" tone="active" />
                    </div>
                    {observation.value || observation.notes ? (
                      <p className="mt-3 text-sm font-bold leading-6 text-slate-800">
                        {[observation.value, observation.notes]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-5">
                <StatePanel
                  detail="Ajoute une observation depuis la page Visites quand la saisie terrain commence."
                  kind="empty"
                  label="Aucune observation"
                  title="La visite reste légère"
                />
              </div>
            )}
          </section>

          <section className="surface-muted rounded-3xl p-5 sm:p-6">
            <p className="section-kicker">Notes</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Commentaire terrain
            </h2>
            <p className="mt-3 text-sm font-bold leading-6 text-field-muted">
              {visit.notes ?? "Aucune note générale."}
            </p>
          </section>
        </div>
      </main>
    </AppShell>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-cream-300 bg-white p-4">
      <p className="text-xs font-black uppercase text-amber-800">{label}</p>
      <p className="mt-2 text-sm font-bold leading-6 text-slate-800">{value}</p>
    </div>
  );
}

function formatVisitDate(date: Date | null) {
  if (!date) {
    return "À préciser";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function labelForColony(status: string | null) {
  if (!status) {
    return "Non renseignée";
  }

  return status === "ACTIVE" ? "Active" : status;
}

function labelForObservationCategory(category: VisitObservationCategory) {
  const labels = {
    COLONY: "Colonie",
    RESERVES: "Réserves",
    HIVE: "Ruche",
    HEALTH: "Sanitaire",
    ACTION: "Action",
    FOLLOW_UP: "Suite",
    NOTE: "Note",
  } satisfies Record<VisitObservationCategory, string>;

  return labels[category];
}

function labelForStatus(status: VisitStatus) {
  const labels = {
    DRAFT: "Brouillon",
    PLANNED: "Prévue",
    IN_PROGRESS: "En cours",
    COMPLETED: "Terminée",
    CANCELLED: "Annulée",
    ARCHIVED: "Archivée",
  } satisfies Record<VisitStatus, string>;

  return labels[status];
}

function toneForStatus(status: VisitStatus) {
  if (status === "COMPLETED") {
    return "active";
  }

  if (status === "CANCELLED" || status === "ARCHIVED") {
    return "muted";
  }

  if (status === "IN_PROGRESS") {
    return "amber";
  }

  return "soon";
}
