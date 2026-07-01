import type { ReactNode } from "react";

import {
  canUseSessionModulePermission,
  createDevelopmentApplicationSession,
} from "@/features/auth";
import {
  addDevelopmentHivesToMovementFormAction,
  createDevelopmentHiveMovementFormAction,
  updateDevelopmentHiveMovementStatusFormAction,
} from "@/features/hive-movements/actions";
import type { HiveMovementSummary } from "@/features/hive-movements/types";

import { StatusBadge } from "./StatusBadge";

type TranshumanceFormsPreviewProps = {
  movements: HiveMovementSummary[] | null;
};

const apiaryOptions = [
  { id: "dev-apiary-home", label: "Rucher école" },
  { id: "dev-apiary-hill", label: "Rucher des coteaux" },
];

const hiveOptions = [
  { id: "dev-hive-001", label: "DEV-RU-001" },
  { id: "dev-hive-002", label: "DEV-RU-002" },
];

const fieldClass =
  "mt-1 min-h-11 w-full rounded-2xl border border-cream-300 bg-cream-50 px-3 py-2 text-sm font-bold text-slate-800 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-200";

const labelClass = "block text-xs font-black uppercase text-slate-600";

export function TranshumanceFormsPreview({ movements }: TranshumanceFormsPreviewProps) {
  const session = createDevelopmentApplicationSession();
  const canWrite = canUseSessionModulePermission(
    session,
    "transhumance",
    "transhumance.write",
  );
  const canManage = canUseSessionModulePermission(
    session,
    "transhumance",
    "transhumance.manage",
  );
  const editableMovements =
    movements?.filter(
      (movement) => movement.status !== "COMPLETED" && movement.status !== "CANCELLED",
    ) ?? [];
  const canUpdateExisting = canWrite && editableMovements.length > 0;

  return (
    <section className="surface-panel rounded-3xl p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-kicker">Formulaires développement</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Actions transhumance contrôlées
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-field-muted">
            Ces formulaires utilisent uniquement les données fictives du seed et
            la session de développement. Ils préparent le workflow terrain sans
            API publique, sans authentification réelle et sans suivi GPS.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge label={canWrite ? "Écriture dev" : "Lecture seule"} tone="preview" />
          <StatusBadge label={canManage ? "Annulation dev" : "Annulation verrouillée"} tone="soon" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <form
          action={createDevelopmentHiveMovementFormAction}
          className="rounded-2xl border border-cream-300 bg-white p-4"
        >
          <FormHeader
            badge={canWrite ? "Actif dev" : "Verrouillé"}
            detail="Créer un déplacement prévu entre deux ruchers fictifs."
            permission="transhumance.write"
            title="Nouveau mouvement"
            tone={canWrite ? "active" : "soon"}
          />
          <div className="mt-4 space-y-3">
            <Field label="Rucher source">
              <select className={fieldClass} name="sourceApiaryId">
                <option value="">Non précisé</option>
                {apiaryOptions.map((apiary) => (
                  <option key={apiary.id} value={apiary.id}>
                    {apiary.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Rucher destination">
              <select className={fieldClass} name="destinationApiaryId" required>
                {apiaryOptions.map((apiary) => (
                  <option key={apiary.id} value={apiary.id}>
                    {apiary.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Date de départ">
              <input className={fieldClass} name="departureDate" required type="date" />
            </Field>
            <Field label="Motif">
              <select className={fieldClass} name="reason">
                <option value="HONEY_FLOW">Miellée</option>
                <option value="POLLINATION">Pollinisation</option>
                <option value="WINTERING">Hivernage</option>
                <option value="EMERGENCY">Urgence</option>
                <option value="HEALTH">Sanitaire</option>
                <option value="GROUPING">Regroupement</option>
                <option value="OTHER">Autre</option>
              </select>
            </Field>
            <HiveCheckboxes disabled={!canWrite} />
            <Field label="Notes">
              <textarea className={fieldClass} name="notes" placeholder="Préparation, contrainte ou rappel" rows={3} />
            </Field>
          </div>
          <SubmitButton disabled={!canWrite} label="Créer le mouvement" />
        </form>

        <form
          action={addDevelopmentHivesToMovementFormAction}
          className="rounded-2xl border border-cream-300 bg-white p-4"
        >
          <FormHeader
            badge={canUpdateExisting ? "Actif dev" : "Mouvement requis"}
            detail="Ajouter des ruches seedées à un mouvement encore modifiable."
            permission="transhumance.write"
            title="Ajouter des ruches"
            tone={canUpdateExisting ? "active" : "soon"}
          />
          <div className="mt-4 space-y-3">
            <MovementSelect disabled={!canUpdateExisting} movements={editableMovements} />
            <HiveCheckboxes disabled={!canUpdateExisting} />
            <Field label="Notes">
              <textarea className={fieldClass} name="notes" placeholder="Pourquoi ajouter ces ruches ?" rows={3} />
            </Field>
          </div>
          <SubmitButton disabled={!canUpdateExisting} label="Ajouter au mouvement" />
        </form>

        <form
          action={updateDevelopmentHiveMovementStatusFormAction}
          className="rounded-2xl border border-cream-300 bg-white p-4"
        >
          <FormHeader
            badge={canUpdateExisting ? "Actif dev" : "Mouvement requis"}
            detail="Marquer un mouvement en cours, terminé ou annulé selon les permissions."
            permission="transhumance.write / manage"
            title="Changer le statut"
            tone={canUpdateExisting ? "active" : "soon"}
          />
          <div className="mt-4 space-y-3">
            <MovementSelect disabled={!canUpdateExisting} movements={editableMovements} />
            <Field label="Statut">
              <select className={fieldClass} disabled={!canUpdateExisting} name="status" required>
                <option value="IN_PROGRESS">En cours</option>
                <option value="COMPLETED">Terminé</option>
                <option disabled={!canManage} value="CANCELLED">
                  Annulé
                </option>
              </select>
            </Field>
            <Field label="Date d'arrivée">
              <input className={fieldClass} disabled={!canUpdateExisting} name="arrivalDate" type="date" />
            </Field>
            <Field label="Notes">
              <textarea className={fieldClass} name="notes" placeholder="Confirmation terrain ou raison d'annulation" rows={3} />
            </Field>
          </div>
          <SubmitButton disabled={!canUpdateExisting} label="Mettre à jour" />
        </form>
      </div>
    </section>
  );
}

function MovementSelect({
  disabled,
  movements,
}: {
  disabled: boolean;
  movements: HiveMovementSummary[];
}) {
  return (
    <Field label="Mouvement">
      <select className={fieldClass} disabled={disabled} name="movementId" required>
        {movements.map((movement) => (
          <option key={movement.id} value={movement.id}>
            {formatShortDate(movement.departureDate)} vers {movement.destinationApiaryId}
          </option>
        ))}
      </select>
    </Field>
  );
}

function HiveCheckboxes({ disabled }: { disabled: boolean }) {
  return (
    <fieldset className="rounded-2xl border border-cream-300 bg-cream-50 p-3">
      <legend className="px-1 text-xs font-black uppercase text-slate-600">
        Ruches fictives
      </legend>
      <div className="mt-2 space-y-2">
        {hiveOptions.map((hive) => (
          <label
            className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 text-sm font-bold text-slate-800"
            key={hive.id}
          >
            <input
              className="h-4 w-4 accent-amber-700"
              disabled={disabled}
              name="hiveIds"
              required={hive.id === hiveOptions[0].id}
              type="checkbox"
              value={hive.id}
            />
            {hive.label}
          </label>
        ))}
      </div>
    </fieldset>
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

function formatShortDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
  }).format(date);
}
