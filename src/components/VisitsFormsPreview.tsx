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
import type { VisitObservationCategory, VisitSummary } from "@/features/visits/types";

import { StatusBadge } from "./StatusBadge";

type VisitsFormsPreviewProps = {
  hives: HiveSummary[] | null;
  visits: VisitSummary[] | null;
};

const fieldClass =
  "mt-1 min-h-11 w-full rounded-2xl border border-cream-300 bg-cream-50 px-3 py-2 text-sm font-bold text-slate-800 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-200";

const labelClass = "block text-xs font-black uppercase text-slate-600";

const observationPresets: {
  category: VisitObservationCategory;
  label: string;
  notes: string;
}[] = [
  {
    category: "HIVE",
    label: "Activité normale",
    notes: "Entrées et sorties régulières observées.",
  },
  {
    category: "RESERVES",
    label: "Réserves à revoir",
    notes: "Contrôler les réserves au prochain passage.",
  },
  {
    category: "ACTION",
    label: "Action réalisée",
    notes: "Action terrain notée, sans automatisme de suite.",
  },
  {
    category: "FOLLOW_UP",
    label: "Suite à prévoir",
    notes: "Préparer une vérification volontaire.",
  },
  {
    category: "HEALTH",
    label: "Point sanitaire à surveiller",
    notes: "Observation non prescriptive à confirmer manuellement.",
  },
];

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
  const defaultEditableVisit = editableVisits[0] ?? null;

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

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
        <form
          action={createDevelopmentVisitFormAction}
          className="rounded-2xl border border-cream-300 bg-white p-4 sm:p-5"
        >
          <FormHeader
            badge={canCreateVisit ? "Actif dev" : "Ruche requise"}
            detail="Choisir une ruche, noter l'essentiel, puis décider si une suite est nécessaire."
            permission="visits.write"
            title="Visite rapide"
            tone={canCreateVisit ? "active" : "soon"}
          />
          <div className="mt-4 rounded-2xl border border-sage-200 bg-sage-50 p-3 text-sm font-bold leading-6 text-forest-900">
            La ruche suffit pour le terrain: le rucher et la colonie active sont
            associés automatiquement quand ils existent.
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <HiveSelect disabled={!canCreateVisit} hives={activeHives} />
            <Field label="Objectif">
              <input className={fieldClass} disabled={!canCreateVisit} name="objective" placeholder="Ex: contrôle rapide" />
            </Field>
            <Field label="Observation rapide">
              <textarea className={fieldClass} disabled={!canCreateVisit} name="notes" placeholder="Ex: activité correcte, réserves à revoir" rows={4} />
            </Field>
          </div>
          <details className="mt-4 rounded-2xl border border-cream-300 bg-cream-50">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-black text-slate-800 focus-ring [&::-webkit-details-marker]:hidden">
              Détails optionnels
              <span className="text-xs uppercase text-amber-800">Ouvrir</span>
            </summary>
            <div className="grid gap-3 border-t border-cream-300 p-4 sm:grid-cols-3">
              <Field label="Suite à prévoir">
                <textarea className={fieldClass} disabled={!canCreateVisit} name="followUpSummary" placeholder="Ex: repasser sous 7 jours" rows={3} />
              </Field>
              <Field label="Statut">
                <select className={fieldClass} disabled={!canCreateVisit} name="status">
                  <option value="DRAFT">Brouillon</option>
                  <option value="PLANNED">Prévue</option>
                  <option value="IN_PROGRESS">En cours</option>
                </select>
              </Field>
              <Field label="Date">
                <input className={fieldClass} disabled={!canCreateVisit} name="visitedAt" type="date" />
              </Field>
              <Field label="Météo">
                <input className={fieldClass} disabled={!canCreateVisit} name="weatherSummary" placeholder="Ex: doux" />
              </Field>
              <Field label="Force colonie">
                <input className={fieldClass} disabled={!canCreateVisit} max="10" min="0" name="colonyStrength" type="number" />
              </Field>
            </div>
          </details>
          <SubmitButton disabled={!canCreateVisit} label="Créer la visite" />
        </form>

        <div className="space-y-4">
          <div className="rounded-2xl border border-cream-300 bg-white p-4">
            <FormHeader
              badge={canUpdateExisting ? "Rapide" : "Visite requise"}
              detail={
                defaultEditableVisit
                  ? `Ajouter une observation courte à "${defaultEditableVisit.objective ?? "visite ouverte"}".`
                  : "Créer ou ouvrir une visite avant d'utiliser les raccourcis."
              }
              permission="visits.write"
              title="Observations rapides"
              tone={canUpdateExisting ? "active" : "soon"}
            />
            <div className="mt-4 grid gap-2">
              {observationPresets.map((preset) => (
                <form action={addDevelopmentVisitObservationFormAction} key={preset.label}>
                  <input name="visitId" type="hidden" value={defaultEditableVisit?.id ?? ""} />
                  <input name="category" type="hidden" value={preset.category} />
                  <input name="label" type="hidden" value={preset.label} />
                  <input name="notes" type="hidden" value={preset.notes} />
                  <button
                    className="min-h-11 w-full rounded-2xl border border-sage-200 bg-sage-50 px-3 py-2 text-left text-sm font-black text-forest-950 transition hover:border-amber-300 hover:bg-amber-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-500"
                    disabled={!canUpdateExisting}
                    type="submit"
                  >
                    {preset.label}
                    <span className="mt-1 block text-xs font-bold leading-5 text-field-muted">
                      {labelForObservationCategory(preset.category)}
                    </span>
                  </button>
                </form>
              ))}
            </div>
          </div>

          <form
            action={addDevelopmentVisitObservationFormAction}
            className="rounded-2xl border border-cream-300 bg-white p-4"
          >
            <FormHeader
              badge={canUpdateExisting ? "Actif dev" : "Visite requise"}
              detail="Compléter une visite déjà ouverte."
              permission="visits.write"
              title="Observation"
              tone={canUpdateExisting ? "active" : "soon"}
            />
            <div className="mt-4 space-y-3">
              <VisitSelect disabled={!canUpdateExisting} visits={editableVisits} />
              <Field label="Catégorie">
                <select className={fieldClass} disabled={!canUpdateExisting} name="category" required>
                  <option value="NOTE">Note</option>
                  <option value="RESERVES">Réserves</option>
                  <option value="HIVE">Ruche</option>
                  <option value="HEALTH">Sanitaire</option>
                  <option value="ACTION">Action</option>
                  <option value="FOLLOW_UP">Suite</option>
                  <option value="COLONY">Colonie</option>
                </select>
              </Field>
              <Field label="Libellé">
                <input className={fieldClass} disabled={!canUpdateExisting} name="label" placeholder="Ex: réserves correctes" required />
              </Field>
              <Field label="Notes">
                <textarea className={fieldClass} disabled={!canUpdateExisting} name="notes" placeholder="Complément court" rows={3} />
              </Field>
            </div>
            <SubmitButton disabled={!canUpdateExisting} label="Ajouter" />
          </form>

          <form
            action={updateDevelopmentVisitStatusFormAction}
            className="rounded-2xl border border-cream-300 bg-white p-4"
          >
            <FormHeader
              badge={canUpdateExisting ? "Actif dev" : "Visite requise"}
              detail="Fermer ou reprendre une visite, sans diagnostic automatique."
              permission="visits.write"
              title="Statut"
              tone={canUpdateExisting ? "active" : "soon"}
            />
            <div className="mt-4 space-y-3">
              <VisitSelect disabled={!canUpdateExisting} visits={editableVisits} />
              <Field label="Nouveau statut">
                <select className={fieldClass} disabled={!canUpdateExisting} name="status" required>
                  <option value="IN_PROGRESS">En cours</option>
                  <option value="COMPLETED">Terminée</option>
                  <option value="PLANNED">Prévue</option>
                  <option value="CANCELLED">Annulée</option>
                </select>
              </Field>
            </div>
            <SubmitButton disabled={!canUpdateExisting} label="Mettre à jour" />
          </form>
        </div>
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

function labelForObservationCategory(category: VisitObservationCategory) {
  const labels = {
    ACTION: "Action",
    COLONY: "Colonie",
    FOLLOW_UP: "Suite",
    HEALTH: "Sanitaire",
    HIVE: "Ruche",
    NOTE: "Note",
    RESERVES: "Réserves",
  } satisfies Record<VisitObservationCategory, string>;

  return labels[category];
}
