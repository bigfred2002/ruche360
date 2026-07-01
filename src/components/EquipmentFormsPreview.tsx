import type { ReactNode } from "react";

import {
  canUseSessionModulePermission,
  createDevelopmentApplicationSession,
} from "@/features/auth";
import {
  createDevelopmentEquipmentItemFormAction,
  createDevelopmentEquipmentStockFormAction,
  createDevelopmentEquipmentTypeFormAction,
} from "@/features/equipment/actions";
import type { EquipmentInventorySnapshot } from "@/features/equipment/service";

import { StatusBadge } from "./StatusBadge";

type EquipmentFormsPreviewProps = {
  inventory: EquipmentInventorySnapshot | null;
};

const fieldClass =
  "mt-1 min-h-11 w-full rounded-2xl border border-cream-300 bg-cream-50 px-3 py-2 text-sm font-bold text-slate-800 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-200";

const labelClass = "block text-xs font-black uppercase text-slate-600";

export function EquipmentFormsPreview({ inventory }: EquipmentFormsPreviewProps) {
  const session = createDevelopmentApplicationSession();
  const canWrite = canUseSessionModulePermission(session, "equipment", "equipment.write");
  const canManage = canUseSessionModulePermission(session, "equipment", "equipment.manage");
  const types = inventory?.types ?? [];
  const stockTypes = types.filter((type) => type.trackingMode !== "INDIVIDUAL");
  const itemTypes = types.filter((type) => type.trackingMode !== "QUANTITY");
  const canCreateStock = canWrite && stockTypes.length > 0;
  const canCreateItem = canWrite && itemTypes.length > 0;

  return (
    <section className="surface-panel rounded-3xl p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-kicker">Formulaires développement</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Actions matériel contrôlées
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-field-muted">
            Ces formulaires utilisent la session de développement et les
            commandes serveur déjà cadrées. Ils servent au développement local:
            pas d&apos;authentification réelle, pas d&apos;API publique et pas de
            donnée personnelle.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge label={canWrite ? "Écriture dev" : "Lecture seule"} tone="preview" />
          <StatusBadge label={canManage ? "Catalogue dev" : "Catalogue verrouillé"} tone="soon" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <form
          action={createDevelopmentEquipmentTypeFormAction}
          className="rounded-2xl border border-cream-300 bg-white p-4"
        >
          <FormHeader
            badge={canManage ? "Actif dev" : "Verrouillé"}
            detail="Préparer le catalogue propre à l'organisation."
            permission="equipment.manage"
            title="Type de matériel"
            tone={canManage ? "active" : "soon"}
          />
          <div className="mt-4 space-y-3">
            <Field label="Nom">
              <input className={fieldClass} name="name" placeholder="Ex: Seau alimentaire" required />
            </Field>
            <Field label="Catégorie">
              <input className={fieldClass} name="category" placeholder="Ex: Récolte" required />
            </Field>
            <Field label="Mode de suivi">
              <select className={fieldClass} name="trackingMode" required>
                <option value="QUANTITY">Quantité</option>
                <option value="INDIVIDUAL">Individuel</option>
                <option value="HYBRID">Hybride</option>
              </select>
            </Field>
            <Field label="Unité par défaut">
              <input className={fieldClass} name="defaultUnit" placeholder="Ex: pièce" />
            </Field>
            <Field label="Notes">
              <textarea className={fieldClass} name="notes" placeholder="Usage, limites ou rangement" rows={3} />
            </Field>
          </div>
          <SubmitButton disabled={!canManage} label="Créer le type" />
        </form>

        <form
          action={createDevelopmentEquipmentStockFormAction}
          className="rounded-2xl border border-cream-300 bg-white p-4"
        >
          <FormHeader
            badge={canCreateStock ? "Actif dev" : "Seed requis"}
            detail="Ajouter un stock consommable ou hybride dans l'inventaire local."
            permission="equipment.write"
            title="Stock consommable"
            tone={canCreateStock ? "active" : "soon"}
          />
          <div className="mt-4 space-y-3">
            <Field label="Type">
              <select className={fieldClass} disabled={!canCreateStock} name="equipmentTypeId" required>
                {stockTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Quantité">
              <input className={fieldClass} min="0.001" name="quantity" required step="0.001" type="number" />
            </Field>
            <Field label="Unité">
              <input className={fieldClass} name="unit" placeholder="Ex: cadre" required />
            </Field>
            <Field label="Emplacement">
              <input className={fieldClass} name="locationLabel" placeholder="Ex: Local matériel" />
            </Field>
            <Field label="Notes">
              <textarea className={fieldClass} name="notes" placeholder="Contexte de l'ajout" rows={3} />
            </Field>
          </div>
          <SubmitButton disabled={!canCreateStock} label="Ajouter le stock" />
        </form>

        <form
          action={createDevelopmentEquipmentItemFormAction}
          className="rounded-2xl border border-cream-300 bg-white p-4"
        >
          <FormHeader
            badge={canCreateItem ? "Actif dev" : "Seed requis"}
            detail="Créer un élément individuel comme un enfumoir ou une combinaison."
            permission="equipment.write"
            title="Item individuel"
            tone={canCreateItem ? "active" : "soon"}
          />
          <div className="mt-4 space-y-3">
            <Field label="Type">
              <select className={fieldClass} disabled={!canCreateItem} name="equipmentTypeId" required>
                {itemTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Identifiant terrain">
              <input className={fieldClass} name="fieldIdentifier" placeholder="Ex: DEV-OUTIL-002" required />
            </Field>
            <Field label="Statut">
              <select className={fieldClass} name="status">
                <option value="AVAILABLE">Disponible</option>
                <option value="IN_USE">En tournée</option>
                <option value="TO_CLEAN">À nettoyer</option>
                <option value="MAINTENANCE">Maintenance</option>
              </select>
            </Field>
            <Field label="Localisation">
              <input className={fieldClass} name="locationLabel" placeholder="Ex: Caisse visite" />
            </Field>
            <Field label="Notes">
              <textarea className={fieldClass} name="notes" placeholder="Marque, état ou rappel terrain" rows={3} />
            </Field>
          </div>
          <SubmitButton disabled={!canCreateItem} label="Créer l'item" />
        </form>
      </div>
    </section>
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
