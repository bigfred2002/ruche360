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

export function VisitsShellPreview({ visits }: { visits?: VisitSummary[] | null }) {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation("/visits");
  const displayVisits = visits && visits.length > 0 ? visits : previewVisits;
  const hasLiveVisits = Boolean(visits);
  const plannedCount = displayVisits.filter((visit) => visit.status === "PLANNED").length;
  const inProgressCount = displayVisits.filter((visit) => visit.status === "IN_PROGRESS").length;
  const completedCount = displayVisits.filter((visit) => visit.status === "COMPLETED").length;

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
                  {hasLiveVisits
                    ? "Visites de développement lues depuis PostgreSQL."
                    : "Route prête, aucune visite réelle affichée."}
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
              detail="Saisies terrain encore ouvertes"
              label="En cours"
              value={String(inProgressCount)}
            />
            <SummaryCard
              detail="Visites terminées dans la liste affichée"
              label="Terminées"
              value={String(completedCount)}
            />
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
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <DetailPill label="Rucher" value={visit.apiaryId ?? "Non précisé"} />
                    <DetailPill label="Ruche" value={visit.hiveId ?? "Non précisée"} />
                    <DetailPill label="Colonie" value={visit.colonyId ?? "Non précisée"} />
                  </div>
                  <p className="mt-4 rounded-2xl border border-cream-300 bg-cream-50 p-4 text-sm font-bold leading-6 text-slate-800">
                    {visit.followUpSummary ?? "Aucune suite indiquée."}
                  </p>
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
                Pas encore un carnet public
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
          </section>

          <VisitsFormsPreview visits={visits ?? null} />

          <StatePanel
            detail="Les formulaires ci-dessus restent limites a la session de developpement et aux donnees fictives. Le branchement a de vrais comptes attend l'authentification."
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
