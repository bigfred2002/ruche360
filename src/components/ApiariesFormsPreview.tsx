import type { ReactNode } from "react";
import Link from "next/link";

import {
  canUseSessionModulePermission,
  createDevelopmentApplicationSession,
} from "@/features/auth";
import {
  createDevelopmentApiaryFormAction,
  createDevelopmentHiveFormAction,
} from "@/features/apiary/actions";
import type { ApiarySummary, HiveSummary } from "@/features/apiary/types";

import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { DecorativeImage } from "./DecorativeImage";
import { StatePanel } from "./StatePanel";
import { StatusBadge } from "./StatusBadge";
import { visualAssets } from "./visualAssets";

type ApiariesFormsPreviewProps = {
  apiaries: ApiarySummary[] | null;
  hives: HiveSummary[] | null;
};

const fieldClass =
  "mt-1 min-h-11 w-full rounded-2xl border border-cream-300 bg-cream-50 px-3 py-2 text-sm font-bold text-slate-800 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-200";

const labelClass = "block text-xs font-black uppercase text-slate-600";

export function ApiariesFormsPreview({
  apiaries,
  hives,
}: ApiariesFormsPreviewProps) {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation("/apiaries");
  const session = createDevelopmentApplicationSession();
  const canWrite = canUseSessionModulePermission(
    session,
    "apiaries",
    "apiaries.write",
  );
  const safeApiaries = apiaries ?? [];
  const safeHives = hives ?? [];
  const activeApiaries = safeApiaries.filter((apiary) => apiary.status === "ACTIVE");
  const activeHives = safeHives.filter((hive) => hive.status === "ACTIVE");
  const storedHives = safeHives.filter((hive) => hive.status === "STORED");
  const maintenanceHives = safeHives.filter((hive) => hive.status === "MAINTENANCE");
  const nextAction =
    activeHives.length > 0
      ? "Ouvrir une ruche active avant la visite"
      : activeApiaries.length > 0
        ? "Créer une ruche sur un rucher"
        : "Créer le premier rucher";

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-5 lg:space-y-6">
          <section className="surface-panel rounded-3xl p-5 sm:p-7 lg:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge label="Module terrain" tone="active" />
              <StatusBadge label="Session dev" tone="preview" />
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
              <div>
                <p className="section-kicker">Ruchers et ruches</p>
                <h1 className="mt-2 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
                  Préparer le terrain
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
                  Le rucher donne le lieu. La ruche porte l&apos;action: visite,
                  tâche ou matériel à prévoir.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <HeroMetric label="Ruchers actifs" value={activeApiaries.length} />
                  <HeroMetric label="Ruches actives" value={activeHives.length} />
                  <HeroMetric label="Stock / atelier" value={storedHives.length + maintenanceHives.length} />
                </div>
              </div>
              <div className="rounded-3xl border border-sage-200 bg-sage-50 p-5">
                <p className="text-sm font-black uppercase text-forest-900">
                  Prochaine action
                </p>
                <p className="mt-2 text-2xl font-black leading-tight text-slate-950">
                  {nextAction}
                </p>
                <p className="mt-2 text-sm leading-6 text-field-muted">
                  {safeHives.length} ruche(s) enregistrée(s), dont{" "}
                  {activeHives.length} active(s). Les ruches au stock ou en
                  maintenance restent visibles sans alourdir les visites.
                </p>
              </div>
            </div>
            <DecorativeImage
              alt={visualAssets.apiaries.alt}
              className="mt-6"
              priority
              src={visualAssets.apiaries.src}
            />
          </section>

          <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_26rem]">
            <div className="surface-panel rounded-3xl p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="section-kicker">Liste terrain</p>
                  <h2 className="mt-2 text-2xl font-black text-slate-950">
                    Ruchers disponibles
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-field-muted">
                    Lecture limitée à l&apos;organisation active. Les coordonnées
                    précises restent hors de ce lot pour protéger la localisation.
                  </p>
                </div>
                <StatusBadge label="apiaries.read" tone="active" />
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {safeApiaries.map((apiary) => (
                  <article
                    className="rounded-2xl border border-cream-300 bg-white p-4"
                    key={apiary.id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-black text-slate-950">
                          {apiary.name}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-field-muted">
                          {apiary.locationDescription ?? "Emplacement non précisé"}
                        </p>
                      </div>
                      <StatusBadge label={labelForApiaryStatus(apiary.status)} tone="active" />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <Metric label="Ruches" value={apiary.hiveCount} />
                      <Metric label="Actives" value={apiary.activeHiveCount} />
                    </div>
                    <Link
                      className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-cream-300 bg-cream-50 px-4 text-sm font-black text-slate-800 transition hover:border-amber-300 hover:bg-white focus-ring"
                      href={`/apiaries/${apiary.id}`}
                    >
                      Ouvrir la fiche
                    </Link>
                  </article>
                ))}
              </div>

              {safeApiaries.length === 0 ? (
                <div className="mt-5">
                  <StatePanel
                    detail="Ajoute un premier rucher pour rattacher ensuite une ruche et tester les visites."
                    kind="empty"
                    label="Aucun rucher"
                    title="Le terrain attend son premier site"
                  />
                </div>
              ) : null}
            </div>

            <section className="surface-panel rounded-3xl p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="section-kicker">Formulaires développement</p>
                  <h2 className="mt-2 text-2xl font-black text-slate-950">
                    Ajouter le minimum utile
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-field-muted">
                    Ces actions utilisent la session de développement et
                    préparent le passage à une session authentifiée.
                  </p>
                </div>
                <StatusBadge label={canWrite ? "Écriture dev" : "Lecture seule"} tone="preview" />
              </div>

              <div className="mt-5 space-y-4">
                <form
                  action={createDevelopmentApiaryFormAction}
                  className="rounded-2xl border border-cream-300 bg-white p-4"
                >
                  <FormHeader
                    detail="Créer un site apicole sans coordonnées précises."
                    permission="apiaries.write"
                    title="Nouveau rucher"
                  />
                  <div className="mt-4 space-y-3">
                    <Field label="Nom">
                      <input className={fieldClass} disabled={!canWrite} name="name" placeholder="Ex: Rucher du verger" required />
                    </Field>
                    <Field label="Emplacement">
                      <input className={fieldClass} disabled={!canWrite} name="locationDescription" placeholder="Ex: Verger nord, entrée par le chemin" />
                    </Field>
                    <Field label="Notes d'accès">
                      <textarea className={fieldClass} disabled={!canWrite} name="accessNotes" rows={3} />
                    </Field>
                  </div>
                  <SubmitButton disabled={!canWrite} label="Créer le rucher" />
                </form>

                <form
                  action={createDevelopmentHiveFormAction}
                  className="rounded-2xl border border-cream-300 bg-white p-4"
                >
                  <FormHeader
                    detail="Créer une ruche active ou stockée, rattachée si besoin au rucher."
                    permission="apiaries.write"
                    title="Nouvelle ruche"
                  />
                  <div className="mt-4 space-y-3">
                    <Field label="Identifiant">
                      <input className={fieldClass} disabled={!canWrite} name="fieldIdentifier" placeholder="Ex: RU-024" required />
                    </Field>
                    <Field label="Rucher">
                      <select className={fieldClass} disabled={!canWrite} name="apiaryId">
                        <option value="">Au stock / non rattachée</option>
                        {safeApiaries.map((apiary) => (
                          <option key={apiary.id} value={apiary.id}>
                            {apiary.name}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Type">
                      <input className={fieldClass} disabled={!canWrite} name="hiveType" placeholder="Ex: Dadant 10 cadres" />
                    </Field>
                    <Field label="Statut">
                      <select className={fieldClass} disabled={!canWrite} name="status">
                        <option value="ACTIVE">Active</option>
                        <option value="STORED">Au stock</option>
                        <option value="MAINTENANCE">En réparation</option>
                      </select>
                    </Field>
                  </div>
                  <SubmitButton disabled={!canWrite} label="Créer la ruche" />
                </form>
              </div>
            </section>
          </section>
        </div>
      </div>
    </AppShell>
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

function FormHeader({
  detail,
  permission,
  title,
}: {
  detail: string;
  permission: string;
  title: string;
}) {
  return (
    <>
      <p className="text-xs font-black uppercase text-amber-800">{permission}</p>
      <h3 className="mt-2 text-lg font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-field-muted">{detail}</p>
    </>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-cream-300 bg-cream-50 p-3">
      <p className="text-xs font-black uppercase text-slate-600">{label}</p>
      <p className="mt-1 text-xl font-black text-slate-950">{value}</p>
    </div>
  );
}

function HeroMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-cream-300 bg-white/80 p-3">
      <p className="text-xs font-black uppercase text-slate-600">{label}</p>
      <p className="mt-1 text-2xl font-black text-slate-950">{value}</p>
    </div>
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

function labelForApiaryStatus(status: ApiarySummary["status"]) {
  const labels = {
    ACTIVE: "Actif",
    PAUSED: "En pause",
    ARCHIVED: "Archivé",
  } satisfies Record<ApiarySummary["status"], string>;

  return labels[status];
}
