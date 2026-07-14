import {
  getCurrentApiaryIdFromMovements,
  sortHiveMovementsByDeparture,
} from "@/features/hive-movements";
import Link from "next/link";
import type {
  HiveMovementReason,
  HiveMovementStatus,
  HiveMovementSummary,
} from "@/features/hive-movements";

import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { DecorativeImage } from "./DecorativeImage";
import { StatePanel } from "./StatePanel";
import { StatusBadge } from "./StatusBadge";
import { TranshumanceFormsPreview } from "./TranshumanceFormsPreview";
import { visualAssets } from "./visualAssets";

const apiariesById = {
  "dev-apiary-home": "Rucher école",
  "dev-apiary-hill": "Rucher des coteaux",
  "apiary-vallon": "Rucher du Vallon",
  "apiary-acacias": "Rucher des Acacias",
  "apiary-foret": "Rucher de la Forêt",
} satisfies Record<string, string>;

const previewMovements = [
  {
    id: "movement-printemps",
    sourceApiaryId: "apiary-vallon",
    destinationApiaryId: "apiary-acacias",
    departureDate: new Date("2026-04-12T08:00:00.000Z"),
    arrivalDate: new Date("2026-04-12T11:00:00.000Z"),
    status: "COMPLETED",
    reason: "HONEY_FLOW",
    items: [
      { hiveId: "Ruche DEV-01", notes: "Colonie forte" },
      { hiveId: "Ruche DEV-02", notes: "À surveiller après arrivée" },
    ],
  },
  {
    id: "movement-ete",
    sourceApiaryId: "apiary-acacias",
    destinationApiaryId: "apiary-foret",
    departureDate: new Date("2026-07-18T06:30:00.000Z"),
    arrivalDate: null,
    status: "PLANNED",
    reason: "GROUPING",
    items: [{ hiveId: "Ruche DEV-03", notes: "Préparation de lot" }],
  },
] satisfies HiveMovementSummary[];

const checklistItems = [
  "Vérifier les ruches incluses",
  "Préparer sangles et aération",
  "Noter source et destination",
  "Confirmer sans suivi GPS",
];

export function TranshumanceShellPreview({
  movements,
}: {
  movements?: HiveMovementSummary[] | null;
}) {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation("/transhumance");
  const displayMovements = movements && movements.length > 0 ? movements : previewMovements;
  const hasLiveMovements = Boolean(movements);
  const currentApiaryId = getCurrentApiaryIdFromMovements(
    "dev-apiary-home",
    displayMovements,
  );
  const sortedMovements = sortHiveMovementsByDeparture(displayMovements);
  const plannedCount = displayMovements.filter((movement) => movement.status === "PLANNED").length;
  const inProgressCount = displayMovements.filter((movement) => movement.status === "IN_PROGRESS").length;
  const completedCount = displayMovements.filter((movement) => movement.status === "COMPLETED").length;
  const activeMovements = displayMovements.filter(
    (movement) => movement.status === "PLANNED" || movement.status === "IN_PROGRESS",
  );
  const hiveCount = new Set(
    displayMovements.flatMap((movement) => movement.items.map((item) => item.hiveId)),
  ).size;
  const nextMovement = activeMovements[0] ?? sortedMovements[0] ?? null;
  const nextAction = nextMovement
    ? nextActionForMovement(nextMovement)
    : "Préparer un premier mouvement";

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-6">
          <section className="surface-panel rounded-3xl p-5 sm:p-7 lg:p-8">
            <StatusBadge
              label={hasLiveMovements ? "Lecture Prisma active" : "Preview"}
              tone={hasLiveMovements ? "active" : "preview"}
            />
            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-end">
              <div>
                <p className="section-kicker">Module transhumance</p>
                <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
                  Mouvements de ruches
                </h1>
                <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-700">
                  Préparer, suivre et clôturer les déplacements sans transformer
                  le rucher en objet mobile. Ici, seules les ruches bougent.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <HeroMetric label="À préparer" value={plannedCount} />
                  <HeroMetric label="En cours" value={inProgressCount} />
                  <HeroMetric label="Ruches" value={hiveCount} />
                </div>
              </div>
              <div className="rounded-3xl bg-gradient-amber p-5 text-white shadow-amber">
                <p className="text-sm font-bold uppercase tracking-wide text-amber-100">
                  Prochaine action
                </p>
                <p className="mt-3 text-2xl font-black leading-tight">
                  {nextAction}
                </p>
                <p className="mt-2 text-sm leading-6 text-amber-50">
                  Position actuelle estimée: {labelForApiary(currentApiaryId)}.
                  Calcul sans GPS actif.
                </p>
              </div>
            </div>
            <DecorativeImage
              alt={visualAssets.transhumance.alt}
              aspect="wide"
              className="mt-6"
              priority
              src={visualAssets.transhumance.src}
            />
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <SummaryCard detail="À préparer ou réaliser" label="Prévu" value={String(plannedCount)} />
            <SummaryCard detail="Déplacements déjà finalisés" label="Terminé" value={String(completedCount)} />
            <SummaryCard detail="Ruches affichées" label="Ruches" value={String(hiveCount)} />
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_20rem]">
            <div className="space-y-4">
              {sortedMovements.map((movement) => (
                <article
                  className="surface-panel rounded-2xl p-5"
                  key={movement.id}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="section-kicker">{labelForReason(movement.reason)}</p>
                      <h2 className="mt-2 text-xl font-black text-slate-950">
                        {labelForApiary(movement.sourceApiaryId)} vers{" "}
                        {labelForApiary(movement.destinationApiaryId)}
                      </h2>
                    </div>
                    <StatusBadge
                      label={labelForStatus(movement.status)}
                      tone={toneForStatus(movement.status)}
                    />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <DetailPill
                      label="Départ"
                      value={formatDate(movement.departureDate)}
                    />
                    <DetailPill
                      label="Arrivée"
                      value={movement.arrivalDate ? formatDate(movement.arrivalDate) : "À confirmer"}
                    />
                  </div>
                  <div className="mt-4 rounded-2xl border border-cream-300 bg-cream-50 p-4">
                    <p className="text-xs font-black uppercase text-amber-800">
                      Ruches concernées
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {movement.items.map((item) => (
                        <span
                          className="rounded-full border border-cream-300 bg-white px-3 py-2 text-xs font-black text-slate-700"
                          key={item.hiveId}
                        >
                          {item.hiveId}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl bg-cream-50 p-3">
                    <p className="text-xs font-black uppercase text-amber-800">
                      Prochaine action
                    </p>
                    <p className="mt-1 text-sm font-bold leading-6 text-slate-800">
                      {nextActionDetailForMovement(movement)}
                    </p>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    <ActionLink href="/apiaries" label="Ruchers" />
                    <ActionLink href="/tasks" label="Tâche" />
                    <ActionLink href="/visits" label="Visite" tone="primary" />
                  </div>
                </article>
              ))}
            </div>

            <aside className="surface-muted rounded-3xl p-5">
              <p className="section-kicker">Checklist terrain</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Préparer sans surcharger
              </h2>
              <div className="mt-5 space-y-3">
                {checklistItems.map((item) => (
                  <div
                    className="rounded-2xl border border-cream-300 bg-white p-4"
                    key={item}
                  >
                    <StatusBadge label="Prévu" tone="soon" />
                    <p className="mt-3 text-sm font-bold leading-6 text-slate-800">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <TranshumanceFormsPreview movements={movements ?? null} />

          <StatePanel
            detail="Formulaires limités au développement. Les vrais comptes viendront avec l'authentification."
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
        <StatusBadge label="Preview" tone="preview" />
      </div>
      <p className="mt-4 text-4xl font-black text-slate-950">{value}</p>
      <p className="mt-2 text-sm leading-6 text-field-muted">{detail}</p>
    </article>
  );
}

function HeroMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-cream-300 bg-white/80 p-3">
      <p className="text-xs font-black uppercase text-slate-600">{label}</p>
      <p className="mt-1 text-2xl font-black text-slate-950">{value}</p>
    </div>
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

function ActionLink({
  href,
  label,
  tone = "secondary",
}: {
  href: string;
  label: string;
  tone?: "primary" | "secondary";
}) {
  const className =
    tone === "primary"
      ? "bg-forest-900 text-white hover:bg-forest-800"
      : "border border-cream-300 bg-white text-slate-800 hover:border-amber-300";

  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center rounded-2xl px-4 text-sm font-black transition focus-ring ${className}`}
      href={href}
    >
      {label}
    </Link>
  );
}

function labelForApiary(apiaryId: string | null | undefined) {
  if (!apiaryId) {
    return "Rucher non précisé";
  }

  return apiariesById[apiaryId as keyof typeof apiariesById] ?? apiaryId;
}

function labelForReason(reason: HiveMovementReason) {
  const labels = {
    HONEY_FLOW: "Miellée",
    POLLINATION: "Pollinisation",
    WINTERING: "Hivernage",
    EMERGENCY: "Urgence",
    HEALTH: "Sanitaire",
    GROUPING: "Regroupement",
    OTHER: "Autre motif",
  } satisfies Record<HiveMovementReason, string>;

  return labels[reason];
}

function labelForStatus(status: HiveMovementStatus) {
  const labels = {
    PLANNED: "Prévu",
    IN_PROGRESS: "En cours",
    COMPLETED: "Terminé",
    CANCELLED: "Annulé",
  } satisfies Record<HiveMovementStatus, string>;

  return labels[status];
}

function nextActionForMovement(movement: HiveMovementSummary) {
  if (movement.status === "PLANNED") {
    return "Préparer le départ";
  }

  if (movement.status === "IN_PROGRESS") {
    return "Confirmer l'arrivée";
  }

  if (movement.status === "COMPLETED") {
    return "Relire l'historique";
  }

  return "Vérifier l'annulation";
}

function nextActionDetailForMovement(movement: HiveMovementSummary) {
  if (movement.status === "PLANNED") {
    return "Vérifier ruches, sangles, aération et destination avant le départ.";
  }

  if (movement.status === "IN_PROGRESS") {
    return "Confirmer l'arrivée et clôturer le mouvement quand les ruches sont posées.";
  }

  if (movement.status === "COMPLETED") {
    return "Relire l'historique avant de créer une visite de contrôle si besoin.";
  }

  return "Conserver l'annulation dans l'historique sans déplacer les ruches.";
}

function toneForStatus(status: HiveMovementStatus) {
  if (status === "COMPLETED") {
    return "active";
  }

  if (status === "CANCELLED") {
    return "muted";
  }

  if (status === "IN_PROGRESS") {
    return "amber";
  }

  return "soon";
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}
