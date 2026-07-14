import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { AppShell } from "@/components/AppShell";
import { createAppNavigation } from "@/components/appNavigation";
import { DashboardCard } from "@/components/DashboardCard";
import { DecorativeImage } from "@/components/DecorativeImage";
import { ResponsiveWorkflowsPreview } from "@/components/ResponsiveWorkflowsPreview";
import { StatusBadge } from "@/components/StatusBadge";
import { visualAssets } from "@/components/visualAssets";
import { createDevelopmentApplicationSession } from "@/features/auth";
import { listApiariesForSessionAction, listHivesForSessionAction } from "@/features/apiary/actions";
import { isVisitClosed } from "@/features/visits/status";
import { listVisitsForSessionAction } from "@/features/visits/actions";
import { isTaskClosed } from "@/features/tasks/status";
import { listTasksForSessionAction } from "@/features/tasks/actions";
import { listEquipmentInventoryForSessionAction } from "@/features/equipment/actions";
import { shouldCleanEquipmentItem } from "@/features/equipment/status";
import { listHiveMovementsForSessionAction } from "@/features/hive-movements/actions";
import type { HiveMovementStatus } from "@/features/hive-movements/types";

export const dynamic = "force-dynamic";

const { desktopNavigationItems, mobileNavigationItems } = createAppNavigation("/");

type FocusLink = {
  detail: string;
  href: string;
  label: string;
  title: string;
};

type QuickShortcut = FocusLink & {
  icon: string;
};

function ProgressiveDisclosure({
  badge,
  children,
  description,
  eyebrow,
  title,
}: {
  badge: string;
  children: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <details className="group rounded-3xl border border-cream-300 bg-white shadow-field">
      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 focus-ring sm:px-6 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="text-sm font-black uppercase tracking-wide text-amber-800">
            {eyebrow}
          </span>
          <span className="mt-1 block text-xl font-black text-slate-950">
            {title}
          </span>
          <span className="mt-1 block max-w-2xl text-sm leading-6 text-slate-650">
            {description}
          </span>
        </span>
        <span className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-cream-300 bg-cream-50 px-4 text-sm font-black text-slate-700">
          {badge}
        </span>
      </summary>
      <div className="border-t border-cream-300 px-5 py-5 sm:px-6">
        {children}
      </div>
    </details>
  );
}

function FocusAction({ action }: { action: FocusLink }) {
  return (
    <Link
      className="motion-card block rounded-2xl border border-cream-300 bg-white p-4 shadow-field hover:border-amber-300 hover:shadow-field-lg focus-ring"
      href={action.href}
    >
      <span className="text-sm font-black uppercase tracking-wide text-amber-800">
        {action.label}
      </span>
      <span className="mt-2 block text-lg font-black text-slate-950">
        {action.title}
      </span>
      <span className="mt-1 block text-sm leading-6 text-slate-650">
        {action.detail}
      </span>
    </Link>
  );
}

function QuickShortcutCard({ shortcut }: { shortcut: QuickShortcut }) {
  return (
    <Link
      className="motion-card flex min-h-24 items-start gap-3 rounded-2xl border border-cream-300 bg-white p-4 shadow-field transition hover:border-amber-300 hover:shadow-field-lg focus-ring"
      href={shortcut.href}
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-100 text-sm font-black text-amber-900 ring-1 ring-amber-200">
        {shortcut.icon}
      </span>
      <span>
        <span className="block text-xs font-black uppercase tracking-wide text-amber-800">
          {shortcut.label}
        </span>
        <span className="mt-1 block text-base font-black text-slate-950">
          {shortcut.title}
        </span>
        <span className="mt-1 block text-sm leading-6 text-slate-650">
          {shortcut.detail}
        </span>
      </span>
    </Link>
  );
}

function formatVisitDate(date: Date | null) {
  if (!date) {
    return "Date non renseignee";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
  }).format(date);
}

function labelForMovementStatus(status: HiveMovementStatus) {
  const labels = {
    PLANNED: "prévu",
    IN_PROGRESS: "en cours",
    COMPLETED: "terminé",
    CANCELLED: "annulé",
  } satisfies Record<HiveMovementStatus, string>;

  return labels[status];
}

export default async function Home() {
  const session = createDevelopmentApplicationSession();

  const [apiaries, hives, visits, tasks, equipment, movements] = await Promise.all([
    listApiariesForSessionAction(session),
    listHivesForSessionAction(session),
    listVisitsForSessionAction(session),
    listTasksForSessionAction(session),
    listEquipmentInventoryForSessionAction(session),
    listHiveMovementsForSessionAction(session),
  ]);

  const activeApiaries = apiaries.filter((apiary) => apiary.status === "ACTIVE");
  const activeHives = hives.filter((hive) => hive.status === "ACTIVE");
  const openVisits = visits.filter((visit) => !isVisitClosed(visit.status));
  const openTasks = tasks.filter((task) => !isTaskClosed(task.status));
  const urgentTasks = openTasks.filter((task) => task.priority === "URGENT" || task.priority === "HIGH");
  const equipmentToClean = equipment.items.filter(shouldCleanEquipmentItem);
  const activeMovements = movements.filter(
    (movement) => movement.status === "PLANNED" || movement.status === "IN_PROGRESS",
  );
  const nextVisit = openVisits[0] ?? visits[0] ?? null;
  const nextTask = urgentTasks[0] ?? openTasks[0] ?? null;
  const nextMovement = activeMovements[0] ?? null;

  const primaryAction =
    activeHives.length > 0
      ? {
          detail: "Reprendre une observation, creer une visite ou relire les sorties recentes.",
          href: "/visits",
          label: "Action terrain",
          title: "Preparer une visite",
        }
      : {
          detail: "Creer le premier rucher et les ruches actives avant de saisir les visites.",
          href: "/apiaries",
          label: "Demarrage",
          title: "Initialiser le rucher",
        };

  const focusLinks: FocusLink[] = [
    primaryAction,
    {
      detail: nextTask
        ? `${nextTask.priority.toLowerCase()} · ${nextTask.title}`
        : "Aucune tache ouverte pour le moment.",
      href: "/tasks",
      label: "Triage",
      title: "Voir les taches",
    },
    {
      detail:
        equipmentToClean.length > 0
          ? `${equipmentToClean.length} element(s) a nettoyer avant la prochaine sortie.`
          : "Materiel suivi sans alerte de nettoyage.",
      href: "/equipment",
      label: "Materiel",
      title: "Verifier le sac de visite",
    },
    {
      detail: nextMovement
        ? `${nextMovement.items.length} ruche(s) a suivre.`
        : "Aucun deplacement actif, mais le suivi reste disponible.",
      href: "/transhumance",
      label: "Mouvement",
      title: "Voir transhumance",
    },
  ];

  const quickShortcuts: QuickShortcut[] = [
    {
      detail: "Ajouter ou relire un site et ses ruches.",
      href: "/apiaries",
      icon: "Ru",
      label: "Contexte",
      title: "Ruchers et ruches",
    },
    {
      detail: "Créer une observation terrain courte.",
      href: "/visits",
      icon: "Vi",
      label: "Sortie",
      title: "Visite",
    },
    {
      detail: "Noter une suite simple après inspection.",
      href: "/tasks",
      icon: "Ta",
      label: "Suivi",
      title: "Tâche",
    },
    {
      detail: "Vérifier caisse, stock et nettoyage.",
      href: "/equipment",
      icon: "Ma",
      label: "Préparation",
      title: "Matériel",
    },
    {
      detail: "Suivre les mouvements de ruches.",
      href: "/transhumance",
      icon: "Tr",
      label: "Déplacement",
      title: "Transhumance",
    },
  ];

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <main className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="space-y-6">
            <section className="grid gap-6 overflow-hidden rounded-3xl border border-cream-300 bg-white shadow-field-lg lg:grid-cols-[minmax(0,1fr)_21rem]">
              <div className="p-5 sm:p-7 lg:p-8">
                <StatusBadge label="Cockpit terrain" />
                <h1 className="mt-5 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
                  Rucher360
                </h1>
                <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-700">
                  Une vue courte pour savoir quoi faire maintenant: ruches
                  actives, visites ouvertes, taches, materiel et mouvements a
                  verifier.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    className="inline-flex min-h-12 items-center rounded-2xl bg-forest-900 px-5 text-sm font-black text-white transition hover:bg-forest-800 focus-ring"
                    href={primaryAction.href}
                  >
                    {primaryAction.title}
                  </Link>
                  <Link
                    className="inline-flex min-h-12 items-center rounded-2xl border border-cream-300 bg-cream-50 px-5 text-sm font-black text-slate-800 transition hover:border-amber-300 hover:bg-white focus-ring"
                    href="/journey"
                  >
                    Parcours classique
                  </Link>
                </div>
              </div>
              <article className="relative min-h-72 text-white lg:min-h-full">
                <Image
                  alt={visualAssets.heroLight.alt}
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 1280px) 22rem, (min-width: 1024px) 34vw, 100vw"
                  src={visualAssets.heroLight.src}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/76 via-slate-950/18 to-transparent" />
                <div className="relative flex h-full min-h-72 flex-col justify-end p-5">
                  <StatusBadge label="Lisible dehors" tone="amber" />
                  <p className="mt-4 text-2xl font-black leading-tight">
                    {activeApiaries.length} rucher(s), {activeHives.length} ruche(s),
                    {activeMovements.length} mouvement(s)
                  </p>
                  <p className="mt-2 text-sm leading-6 text-cream-50">
                    Les modules futurs restent ranges dans le catalogue.
                  </p>
                </div>
              </article>
            </section>

            <section className="rounded-3xl border border-cream-300 bg-cream-50 p-4 shadow-field sm:p-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-amber-800">
                    Accès rapides
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-slate-950">
                    Aller au bon écran sans chercher.
                  </h2>
                </div>
                <StatusBadge label="Liens terrain" tone="preview" />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {quickShortcuts.map((shortcut) => (
                  <QuickShortcutCard
                    key={shortcut.href}
                    shortcut={shortcut}
                  />
                ))}
              </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              <DashboardCard
                accent="forest"
                detail={`${activeApiaries.length} site(s) actif(s) suivis dans l'organisation de developpement.`}
                icon="R"
                metric={String(activeHives.length)}
                status="Terrain"
                statusTone="active"
                title="Ruches actives"
              />
              <DashboardCard
                accent="amber"
                detail={
                  nextVisit
                    ? `${formatVisitDate(nextVisit.visitedAt)} · ${nextVisit.objective ?? "objectif a preciser"}`
                    : "Aucune visite creee pour le moment."
                }
                icon="V"
                metric={String(openVisits.length)}
                status="Ouvertes"
                statusTone={openVisits.length > 0 ? "amber" : "muted"}
                title="Visites"
              />
              <DashboardCard
                accent={urgentTasks.length > 0 ? "red" : "sage"}
                detail={
                  nextTask
                    ? `${nextTask.priority.toLowerCase()} · ${nextTask.title}`
                    : "Aucune tache ouverte a traiter."
                }
                icon="T"
                metric={String(openTasks.length)}
                status={urgentTasks.length > 0 ? "Priorite" : "Stable"}
                statusTone={urgentTasks.length > 0 ? "alert" : "active"}
                title="Taches"
              />
              <DashboardCard
                accent={equipmentToClean.length > 0 ? "red" : "slate"}
                detail={`${equipment.types.length} type(s), ${equipment.items.length} item(s), ${equipment.stocks.length} stock(s).`}
                icon="M"
                metric={String(equipmentToClean.length)}
                status="A nettoyer"
                statusTone={equipmentToClean.length > 0 ? "alert" : "muted"}
                title="Materiel"
              />
              <DashboardCard
                accent={activeMovements.length > 0 ? "amber" : "sage"}
                detail={
                  nextMovement
                    ? `${nextMovement.items.length} ruche(s) · ${labelForMovementStatus(nextMovement.status)}`
                    : "Aucun mouvement actif a suivre."
                }
                icon="Tr"
                metric={String(activeMovements.length)}
                status="Mouvements"
                statusTone={activeMovements.length > 0 ? "amber" : "muted"}
                title="Transhumance"
              />
            </section>

            <section className="grid gap-4 lg:grid-cols-4">
              {focusLinks.map((action) => (
                <FocusAction action={action} key={action.href} />
              ))}
            </section>

            <ProgressiveDisclosure
              badge="Ouvrir"
              description="Ces reperes restent disponibles sans saturer le premier ecran mobile."
              eyebrow="Support"
              title="Modules et parcours secondaires"
            >
              <div className="grid gap-4 md:grid-cols-3">
                <FocusAction
                  action={{
                    detail: "Voir les modules actifs, masques et a venir.",
                    href: "/modules",
                    label: "Catalogue",
                    title: "Modules",
                  }}
                />
                <FocusAction
                  action={{
                    detail: "Relire la sequence de demonstration terrain.",
                    href: "/journey",
                    label: "Guide",
                    title: "Parcours classique",
                  }}
                />
                <FocusAction
                  action={{
                    detail: "Consulter les volumes et reperes d'organisation.",
                    href: "/admin",
                    label: "Organisation",
                    title: "Administration",
                  }}
                />
              </div>
            </ProgressiveDisclosure>

            <ProgressiveDisclosure
              badge="Voir"
              description="Reference UX uniquement: pas de nouveau module actif dans ce lot."
              eyebrow="Conception"
              title="Workflows responsive prevus"
            >
              <ResponsiveWorkflowsPreview />
            </ProgressiveDisclosure>
          </div>

          <aside className="hidden space-y-5 xl:block">
            <section className="rounded-3xl border border-cream-300 bg-cream-200 p-5 shadow-field">
              <p className="text-sm font-black uppercase tracking-wide text-amber-800">
                Priorite UX
              </p>
              <h2 className="mt-3 text-2xl font-black leading-tight text-slate-950">
                Le cockpit ne doit plus faire catalogue.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-650">
                Les modules optionnels, IA, IoT et ecrans de conception restent
                accessibles ailleurs. Ici, on privilegie la prochaine action
                terrain.
              </p>
            </section>

            <section className="overflow-hidden rounded-3xl bg-gradient-amber p-6 text-white shadow-amber">
              <DecorativeImage
                alt={visualAssets.hiveSquare.alt}
                aspect="square"
                className="mb-5 border-white/20 shadow-none"
                src={visualAssets.hiveSquare.src}
              />
              <p className="text-sm font-black uppercase tracking-wide text-amber-100">
                Modules futurs
              </p>
              <h2 className="mt-3 text-2xl font-black leading-tight">
                Affiches comme reperes, pas comme actions.
              </h2>
              <p className="mt-3 text-sm leading-6 text-amber-50">
                Balance, meteo, camera, capteurs et IA restent non actifs tant
                que leurs lots dedies ne sont pas ouverts.
              </p>
            </section>
          </aside>
        </section>
      </main>
    </AppShell>
  );
}
