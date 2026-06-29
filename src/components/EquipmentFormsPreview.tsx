import {
  canUseSessionModulePermission,
  createDevelopmentApplicationSession,
} from "@/features/auth";

import { StatusBadge } from "./StatusBadge";

const formSections = [
  {
    title: "Type de matériel",
    permission: "equipment.manage",
    fields: ["Nom", "Catégorie", "Mode de suivi", "Unité par défaut"],
    detail: "Préparer le catalogue propre à l'organisation.",
  },
  {
    title: "Stock consommable",
    permission: "equipment.write",
    fields: ["Type", "Quantité", "Unité", "Emplacement"],
    detail: "Ajouter ou ajuster cadres, cire, pots ou nourrissement.",
  },
  {
    title: "Item individuel",
    permission: "equipment.write",
    fields: ["Type", "Identifiant terrain", "Statut", "Localisation"],
    detail: "Suivre enfumoirs, extracteurs, combinaisons ou caisses de visite.",
  },
] as const;

export function EquipmentFormsPreview() {
  const session = createDevelopmentApplicationSession();
  const canWrite = canUseSessionModulePermission(session, "equipment", "equipment.write");
  const canManage = canUseSessionModulePermission(session, "equipment", "equipment.manage");

  return (
    <section className="surface-panel rounded-3xl p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-kicker">Formulaires préparés</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Branchements matériel sous contrôle
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-field-muted">
            Ces formulaires lisent la session de développement pour afficher les droits
            disponibles. Ils restent désactivés tant qu&apos;une vraie session navigateur
            et des données de démonstration maîtrisées ne sont pas validées.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge label={canWrite ? "Écriture cadrée" : "Lecture seule"} tone="preview" />
          <StatusBadge label={canManage ? "Gestion catalogue" : "Catalogue verrouillé"} tone="soon" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {formSections.map((section) => (
          <article className="rounded-2xl border border-cream-300 bg-white p-4" key={section.title}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase text-amber-800">
                  {section.permission}
                </p>
                <h3 className="mt-2 text-lg font-black text-slate-950">{section.title}</h3>
              </div>
              <StatusBadge label="Désactivé" tone="soon" />
            </div>
            <p className="mt-3 text-sm leading-6 text-field-muted">{section.detail}</p>
            <div className="mt-4 space-y-3">
              {section.fields.map((field) => (
                <label className="block" key={field}>
                  <span className="text-xs font-black uppercase text-slate-600">{field}</span>
                  <span className="mt-1 block rounded-2xl border border-dashed border-cream-300 bg-cream-50 px-3 py-2 text-sm font-bold text-slate-500">
                    Champ non actif
                  </span>
                </label>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-500">
              Action volontairement indisponible
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
