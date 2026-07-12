import Link from "next/link";

import type { TaskDetail, TaskPriority, TaskStatus } from "@/features/tasks";

import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { StatusBadge } from "./StatusBadge";

type TaskDetailPreviewProps = {
  task: TaskDetail;
};

export function TaskDetailPreview({ task }: TaskDetailPreviewProps) {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation("/tasks");

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <main className="mx-auto w-full max-w-5xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-5 lg:space-y-6">
          <Link
            className="inline-flex min-h-11 items-center rounded-2xl border border-cream-300 bg-white px-4 text-sm font-black text-slate-800 transition hover:border-amber-300 hover:text-amber-900 focus-ring"
            href="/tasks"
          >
            Retour aux tâches
          </Link>

          <section className="surface-panel rounded-3xl p-5 sm:p-7 lg:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge label={labelForStatus(task.status)} tone={toneForStatus(task.status)} />
              <StatusBadge
                label={labelForPriority(task.priority)}
                tone={toneForPriority(task.priority)}
              />
              <StatusBadge label="Lecture seule" tone="preview" />
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
              <div>
                <p className="section-kicker">Fiche tâche</p>
                <h1 className="mt-2 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
                  {task.title}
                </h1>
                <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
                  {task.description ??
                    "Action courte à suivre sans notification, récurrence ou calendrier lourd."}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    className="inline-flex min-h-11 items-center rounded-2xl bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-amber-800 focus-ring"
                    href="/tasks#task-quick-entry"
                  >
                    Mettre à jour
                  </Link>
                  {task.visitId ? (
                    <Link
                      className="inline-flex min-h-11 items-center rounded-2xl border border-cream-300 bg-white px-4 text-sm font-black text-slate-800 transition hover:border-amber-300 hover:bg-cream-50 focus-ring"
                      href={`/visits/${task.visitId}`}
                    >
                      Revoir la visite
                    </Link>
                  ) : null}
                </div>
              </div>
              <div className="rounded-3xl border border-sage-200 bg-sage-50 p-5">
                <p className="text-sm font-black uppercase text-forest-900">
                  Échéance
                </p>
                <p className="mt-2 text-2xl font-black text-slate-950">
                  {formatDueDate(task.dueAt)}
                </p>
                <p className="mt-1 text-sm font-bold leading-6 text-field-muted">
                  {task.assignedToLabel ?? "Non assignée"}
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <article className="surface-panel rounded-3xl p-5 sm:p-6">
              <p className="section-kicker">Contexte</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Rattachement léger
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <InfoBlock label="Rucher" value={task.apiaryName ?? "Non précisé"} />
                <InfoBlock label="Ruche" value={task.hiveIdentifier ?? "Non précisée"} />
                <InfoBlock label="Colonie" value={labelForColony(task.colonyStatus)} />
                <InfoBlock label="Visite" value={task.visitObjective ?? "Non liée"} />
              </div>
            </article>

            <aside className="surface-muted rounded-3xl p-5">
              <p className="section-kicker">Navigation</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Revenir au terrain
              </h2>
              <p className="mt-3 text-sm font-bold leading-6 text-field-muted">
                La tâche garde la suite visible. La visite et la ruche restent
                les bons endroits pour relire le contexte.
              </p>
              <div className="mt-4 grid gap-2">
                {task.visitId ? (
                  <Link
                    className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cream-300 bg-white px-4 text-sm font-black text-slate-800 transition hover:border-amber-300 focus-ring"
                    href={`/visits/${task.visitId}`}
                  >
                    Voir la visite
                  </Link>
                ) : null}
                {task.hiveId ? (
                  <Link
                    className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cream-300 bg-white px-4 text-sm font-black text-slate-800 transition hover:border-amber-300 focus-ring"
                    href={`/hives/${task.hiveId}`}
                  >
                    Voir la ruche
                  </Link>
                ) : null}
              </div>
            </aside>
          </section>

          <section className="surface-muted rounded-3xl p-5 sm:p-6">
            <p className="section-kicker">Limites</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Action simple
            </h2>
            <p className="mt-3 text-sm font-bold leading-6 text-field-muted">
              Cette fiche ne déclenche ni rappel, ni calendrier, ni diagnostic
              sanitaire. Les changements de statut restent dans le formulaire de
              développement de la page Tâches.
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

function formatDueDate(date: Date | null) {
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
