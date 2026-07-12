import Link from "next/link";

import type { HiveSummary } from "@/features/apiary";
import type { VisitStatus, VisitSummary } from "@/features/visits";

import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { DecorativeImage } from "./DecorativeImage";
import { StatePanel } from "./StatePanel";
import { StatusBadge } from "./StatusBadge";
import { VisitsFormsPreview } from "./VisitsFormsPreview";
import { visualAssets } from "./visualAssets";

const visitSteps = [
  {
    detail: "Cible, météo et objectif.",
    label: "Préparer",
    metric: "Avant terrain",
  },
  {
    detail: "Force, réserves, signes et notes.",
    label: "Observer",
    metric: "Sur place",
  },
  {
    detail: "Actions, matériel et soins notés.",
    label: "Intervenir",
    metric: "Sans automatisme",
  },
  {
    detail: "Suites et prochaine visite.",
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
  "Saisie limitée à la session de développement.",
  "Aucune prescription sanitaire automatique.",
  "Aucune analyse IA de visite.",
  "Aucun lien obligatoire avec le matériel ou la transhumance.",
] as const;

const formLimits = [
  "Pas d'authentification réelle.",
  "Pas d'API publique.",
  "Pas de création automatique de tâche.",
  "Pas de diagnostic sanitaire.",
] as const;

const previewVisits = [
  {
    id: "visit-preview-1",
    organizationId: "preview",
    apiaryId: "dev-apiary-home",
    hiveId: "dev-hive-001",
    colonyId: "dev-colony-001",
    authorMembershipId: null,
    status: "PLANNED",
    visitedAt: new Date("2026-07-08T08:00:00.000Z"),
    objective: "Contrôle rapide avant hausse",
    followUpSummary: "Surveiller réserves et place disponible",
  },
  {
    id: "visit-preview-2",
    organizationId: "preview",
    apiaryId: "dev-apiary-hill",
    hiveId: null,
    colonyId: null,
    authorMembershipId: null,
    status: "DRAFT",
    visitedAt: null,
    objective: "Note terrain à compléter",
    followUpSummary: "Ajouter les observations sur place",
  },
] satisfies VisitSummary[];

export function VisitsShellPreview({
  hives,
  visits,
}: {
  hives?: HiveSummary[] | null;
  visits?: VisitSummary[] | null;
}) {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation("/visits");
  const displayVisits = visits && visits.length > 0 ? visits : previewVisits;
  const hasLiveVisits = Boolean(visits);
  const plannedCount = displayVisits.filter((visit) => visit.status === "PLANNED").length;
  const inProgressCount = displayVisits.filter((visit) => visit.status === "IN_PROGRESS").length;
  const completedCount = displayVisits.filter((visit) => visit.status === "COMPLETED").length;
  const nextVisit = displayVisits[0];

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-6">
          <section className="surface-panel rounded-3xl p-5 sm:p-7 lg:p-8">
            <StatusBadge
              label={hasLiveVisits ? "Lecture Prisma active" : "Preview"}
              tone={hasLiveVisits ? "active" : "preview"}
            />
            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-end">
              <div>
                <p className="section-kicker">Parcours terrain</p>
                <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
                  Visites
                </h1>
                <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-700">
                  Préparer le passage, noter l&apos;essentiel et garder les
                  suites visibles. Les actions restent limitées au développement.
                </p>
              </div>
              <div className="rounded-3xl bg-gradient-amber p-5 text-white shadow-amber">
                <p className="text-sm font-bold uppercase tracking-wide text-amber-100">
                  Statut
                </p>
                <p className="mt-3 text-3xl font-black">Prévu</p>
                <p className="mt-2 text-sm leading-6 text-amber-50">
                  {hasLiveVisits
                    ? "Données de développement lues depuis PostgreSQL."
                    : "Route prête, sans visite réelle."}
                </p>
              </div>
            </div>
            <DecorativeImage
              alt={visualAssets.visits.alt}
              aspect="wide"
              className="mt-6"
              priority
              src={visualAssets.visits.src}
            />
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <SummaryCard
              detail="Visites prévues à préparer sur le terrain"
              label="Prévues"
              value={String(plannedCount)}
            />
            <SummaryCard
              detail="Saisies encore ouvertes"
              label="En cours"
              value={String(inProgressCount)}
            />
            <SummaryCard
              detail="Visites de la liste"
              label="Terminées"
              value={String(completedCount)}
            />
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_20rem]">
            <article className="surface-panel rounded-3xl p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="section-kicker">Prochaine sortie</p>
                  <h2 className="mt-2 text-2xl font-black text-slate-950">
                    {nextVisit.objective ?? "Visite à préparer"}
                  </h2>
                </div>
                <StatusBadge
                  label={labelForStatus(nextVisit.status)}
                  tone={toneForStatus(nextVisit.status)}
                />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <DetailPill label="Date" value={formatVisitDate(nextVisit.visitedAt)} />
                <DetailPill label="Rucher" value={nextVisit.apiaryId ?? "Non précisé"} />
                <DetailPill label="Ruche" value={nextVisit.hiveId ?? "Non précisée"} />
              </div>
              <p className="mt-4 rounded-2xl border border-cream-300 bg-cream-50 p-4 text-sm font-bold leading-6 text-slate-800">
                {nextVisit.followUpSummary ?? "Aucune suite indiquée."}
              </p>
            </article>

            <aside className="surface-muted rounded-3xl p-5">
              <p className="section-kicker">Rythme terrain</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                4 étapes courtes
              </h2>
              <div className="mt-4 space-y-2">
                {visitSteps.map((step, index) => (
                  <div
                    className="flex items-center gap-3 rounded-2xl border border-cream-300 bg-white p-3"
                    key={step.label}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-sage-100 text-xs font-black text-forest-900">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-black text-slate-950">
                        {step.label}
                      </p>
                      <p className="text-xs font-bold text-slate-650">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_22rem]">
            <div className="space-y-4">
              {displayVisits.map((visit) => (
                <article className="surface-panel rounded-2xl p-5" key={visit.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="section-kicker">{formatVisitDate(visit.visitedAt)}</p>
                      <h2 className="mt-2 text-xl font-black text-slate-950">
                        {visit.objective ?? "Visite sans objectif"}
                      </h2>
                    </div>
                    <StatusBadge
                      label={labelForStatus(visit.status)}
                      tone={toneForStatus(visit.status)}
                    />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <DetailPill label="Rucher" value={visit.apiaryId ?? "Non précisé"} />
                    <DetailPill label="Ruche" value={visit.hiveId ?? "Non précisée"} />
                  </div>
                  <p className="mt-4 rounded-2xl border border-cream-300 bg-cream-50 p-4 text-sm font-bold leading-6 text-slate-800">
                    {visit.followUpSummary ?? "Aucune suite indiquée."}
                  </p>
                  <Link
                    className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-cream-300 bg-white px-4 text-sm font-black text-slate-800 transition hover:border-amber-300 hover:bg-cream-50 focus-ring"
                    href={`/visits/${visit.id}`}
                  >
                    Ouvrir la fiche
                  </Link>
                </article>
              ))}
            </div>

            <aside className="surface-muted rounded-3xl p-5">
              <p className="section-kicker">Garde-fous</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Actions dev seulement
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

          <details className="surface-panel rounded-3xl">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 focus-ring sm:px-6 [&::-webkit-details-marker]:hidden">
              <span>
                <span className="section-kicker">Conception</span>
                <span className="mt-1 block text-xl font-black text-slate-950">
                  Champs futurs et limites
                </span>
              </span>
              <span className="inline-flex min-h-11 items-center rounded-full border border-cream-300 bg-cream-50 px-4 text-sm font-black text-slate-700">
                Voir
              </span>
            </summary>
            <div className="grid gap-4 border-t border-cream-300 px-5 py-5 sm:px-6 lg:grid-cols-[1fr_22rem]">
              <div className="grid gap-3 sm:grid-cols-2">
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

              <aside className="surface-muted rounded-3xl p-5">
                <p className="section-kicker">Limites</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Limites claires
                </h2>
                <div className="mt-4 space-y-3">
                  {formLimits.map((rule) => (
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
            </div>
          </details>

          <VisitsFormsPreview hives={hives ?? null} visits={visits ?? null} />

          <StatePanel
            detail="Formulaires limités à la session de développement. Les vrais comptes attendent l'authentification."
            kind="empty"
            label="Dev uniquement"
            title="Actions actives sans exposition publique"
          />
        </div>
      </div>
    </AppShell>
  );
}

function SummaryCard({
  detail,
  label,
  value,
}: {
  detail: string;
  label: string;
  value: string;
}) {
  return (
    <article className="surface-panel rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-black uppercase text-slate-650">{label}</p>
        <StatusBadge label="Dev" tone="preview" />
      </div>
      <p className="mt-4 text-4xl font-black text-slate-950">{value}</p>
      <p className="mt-2 text-sm leading-6 text-field-muted">{detail}</p>
    </article>
  );
}

function DetailPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-cream-300 bg-white p-3">
      <p className="text-xs font-black uppercase text-amber-800">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
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

function formatVisitDate(date: Date | null) {
  if (!date) {
    return "Date à préciser";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}
