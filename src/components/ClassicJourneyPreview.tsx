import Link from "next/link";

import type { ApiarySummary, HiveSummary } from "@/features/apiary";
import type {
  EquipmentItemSummary,
  EquipmentStockSummary,
} from "@/features/equipment";
import type { HiveMovementSummary } from "@/features/hive-movements";
import type { TaskSummary } from "@/features/tasks";
import type { VisitSummary } from "@/features/visits";

import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { FirstRunGuide } from "./FirstRunGuide";
import { StatusBadge } from "./StatusBadge";

type EquipmentSnapshot = {
  items: EquipmentItemSummary[];
  stocks: EquipmentStockSummary[];
};

type ClassicJourneyPreviewProps = {
  apiaries?: ApiarySummary[] | null;
  equipment?: EquipmentSnapshot | null;
  hives?: HiveSummary[] | null;
  movements?: HiveMovementSummary[] | null;
  tasks?: TaskSummary[] | null;
  visits?: VisitSummary[] | null;
};

const guardrails = [
  "Les données sont fictives et limitées à PostgreSQL local.",
  "La session de développement ne représente pas une connexion réelle.",
  "Aucune recommandation sanitaire, IA, IoT ou GPS n'est activée.",
] as const;

const localQaCommands = [
  "make seed-dev",
  "docker compose up -d app",
  "curl -I http://localhost:3000/journey",
  "curl -I http://localhost:3000/transhumance",
] as const;

const localQaChecks = [
  "La checklist relie ruche, visite, tâche, matériel et transhumance.",
  "Une visite rapide peut être créée depuis une ruche active.",
  "Une fiche visite propose une tâche de suivi volontaire.",
  "La transhumance reste un suivi manuel sans GPS actif.",
  "Les listes vides guident vers la première action utile.",
] as const;

export function ClassicJourneyPreview({
  apiaries,
  equipment,
  hives,
  movements,
  tasks,
  visits,
}: ClassicJourneyPreviewProps) {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation("/journey");
  const activeApiaries =
    apiaries?.filter((apiary) => apiary.status === "ACTIVE") ?? [];
  const activeHives = hives?.filter((hive) => hive.status === "ACTIVE") ?? [];
  const openVisits =
    visits?.filter(
      (visit) =>
        visit.status !== "COMPLETED" &&
        visit.status !== "CANCELLED" &&
        visit.status !== "ARCHIVED",
    ) ?? [];
  const openTasks =
    tasks?.filter(
      (task) =>
        task.status === "TODO" || task.status === "IN_PROGRESS",
    ) ?? [];
  const activeMovements =
    movements?.filter(
      (movement) =>
        movement.status === "PLANNED" || movement.status === "IN_PROGRESS",
    ) ?? [];
  const availableItems =
    equipment?.items.filter((item) => item.status === "AVAILABLE").length ?? 0;
  const stockedLines =
    equipment?.stocks.filter((stock) => stock.quantity > 0).length ?? 0;
  const hasLiveRead = Boolean(apiaries || hives || visits || tasks || equipment || movements);
  const hasActiveHive = activeHives.length > 0;
  const hasOpenVisit = openVisits.length > 0;
  const hasOpenTask = openTasks.length > 0;
  const hasEquipmentReady = availableItems + stockedLines > 0;
  const hasMovementReady = activeMovements.length > 0;
  const primaryHref = hasActiveHive ? "/visits" : "/apiaries";
  const primaryLabel = hasActiveHive ? "Commencer la visite" : "Créer une ruche";
  const checklist = [
    {
      done: hasActiveHive,
      href: "/apiaries",
      label: "Créer ou choisir une ruche active",
    },
    {
      done: hasOpenVisit,
      href: "/visits",
      label: "Créer une visite rapide",
    },
    {
      done: hasOpenTask,
      href: "/tasks",
      label: "Créer une tâche de suivi si nécessaire",
    },
    {
      done: hasEquipmentReady,
      href: "/equipment",
      label: "Vérifier le matériel disponible",
    },
    {
      done: hasMovementReady,
      href: "/transhumance",
      label: "Ouvrir les mouvements si déplacement prévu",
    },
  ] as const;
  const journeySteps = [
    {
      detail: hasActiveHive
        ? "Le contexte de terrain existe déjà: choisissez une ruche active dans la visite."
        : "Créez d'abord un rucher et une ruche active pour éviter une visite hors contexte.",
      href: "/apiaries",
      label: "Voir les ruchers",
      metric: `${activeHives.length} active${activeHives.length > 1 ? "s" : ""}`,
      number: "01",
      title: "Préparer le contexte",
      tone: hasActiveHive ? "active" : "soon",
    },
    {
      detail:
        "Saisir l'objectif, l'observation et le suivi depuis la ruche active.",
      href: "/visits",
      label: "Ouvrir les visites",
      metric: `${openVisits.length} ouverte${openVisits.length > 1 ? "s" : ""}`,
      number: "02",
      title: "Faire la visite",
      tone: openVisits.length > 0 ? "amber" : "preview",
    },
    {
      detail:
        "Transformer uniquement les suites utiles en actions courtes, sans calendrier lourd.",
      href: "/tasks",
      label: "Voir les tâches",
      metric: `${openTasks.length} à suivre`,
      number: "03",
      title: "Suivre une action",
      tone: openTasks.length > 0 ? "amber" : "preview",
    },
    {
      detail:
        "Vérifier la caisse de visite et les éléments à nettoyer seulement lorsque c'est utile.",
      href: "/equipment",
      label: "Vérifier le matériel",
      metric: `${availableItems + stockedLines} repères`,
      number: "04",
      title: "Vérifier si nécessaire",
      tone: "soon",
    },
    {
      detail:
        "Préparer ou suivre un déplacement de ruches uniquement quand la sortie le demande, sans GPS actif.",
      href: "/transhumance",
      label: "Voir les mouvements",
      metric: `${activeMovements.length} actif${activeMovements.length > 1 ? "s" : ""}`,
      number: "05",
      title: "Déplacer si besoin",
      tone: activeMovements.length > 0 ? "amber" : "preview",
    },
  ] as const;

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <div className="mx-auto w-full max-w-5xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-6">
          <section className="surface-panel rounded-3xl p-5 sm:p-7 lg:p-8">
            <div className="flex flex-wrap gap-2">
              <StatusBadge
                label={hasLiveRead ? "Lecture Prisma active" : "Parcours de développement"}
                tone={hasLiveRead ? "active" : "preview"}
              />
              <StatusBadge label="Données fictives" tone="soon" />
            </div>
            <p className="section-kicker mt-5">Essai terrain</p>
            <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Préparer une sortie
            </h1>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-700">
              Commencer par une ruche active, saisir la visite, puis garder
              seulement les suites utiles en tâches courtes.
            </p>
            <Link
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl bg-forest-900 px-5 text-sm font-black text-white transition hover:bg-forest-800 focus-ring"
              href={primaryHref}
            >
              {primaryLabel}
            </Link>
          </section>

          <FirstRunGuide
            activeApiaryCount={activeApiaries.length}
            activeHiveCount={activeHives.length}
            activeMovementCount={activeMovements.length}
            compact
            equipmentReadyCount={availableItems + stockedLines}
            openTaskCount={openTasks.length}
            openVisitCount={openVisits.length}
          />

          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <ReadinessCard
              detail="Ruches actives"
              label="Contexte"
              value={String(activeHives.length)}
            />
            <ReadinessCard
              detail="Visites non closes"
              label="Visites"
              value={String(openVisits.length)}
            />
            <ReadinessCard
              detail="Actions ouvertes"
              label="Tâches"
              value={String(openTasks.length)}
            />
            <ReadinessCard
              detail="Matériel disponible ou stocké"
              label="Matériel"
              value={String(availableItems + stockedLines)}
            />
            <ReadinessCard
              detail="Mouvements prévus ou en cours"
              label="Transhumance"
              value={String(activeMovements.length)}
            />
          </section>

          <section className="surface-panel rounded-3xl p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="section-kicker">Checklist de test</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Valider le parcours sans se perdre
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-field-muted">
                  Cette liste lit l&apos;état de développement et aide à tester
                  l&apos;enchaînement principal. Elle ne crée rien automatiquement.
                </p>
              </div>
              <StatusBadge
                label={`${checklist.filter((item) => item.done).length}/${checklist.length}`}
                tone={checklist.every((item) => item.done) ? "active" : "soon"}
              />
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {checklist.map((item, index) => (
                <Link
                  className="motion-card flex min-h-16 items-center gap-3 rounded-2xl border border-cream-300 bg-white p-4 shadow-field transition hover:border-amber-300 hover:bg-cream-50 focus-ring"
                  href={item.href}
                  key={item.label}
                >
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-2xl text-xs font-black ring-1 ${
                      item.done
                        ? "bg-sage-100 text-forest-900 ring-sage-200"
                        : "bg-amber-50 text-amber-900 ring-amber-200"
                    }`}
                  >
                    {item.done ? "OK" : `0${index + 1}`}
                  </span>
                  <span>
                    <span className="block text-sm font-black text-slate-950">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-xs font-bold uppercase tracking-wide text-slate-650">
                      {item.done ? "Validé dans les données dev" : "À tester"}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <ol className="grid gap-4">
            {journeySteps.map((step) => (
              <li className="surface-panel rounded-3xl p-5 sm:p-6" key={step.number}>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sage-100 text-sm font-black text-forest-900">
                      {step.number}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-black text-slate-950">{step.title}</h2>
                        <StatusBadge label={step.metric} tone={step.tone} />
                      </div>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-field-muted">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                  <Link
                    className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-forest-900 px-5 text-sm font-black text-white transition hover:bg-forest-800 focus-ring"
                    href={step.href}
                  >
                    {step.label}
                  </Link>
                </div>
              </li>
            ))}
          </ol>

          <section className="surface-panel rounded-3xl p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="section-kicker">QA locale</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Contrôler le parcours en quelques minutes
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-field-muted">
                  Ces repères ne lancent rien depuis l&apos;interface. Ils
                  rappellent la validation manuelle à faire dans Docker Compose
                  avant d&apos;ouvrir le prochain lot fonctionnel.
                </p>
              </div>
              <StatusBadge label="Manuel" tone="preview" />
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-2xl border border-cream-300 bg-cream-50 p-4">
                <p className="text-sm font-black uppercase tracking-wide text-amber-800">
                  Commandes
                </p>
                <div className="mt-3 space-y-2">
                  {localQaCommands.map((command) => (
                    <code
                      className="block rounded-xl bg-slate-950 px-3 py-2 text-xs font-bold text-cream-50"
                      key={command}
                    >
                      {command}
                    </code>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {localQaChecks.map((check, index) => (
                  <div
                    className="rounded-2xl border border-cream-300 bg-white p-4"
                    key={check}
                  >
                    <span className="grid size-9 place-items-center rounded-xl bg-sage-100 text-xs font-black text-forest-900 ring-1 ring-sage-200">
                      {index + 1}
                    </span>
                    <p className="mt-3 text-sm font-bold leading-6 text-slate-800">
                      {check}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <details className="surface-muted rounded-3xl">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 focus-ring sm:px-6 [&::-webkit-details-marker]:hidden">
              <span>
                <span className="section-kicker">Développement</span>
                <span className="mt-1 block text-base font-black text-slate-950">
                  Données fictives et limites du parcours
                </span>
              </span>
              <span className="inline-flex min-h-11 items-center rounded-full border border-cream-300 bg-white px-4 text-sm font-black text-slate-700">
                Voir
              </span>
            </summary>
            <div className="grid gap-3 border-t border-cream-300 px-5 py-5 md:grid-cols-3 sm:px-6">
              {guardrails.map((rule) => (
                <p
                  className="rounded-2xl border border-cream-300 bg-white p-4 text-sm font-bold leading-6 text-slate-800"
                  key={rule}
                >
                  {rule}
                </p>
              ))}
            </div>
          </details>
        </div>
      </div>
    </AppShell>
  );
}

function ReadinessCard({
  detail,
  label,
  value,
}: {
  detail: string;
  label: string;
  value: string;
}) {
  return (
    <article className="surface-muted rounded-2xl p-4">
      <p className="text-xs font-black uppercase text-slate-650">{label}</p>
      <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-sm font-bold leading-6 text-field-muted">{detail}</p>
    </article>
  );
}
