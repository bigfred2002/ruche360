import type { ReactNode } from "react";

import {
  canUseSessionModulePermission,
  createDevelopmentApplicationSession,
} from "@/features/auth";
import type { HiveSummary } from "@/features/apiary";
import {
  addDevelopmentVisitObservationFormAction,
  createDevelopmentVisitFormAction,
  updateDevelopmentVisitStatusFormAction,
} from "@/features/visits/actions";
import type { VisitSummary } from "@/features/visits/types";

import { StatusBadge } from "./StatusBadge";

type VisitsFormsPreviewProps = {
  hives: HiveSummary[] | null;
  visits: VisitSummary[] | null;
};

const fieldClass =
  "mt-1 min-h-11 w-full rounded-2xl border border-cream-300 bg-cream-50 px-3 py-2 text-sm font-bold text-slate-800 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-200";

const labelClass = "block text-xs font-black uppercase text-slate-600";

export function VisitsFormsPreview({ hives, visits }: VisitsFormsPreviewProps) {
  const session = createDevelopmentApplicationSession();
  const canWrite = canUseSessionModulePermission(session, "visits", "visits.write");
  const activeHives = hives?.filter((hive) => hive.status === "ACTIVE") ?? [];
  const editableVisits =
    visits?.filter(
      (visit) =>
        visit.status !== "COMPLETED" &&
        visit.status !== "CANCELLED" &&
        visit.status !== "ARCHIVED",
    ) ?? [];
  const canUpdateExisting = canWrite && editableVisits.length > 0;
  const canCreateVisit = canWrite && activeHives.length > 0;

  return (
    <section className="surface-panel rounded-3xl p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-kicker">Formulaires développement</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Actions visites contrôlées
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-field-muted">
            Ces formulaires utilisent uniquement la session de développement et
            les données fictives du seed. Ils préparent la saisie terrain sans
            API publique, sans authentification réelle et sans automatisme
            sanitaire.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge label={canWrite ? "Écriture dev" : "Lecture seule"} tone="preview" />
          <StatusBadge label="Sans prescription" tone="soon" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <form
          action={createDevelopmentVisitFormAction}
          className="rounded-2xl border border-cream-300 bg-white p-4"
        >
          <FormHeader
            badge={canCreateVisit ? "Actif dev" : "Ruche requise"}
            detail="Créer une note courte sur une ruche active de l'organisation."
            permission="visits.write"
            title="Nouvelle visite"
            tone={canCreateVisit ? "active" : "soon"}
          />
          <div className="mt-4 space-y-3">
            <HiveSelect disabled={!canCreateVisit} hives={activeHives} />
            <p className="rounded-2xl border border-sage-200 bg-sage-50 p-3 text-sm font-bold leading-6 text-forest-900">
              Le rucher et la colonie active sont associés automatiquement.
            </p>
            <Field label="Statut">
              <select className={fieldClass} disabled={!canCreateVisit} name="status">
                <option value="DRAFT">Brouillon</option>
                <option value="PLANNED">Prévue</option>
                <option value="IN_PROGRESS">En cours</option>
              </select>
            </Field>
            <Field label="Date de visite">
              <input className={fieldClass} disabled={!canCreateVisit} name="visitedAt" type="date" />
            </Field>
            <Field label="Objectif">
              <input className={fieldClass} disabled={!canCreateVisit} name="objective" placeholder="Ex: contrôle rapide" />
            </Field>
            <Field label="Météo observée">
              <input className={fieldClass} disabled={!canCreateVisit} name="weatherSummary" placeholder="Ex: doux, vent faible" />
            </Field>
            <Field label="Force colonie">
              <input className={fieldClass} disabled={!canCreateVisit} max="10" min="0" name="colonyStrength" type="number" />
            </Field>
            <Field label="Notes">
              <textarea className={fieldClass} disabled={!canCreateVisit} name="notes" placeholder="Observation courte" rows={3} />
            </Field>
            <Field label="Suite à prévoir">
              <textarea className={fieldClass} disabled={!canCreateVisit} name="followUpSummary" placeholder="Prochaine action ou vigilance" rows={3} />
            </Field>
          </div>
          <SubmitButton disabled={!canCreateVisit} label="Créer la visite" />
        </form>

        <form
          action={addDevelopmentVisitObservationFormAction}
          className="rounded-2xl border border-cream-300 bg-white p-4"
        >
          <FormHeader
            badge={canUpdateExisting ? "Actif dev" : "Visite requise"}
            detail="Ajouter une observation courte à une visite encore modifiable."
            permission="visits.write"
            title="Observation"
            tone={canUpdateExisting ? "active" : "soon"}
          />
          <div className="mt-4 space-y-3">
            <VisitSelect disabled={!canUpdateExisting} visits={editableVisits} />
            <Field label="Catégorie">
              <select className={fieldClass} disabled={!canUpdateExisting} name="category" required>
                <option value="COLONY">Colonie</option>
                <option value="RESERVES">Réserves</option>
                <option value="HIVE">Ruche</option>
                <option value="HEALTH">Sanitaire</option>
                <option value="ACTION">Action</option>
                <option value="FOLLOW_UP">Suite</option>
                <option value="NOTE">Note</option>
              </select>
            </Field>
            <Field label="Libellé">
              <input className={fieldClass} disabled={!canUpdateExisting} name="label" placeholder="Ex: réserves correctes" required />
            </Field>
            <Field label="Valeur">
              <input className={fieldClass} disabled={!canUpdateExisting} name="value" placeholder="Ex: 6 cadres" />
            </Field>
            <Field label="Notes">
              <textarea className={fieldClass} disabled={!canUpdateExisting} name="notes" placeholder="Complément court" rows={3} />
            </Field>
          </div>
          <SubmitButton disabled={!canUpdateExisting} label="Ajouter l'observation" />
        </form>

        <form
          action={updateDevelopmentVisitStatusFormAction}
          className="rounded-2xl border border-cream-300 bg-white p-4"
        >
          <FormHeader
            badge={canUpdateExisting ? "Actif dev" : "Visite requise"}
            detail="Changer le statut sans déclencher de diagnostic ou de tâche."
            permission="visits.write"
            title="Statut"
            tone={canUpdateExisting ? "active" : "soon"}
          />
          <div className="mt-4 space-y-3">
            <VisitSelect disabled={!canUpdateExisting} visits={editableVisits} />
            <Field label="Nouveau statut">
              <select className={fieldClass} disabled={!canUpdateExisting} name="status" required>
                <option value="PLANNED">Prévue</option>
                <option value="IN_PROGRESS">En cours</option>
                <option value="COMPLETED">Terminée</option>
                <option value="CANCELLED">Annulée</option>
              </select>
            </Field>
          </div>
          <SubmitButton disabled={!canUpdateExisting} label="Mettre à jour" />
        </form>
      </div>
    </section>
  );
}

function HiveSelect({
  disabled,
  hives,
}: {
  disabled: boolean;
  hives: HiveSummary[];
}) {
  return (
    <Field label="Ruche">
      <select className={fieldClass} disabled={disabled} name="hiveId" required>
        <option value="">Choisir une ruche active</option>
        {hives.map((hive) => (
          <option key={hive.id} value={hive.id}>
            {hive.fieldIdentifier}
          </option>
        ))}
      </select>
    </Field>
  );
}

function VisitSelect({
  disabled,
  visits,
}: {
  disabled: boolean;
  visits: VisitSummary[];
}) {
  return (
    <Field label="Visite">
      <select className={fieldClass} disabled={disabled} name="visitId" required>
        {visits.map((visit) => (
          <option key={visit.id} value={visit.id}>
            {visit.objective ?? "Visite sans objectif"} - {labelForStatus(visit.status)}
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

function labelForStatus(status: VisitSummary["status"]) {
  const labels = {
    DRAFT: "Brouillon",
    PLANNED: "Prévue",
    IN_PROGRESS: "En cours",
    COMPLETED: "Terminée",
    CANCELLED: "Annulée",
    ARCHIVED: "Archivée",
  } satisfies Record<VisitSummary["status"], string>;

  return labels[status];
}
