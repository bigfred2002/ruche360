import type { ReactNode } from "react";

import {
  canUseSessionModulePermission,
  createDevelopmentApplicationSession,
  developmentSessionIds,
} from "@/features/auth";
import {
  assignDevelopmentTaskFormAction,
  createDevelopmentTaskFormAction,
  updateDevelopmentTaskStatusFormAction,
} from "@/features/tasks/actions";
import type { TaskSummary } from "@/features/tasks/types";

import { StatusBadge } from "./StatusBadge";

type TasksFormsPreviewProps = {
  tasks: TaskSummary[] | null;
};

const apiaryOptions = [
  { id: "dev-apiary-home", label: "Rucher école" },
  { id: "dev-apiary-hill", label: "Rucher des coteaux" },
];

const hiveOptions = [
  { id: "dev-hive-001", label: "DEV-RU-001" },
  { id: "dev-hive-002", label: "DEV-RU-002" },
];

const colonyOptions = [
  { id: "dev-colony-001", label: "Colonie DEV-001" },
  { id: "dev-colony-002", label: "Colonie DEV-002" },
];

const memberOptions = [
  {
    id: developmentSessionIds.membershipId,
    label: "Apiculteur de développement",
  },
];

const fieldClass =
  "mt-1 min-h-11 w-full rounded-2xl border border-cream-300 bg-cream-50 px-3 py-2 text-sm font-bold text-slate-800 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-200";

const labelClass = "block text-xs font-black uppercase text-slate-600";

export function TasksFormsPreview({ tasks }: TasksFormsPreviewProps) {
  const session = createDevelopmentApplicationSession();
  const canWrite = canUseSessionModulePermission(session, "tasks", "tasks.write");
  const editableTasks =
    tasks?.filter(
      (task) =>
        task.status !== "DONE" &&
        task.status !== "CANCELLED" &&
        task.status !== "ARCHIVED",
    ) ?? [];
  const canUpdateExisting = canWrite && editableTasks.length > 0;

  return (
    <section className="surface-panel rounded-3xl p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-kicker">Formulaires développement</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Actions tâches contrôlées
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-field-muted">
            Ces formulaires utilisent uniquement la session de développement et
            les données fictives du seed. Ils préparent le suivi terrain sans
            notification, récurrence, calendrier ou automatisme sanitaire.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge label={canWrite ? "Écriture dev" : "Lecture seule"} tone="preview" />
          <StatusBadge label="Sans rappel auto" tone="soon" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <form
          action={createDevelopmentTaskFormAction}
          className="rounded-2xl border border-cream-300 bg-white p-4"
        >
          <FormHeader
            badge={canWrite ? "Actif dev" : "Verrouillé"}
            detail="Créer une action courte liée ou non au contexte terrain."
            permission="tasks.write"
            title="Nouvelle tâche"
            tone={canWrite ? "active" : "soon"}
          />
          <div className="mt-4 space-y-3">
            <Field label="Titre">
              <input className={fieldClass} disabled={!canWrite} name="title" placeholder="Ex: contrôler les réserves" required />
            </Field>
            <Field label="Description">
              <textarea className={fieldClass} disabled={!canWrite} name="description" placeholder="Note courte, sans donnée sensible inutile" rows={3} />
            </Field>
            <ApiarySelect disabled={!canWrite} />
            <HiveSelect disabled={!canWrite} />
            <ColonySelect disabled={!canWrite} />
            <MemberSelect disabled={!canWrite} includeEmpty label="Assigner à" name="assignedToMembershipId" />
            <Field label="Statut">
              <select className={fieldClass} disabled={!canWrite} name="status">
                <option value="TODO">À faire</option>
                <option value="IN_PROGRESS">En cours</option>
                <option value="CANCELLED">Annulée</option>
              </select>
            </Field>
            <Field label="Priorité">
              <select className={fieldClass} disabled={!canWrite} name="priority">
                <option value="LOW">Basse</option>
                <option value="NORMAL">Normale</option>
                <option value="HIGH">Haute</option>
                <option value="URGENT">Urgente</option>
              </select>
            </Field>
            <Field label="Échéance">
              <input className={fieldClass} disabled={!canWrite} name="dueAt" type="date" />
            </Field>
          </div>
          <SubmitButton disabled={!canWrite} label="Créer la tâche" />
        </form>

        <form
          action={updateDevelopmentTaskStatusFormAction}
          className="rounded-2xl border border-cream-300 bg-white p-4"
        >
          <FormHeader
            badge={canUpdateExisting ? "Actif dev" : "Tâche requise"}
            detail="Changer le statut d'une tâche encore modifiable."
            permission="tasks.write"
            title="Statut"
            tone={canUpdateExisting ? "active" : "soon"}
          />
          <div className="mt-4 space-y-3">
            <TaskSelect disabled={!canUpdateExisting} tasks={editableTasks} />
            <Field label="Nouveau statut">
              <select className={fieldClass} disabled={!canUpdateExisting} name="status" required>
                <option value="TODO">À faire</option>
                <option value="IN_PROGRESS">En cours</option>
                <option value="DONE">Terminée</option>
                <option value="CANCELLED">Annulée</option>
              </select>
            </Field>
          </div>
          <SubmitButton disabled={!canUpdateExisting} label="Mettre à jour" />
        </form>

        <form
          action={assignDevelopmentTaskFormAction}
          className="rounded-2xl border border-cream-300 bg-white p-4"
        >
          <FormHeader
            badge={canUpdateExisting ? "Actif dev" : "Tâche requise"}
            detail="Assigner ou désassigner simplement une tâche."
            permission="tasks.write"
            title="Assignation"
            tone={canUpdateExisting ? "active" : "soon"}
          />
          <div className="mt-4 space-y-3">
            <TaskSelect disabled={!canUpdateExisting} tasks={editableTasks} />
            <MemberSelect
              disabled={!canUpdateExisting}
              includeEmpty
              label="Membre"
              name="assignedToMembershipId"
            />
          </div>
          <SubmitButton disabled={!canUpdateExisting} label="Assigner" />
        </form>
      </div>
    </section>
  );
}

function ApiarySelect({ disabled }: { disabled: boolean }) {
  return (
    <Field label="Rucher">
      <select className={fieldClass} disabled={disabled} name="apiaryId">
        <option value="">Non précisé</option>
        {apiaryOptions.map((apiary) => (
          <option key={apiary.id} value={apiary.id}>
            {apiary.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

function HiveSelect({ disabled }: { disabled: boolean }) {
  return (
    <Field label="Ruche">
      <select className={fieldClass} disabled={disabled} name="hiveId">
        <option value="">Non précisée</option>
        {hiveOptions.map((hive) => (
          <option key={hive.id} value={hive.id}>
            {hive.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

function ColonySelect({ disabled }: { disabled: boolean }) {
  return (
    <Field label="Colonie">
      <select className={fieldClass} disabled={disabled} name="colonyId">
        <option value="">Non précisée</option>
        {colonyOptions.map((colony) => (
          <option key={colony.id} value={colony.id}>
            {colony.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

function MemberSelect({
  disabled,
  includeEmpty,
  label,
  name,
}: {
  disabled: boolean;
  includeEmpty?: boolean;
  label: string;
  name: string;
}) {
  return (
    <Field label={label}>
      <select className={fieldClass} disabled={disabled} name={name}>
        {includeEmpty ? <option value="">Non assignée</option> : null}
        {memberOptions.map((member) => (
          <option key={member.id} value={member.id}>
            {member.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

function TaskSelect({
  disabled,
  tasks,
}: {
  disabled: boolean;
  tasks: TaskSummary[];
}) {
  return (
    <Field label="Tâche">
      <select className={fieldClass} disabled={disabled} name="taskId" required>
        {tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.title} - {labelForStatus(task.status)}
          </option>
        ))}
      </select>
    </Field>
  );
}

function FormHeader({
  badge,
  detail,
  permission,
  title,
  tone,
}: {
  badge: string;
  detail: string;
  permission: string;
  title: string;
  tone: "active" | "soon";
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase text-amber-800">{permission}</p>
          <h3 className="mt-2 text-lg font-black text-slate-950">{title}</h3>
        </div>
        <StatusBadge label={badge} tone={tone} />
      </div>
      <p className="mt-3 text-sm leading-6 text-field-muted">{detail}</p>
    </>
  );
}

function Field({ children, label }: { children: ReactNode; label: string }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

function SubmitButton({ disabled, label }: { disabled: boolean; label: string }) {
  return (
    <button
      className="mt-4 min-h-11 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-field transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
      disabled={disabled}
      type="submit"
    >
      {label}
    </button>
  );
}

function labelForStatus(status: TaskSummary["status"]) {
  const labels = {
    TODO: "À faire",
    IN_PROGRESS: "En cours",
    DONE: "Terminée",
    CANCELLED: "Annulée",
    ARCHIVED: "Archivée",
  } satisfies Record<TaskSummary["status"], string>;

  return labels[status];
}
