import type { TaskPriority, TaskStatus, TaskSummary } from "@/features/tasks";

import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { StatePanel } from "./StatePanel";
import { StatusBadge } from "./StatusBadge";
import { TasksFormsPreview } from "./TasksFormsPreview";

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
  "Saisie limitée à la session de développement.",
  "Aucune notification ou récurrence.",
  "Assignation simple uniquement.",
  "Aucune prescription sanitaire automatique.",
] as const;

const previewTasks = [
  {
    id: "task-preview-1",
    organizationId: "preview",
    apiaryId: "dev-apiary-home",
    hiveId: "dev-hive-001",
    colonyId: null,
    visitId: null,
    assignedToMembershipId: "dev-membership-owner",
    title: "Contrôler les réserves",
    status: "TODO",
    priority: "HIGH",
    dueAt: new Date("2026-07-10T08:00:00.000Z"),
  },
  {
    id: "task-preview-2",
    organizationId: "preview",
    apiaryId: "dev-apiary-hill",
    hiveId: null,
    colonyId: null,
    visitId: null,
    assignedToMembershipId: null,
    title: "Préparer la caisse de visite",
    status: "IN_PROGRESS",
    priority: "NORMAL",
    dueAt: null,
  },
] satisfies TaskSummary[];

export function TasksShellPreview({ tasks }: { tasks?: TaskSummary[] | null }) {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation("/tasks");
  const displayTasks = tasks && tasks.length > 0 ? tasks : previewTasks;
  const hasLiveTasks = Boolean(tasks);
  const todoCount = displayTasks.filter((task) => task.status === "TODO").length;
  const inProgressCount = displayTasks.filter((task) => task.status === "IN_PROGRESS").length;
  const doneCount = displayTasks.filter((task) => task.status === "DONE").length;

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-6">
          <section className="surface-panel rounded-3xl p-5 sm:p-7 lg:p-8">
            <StatusBadge
              label={hasLiveTasks ? "Lecture Prisma active" : "Preview"}
              tone={hasLiveTasks ? "active" : "preview"}
            />
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
                  {hasLiveTasks
                    ? "Tâches de développement lues depuis PostgreSQL."
                    : "Une tâche est une action simple, pas un outil de gestion de projet."}
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <SummaryCard
              detail="Actions courtes à préparer"
              label="À faire"
              value={String(todoCount)}
            />
            <SummaryCard
              detail="Actions déjà engagées"
              label="En cours"
              value={String(inProgressCount)}
            />
            <SummaryCard
              detail="Actions terminées dans la liste affichée"
              label="Terminées"
              value={String(doneCount)}
            />
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_22rem]">
            <div className="space-y-4">
              {displayTasks.map((task) => (
                <article className="surface-panel rounded-2xl p-5" key={task.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="section-kicker">{formatDueDate(task.dueAt)}</p>
                      <h2 className="mt-2 text-xl font-black text-slate-950">
                        {task.title}
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <StatusBadge
                        label={labelForStatus(task.status)}
                        tone={toneForStatus(task.status)}
                      />
                      <StatusBadge
                        label={labelForPriority(task.priority)}
                        tone={toneForPriority(task.priority)}
                      />
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <DetailPill label="Rucher" value={task.apiaryId ?? "Non précisé"} />
                    <DetailPill label="Ruche" value={task.hiveId ?? "Non précisée"} />
                    <DetailPill label="Assignée" value={task.assignedToMembershipId ?? "Non assignée"} />
                  </div>
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

          <TasksFormsPreview tasks={tasks ?? null} />

          <StatePanel
            detail="Les formulaires ci-dessus restent limites a la session de developpement et aux donnees fictives. Les rappels, calendriers et notifications attendent des lots dedies."
            kind="empty"
            label="Dev uniquement"
            title="Actions actives sans automatisme"
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

function labelForStatus(status: TaskStatus) {
  const labels = {
    TODO: "À faire",
    IN_PROGRESS: "En cours",
    DONE: "Terminée",
    CANCELLED: "Annulée",
    ARCHIVED: "Archivée",
  } satisfies Record<TaskStatus, string>;

  return labels[status];
}

function toneForStatus(status: TaskStatus) {
  if (status === "DONE") {
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

function labelForPriority(priority: TaskPriority) {
  const labels = {
    LOW: "Basse",
    NORMAL: "Normale",
    HIGH: "Haute",
    URGENT: "Urgente",
  } satisfies Record<TaskPriority, string>;

  return labels[priority];
}

function toneForPriority(priority: TaskPriority) {
  if (priority === "URGENT" || priority === "HIGH") {
    return "amber";
  }

  if (priority === "LOW") {
    return "muted";
  }

  return "preview";
}

function formatDueDate(date: Date | null) {
  if (!date) {
    return "Échéance à préciser";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}
