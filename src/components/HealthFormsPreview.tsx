import type { ReactNode } from "react";
import Link from "next/link";

import {
  canUseSessionModulePermission,
  createDevelopmentApplicationSession,
} from "@/features/auth";
import type { ApiarySummary, HiveSummary } from "@/features/apiary";
import {
  createDevelopmentHealthObservationFormAction,
  createDevelopmentHornetRecordFormAction,
  createDevelopmentVarroaRecordFormAction,
} from "@/features/health/actions";
import type {
  HealthObservationSummary,
  HornetRecordSummary,
  VarroaRecordSummary,
} from "@/features/health/types";
import type { VisitSummary } from "@/features/visits";

import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { DecorativeImage } from "./DecorativeImage";
import { StatusBadge } from "./StatusBadge";
import { visualAssets } from "./visualAssets";

type HealthFocus = "health" | "varroa" | "hornet";

type HealthFormsPreviewProps = {
  apiaries: ApiarySummary[] | null;
  focus?: HealthFocus;
  hives: HiveSummary[] | null;
  hornetRecords: HornetRecordSummary[] | null;
  observations: HealthObservationSummary[] | null;
  varroaRecords: VarroaRecordSummary[] | null;
  visits: VisitSummary[] | null;
};

const fieldClass =
  "mt-1 min-h-11 w-full rounded-2xl border border-cream-300 bg-cream-50 px-3 py-2 text-sm font-bold text-slate-800 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-200";

const labelClass = "block text-xs font-black uppercase text-slate-600";

const focusConfig = {
  health: {
    actionHref: "#health-observation-form",
    actionLabel: "Noter un fait",
    eyebrow: "Suivi sanitaire",
    title: "Sanitaire",
  },
  varroa: {
    actionHref: "#varroa-record-form",
    actionLabel: "Relever varroa",
    eyebrow: "Suivi manuel",
    title: "Varroa",
  },
  hornet: {
    actionHref: "#hornet-record-form",
    actionLabel: "Signaler frelon",
    eyebrow: "Pression frelon",
    title: "Frelon",
  },
} satisfies Record<
  HealthFocus,
  { actionHref: string; actionLabel: string; eyebrow: string; title: string }
>;

export function HealthFormsPreview({
  apiaries,
  focus = "health",
  hives,
  hornetRecords,
  observations,
  varroaRecords,
  visits,
}: HealthFormsPreviewProps) {
  const session = createDevelopmentApplicationSession();
  const canWrite = canUseSessionModulePermission(session, "health", "health.write");
  const { desktopNavigationItems, mobileNavigationItems } = createAppNavigation(
    focus === "health" ? "/health" : `/health/${focus}`,
  );
  const activeHives = hives?.filter((hive) => hive.status === "ACTIVE") ?? [];
  const activeApiaries = apiaries?.filter((apiary) => apiary.status === "ACTIVE") ?? [];
  const openVisits =
    visits?.filter(
      (visit) =>
        visit.status !== "COMPLETED" &&
        visit.status !== "CANCELLED" &&
        visit.status !== "ARCHIVED",
    ) ?? [];
  const displayObservations = observations ?? [];
  const displayVarroa = varroaRecords ?? [];
  const displayHornet = hornetRecords ?? [];
  const hasLiveData =
    observations !== null && varroaRecords !== null && hornetRecords !== null;
  const highAttentionCount = displayObservations.filter(
    (observation) =>
      observation.severity === "CONCERN" || observation.severity === "URGENT",
  ).length;
  const latestObservation = displayObservations[0] ?? null;
  const config = focusConfig[focus];

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-6">
          <section className="surface-panel rounded-3xl p-5 sm:p-7 lg:p-8">
            <div className="flex flex-wrap gap-2">
              <StatusBadge
                label={hasLiveData ? "Lecture Prisma active" : "Preview"}
                tone={hasLiveData ? "active" : "preview"}
              />
              <StatusBadge label="Manuel" tone="soon" />
              <StatusBadge label="Sans prescription" tone="muted" />
            </div>
            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-end">
              <div>
                <p className="section-kicker">{config.eyebrow}</p>
                <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
                  {config.title}
                </h1>
                <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-700">
                  Note des faits observés sur le terrain. L&apos;application garde
                  une trace claire, mais ne pose aucun diagnostic et ne déclenche
                  aucune action à ta place.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    className="inline-flex min-h-11 items-center rounded-2xl bg-slate-950 px-4 text-sm font-black text-white shadow-field transition hover:bg-amber-800 focus-ring"
                    href={config.actionHref}
                  >
                    {config.actionLabel}
                  </a>
                  <Link
                    className="inline-flex min-h-11 items-center rounded-2xl border border-cream-300 bg-white px-4 text-sm font-black text-slate-800 transition hover:border-amber-300 hover:bg-cream-50 focus-ring"
                    href="/visits"
                  >
                    Voir les visites
                  </Link>
                </div>
              </div>
              <div className="rounded-3xl bg-gradient-amber p-5 text-white shadow-amber">
                <p className="text-sm font-bold uppercase tracking-wide text-amber-100">
                  À surveiller
                </p>
                <p className="mt-3 text-3xl font-black">
                  {highAttentionCount} point{highAttentionCount > 1 ? "s" : ""}
                </p>
                <p className="mt-2 text-sm leading-6 text-amber-50">
                  Le badge aide au tri humain. Il ne vaut ni alerte automatique,
                  ni prescription sanitaire.
                </p>
              </div>
            </div>
            <DecorativeImage
              alt={visualAssets.health.alt}
              aspect="wide"
              className="mt-6"
              priority
              src={visualAssets.health.src}
            />
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <SummaryCard
              detail="Faits sanitaires observés"
              label="Observations"
              value={String(displayObservations.length)}
            />
            <SummaryCard
              detail="Contrôles varroa saisis à la main"
              label="Relevés varroa"
              value={String(displayVarroa.length)}
            />
            <SummaryCard
              detail="Pressions frelon notées"
              label="Signalements"
              value={String(displayHornet.length)}
            />
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_22rem]">
            <div className="space-y-4">
              <LatestPanel
                hornetRecords={displayHornet}
                observation={latestObservation}
                varroaRecords={displayVarroa}
              />
              <HealthObservationForm
                canWrite={canWrite}
                hives={activeHives}
                openVisits={openVisits}
              />
              <VarroaRecordForm
                canWrite={canWrite}
                hives={activeHives}
                openVisits={openVisits}
              />
              <HornetRecordForm
                apiaries={activeApiaries}
                canWrite={canWrite}
                openVisits={openVisits}
              />
            </div>
            <aside className="space-y-4">
              <GuidancePanel />
              <GuardrailPanel />
            </aside>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function LatestPanel({
  hornetRecords,
  observation,
  varroaRecords,
}: {
  hornetRecords: HornetRecordSummary[];
  observation: HealthObservationSummary | null;
  varroaRecords: VarroaRecordSummary[];
}) {
  return (
    <article className="surface-panel rounded-3xl p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="section-kicker">Derniers signaux</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            {observation?.label ?? "Aucun fait sanitaire saisi"}
          </h2>
        </div>
        <StatusBadge
          label={observation ? labelForSeverity(observation.severity) : "À renseigner"}
          tone={observation ? toneForSeverity(observation.severity) : "preview"}
        />
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <DetailPill
          label="Observation"
          value={observation ? formatDate(observation.observedAt) : "Aucune"}
        />
        <DetailPill
          label="Varroa"
          value={varroaRecords[0] ? labelForVarroaMethod(varroaRecords[0].method) : "Aucun"}
        />
        <DetailPill
          label="Frelon"
          value={hornetRecords[0] ? labelForHornetPressure(hornetRecords[0].pressure) : "Aucun"}
        />
      </div>
      <p className="mt-4 rounded-2xl border border-cream-300 bg-cream-50 p-4 text-sm font-bold leading-6 text-slate-800">
        {observation?.notes ??
          "Commence par un fait court: ce que tu vois, où tu le vois, et si cela doit simplement être surveillé."}
      </p>
    </article>
  );
}

function HealthObservationForm({
  canWrite,
  hives,
  openVisits,
}: {
  canWrite: boolean;
  hives: HiveSummary[];
  openVisits: VisitSummary[];
}) {
  return (
    <form
      action={createDevelopmentHealthObservationFormAction}
      className="surface-panel rounded-3xl p-5 sm:p-6"
      id="health-observation-form"
    >
      <FormHeader
        badge={canWrite ? "Actif dev" : "Lecture seule"}
        detail="Saisir un fait observable, sans conclure automatiquement."
        permission="health.write"
        title="Observation sanitaire"
        tone={canWrite ? "active" : "soon"}
      />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field label="Libellé">
          <input
            className={fieldClass}
            disabled={!canWrite}
            name="label"
            placeholder="Ex: couvain à surveiller"
            required
          />
        </Field>
        <Field label="Gravité">
          <select className={fieldClass} disabled={!canWrite} name="severity">
            <option value="INFO">Info</option>
            <option value="WATCH">À surveiller</option>
            <option value="CONCERN">Préoccupation</option>
            <option value="URGENT">Urgent</option>
          </select>
        </Field>
        <HiveSelect disabled={!canWrite} hives={hives} />
        <VisitSelect disabled={!canWrite} visits={openVisits} />
      </div>
      <OptionalFields title="Détails optionnels">
        <Field label="Catégorie">
          <select className={fieldClass} disabled={!canWrite} name="category">
            <option value="GENERAL">Général</option>
            <option value="DISEASE_SIGN">Signe observé</option>
            <option value="QUEEN">Reine</option>
            <option value="BROOD">Couvain</option>
            <option value="FOOD">Réserves</option>
            <option value="BEHAVIOR">Comportement</option>
            <option value="MATERIAL">Matériel</option>
            <option value="OTHER">Autre</option>
          </select>
        </Field>
        <Field label="Date">
          <input className={fieldClass} disabled={!canWrite} name="observedAt" type="date" />
        </Field>
        <Field label="Notes">
          <textarea
            className={fieldClass}
            disabled={!canWrite}
            name="notes"
            placeholder="Fait court, sans donnée sensible inutile"
            rows={3}
          />
        </Field>
      </OptionalFields>
      <SubmitButton disabled={!canWrite} label="Ajouter l'observation" />
    </form>
  );
}

function VarroaRecordForm({
  canWrite,
  hives,
  openVisits,
}: {
  canWrite: boolean;
  hives: HiveSummary[];
  openVisits: VisitSummary[];
}) {
  return (
    <form
      action={createDevelopmentVarroaRecordFormAction}
      className="surface-panel rounded-3xl p-5 sm:p-6"
      id="varroa-record-form"
    >
      <FormHeader
        badge={canWrite ? "Actif dev" : "Lecture seule"}
        detail="Relever un contrôle manuel. Aucun seuil n'est interprété."
        permission="health.write"
        title="Relevé varroa"
        tone={canWrite ? "active" : "soon"}
      />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <HiveSelect disabled={!canWrite} hives={hives} />
        <Field label="Méthode">
          <select className={fieldClass} disabled={!canWrite} name="method">
            <option value="VISUAL">Visuel</option>
            <option value="STICKY_BOARD">Plateau graissé</option>
            <option value="SUGAR_ROLL">Sucre glace</option>
            <option value="ALCOHOL_WASH">Lavage alcool</option>
            <option value="OTHER">Autre</option>
          </select>
        </Field>
        <Field label="Varroas">
          <input className={fieldClass} disabled={!canWrite} min="0" name="miteCount" type="number" />
        </Field>
        <Field label="Échantillon">
          <input className={fieldClass} disabled={!canWrite} min="0" name="sampleSize" type="number" />
        </Field>
      </div>
      <OptionalFields title="Détails optionnels">
        <VisitSelect disabled={!canWrite} visits={openVisits} />
        <Field label="Taux manuel">
          <input className={fieldClass} disabled={!canWrite} min="0" name="infestationRate" step="0.001" type="number" />
        </Field>
        <Field label="Date">
          <input className={fieldClass} disabled={!canWrite} name="observedAt" type="date" />
        </Field>
        <Field label="Notes">
          <textarea className={fieldClass} disabled={!canWrite} name="notes" placeholder="Méthode, contexte, météo si utile" rows={3} />
        </Field>
      </OptionalFields>
      <SubmitButton disabled={!canWrite} label="Ajouter le relevé" />
    </form>
  );
}

function HornetRecordForm({
  apiaries,
  canWrite,
  openVisits,
}: {
  apiaries: ApiarySummary[];
  canWrite: boolean;
  openVisits: VisitSummary[];
}) {
  return (
    <form
      action={createDevelopmentHornetRecordFormAction}
      className="surface-panel rounded-3xl p-5 sm:p-6"
      id="hornet-record-form"
    >
      <FormHeader
        badge={canWrite ? "Actif dev" : "Lecture seule"}
        detail="Signaler une pression observée, sans alerte automatique."
        permission="health.write"
        title="Signalement frelon"
        tone={canWrite ? "active" : "soon"}
      />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <ApiarySelect apiaries={apiaries} disabled={!canWrite} />
        <Field label="Pression">
          <select className={fieldClass} disabled={!canWrite} name="pressure">
            <option value="NONE">Aucune</option>
            <option value="LOW">Faible</option>
            <option value="MEDIUM">Moyenne</option>
            <option value="HIGH">Forte</option>
          </select>
        </Field>
        <Field label="Frelons vus">
          <input className={fieldClass} disabled={!canWrite} min="0" name="hornetCount" type="number" />
        </Field>
        <Field label="Pièges">
          <input className={fieldClass} disabled={!canWrite} min="0" name="trapCount" type="number" />
        </Field>
      </div>
      <OptionalFields title="Détails optionnels">
        <VisitSelect disabled={!canWrite} visits={openVisits} />
        <Field label="Date">
          <input className={fieldClass} disabled={!canWrite} name="observedAt" type="date" />
        </Field>
        <Field label="Notes">
          <textarea className={fieldClass} disabled={!canWrite} name="notes" placeholder="Fait observé, sans alarme automatique" rows={3} />
        </Field>
      </OptionalFields>
      <SubmitButton disabled={!canWrite} label="Ajouter le signalement" />
    </form>
  );
}

function GuidancePanel() {
  return (
    <aside className="surface-muted rounded-3xl p-5">
      <p className="section-kicker">Saisie terrain</p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">
        3 gestes sobres
      </h2>
      <div className="mt-4 space-y-2">
        {["Observer", "Noter", "Décider plus tard"].map((label, index) => (
          <div
            className="flex items-center gap-3 rounded-2xl border border-cream-300 bg-white p-3"
            key={label}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-sage-100 text-xs font-black text-forest-900">
              {index + 1}
            </span>
            <p className="text-sm font-black text-slate-950">{label}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

function GuardrailPanel() {
  const guardrails = [
    "Aucun diagnostic automatique.",
    "Aucune prescription sanitaire.",
    "Aucune tâche créée seule.",
    "Aucune IA ou IoT actif.",
  ] as const;

  return (
    <aside className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
      <p className="section-kicker">Garde-fous</p>
      <ul className="mt-4 space-y-2">
        {guardrails.map((guardrail) => (
          <li className="text-sm font-bold leading-6 text-amber-950" key={guardrail}>
            {guardrail}
          </li>
        ))}
      </ul>
    </aside>
  );
}

function ApiarySelect({
  apiaries,
  disabled,
}: {
  apiaries: ApiarySummary[];
  disabled: boolean;
}) {
  return (
    <Field label="Rucher">
      <select className={fieldClass} disabled={disabled} name="apiaryId">
        <option value="">Aucun rucher</option>
        {apiaries.map((apiary) => (
          <option key={apiary.id} value={apiary.id}>
            {apiary.name}
          </option>
        ))}
      </select>
    </Field>
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
      <select className={fieldClass} disabled={disabled} name="hiveId">
        <option value="">Aucune ruche</option>
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
      <select className={fieldClass} disabled={disabled} name="visitId">
        <option value="">Aucune visite</option>
        {visits.map((visit) => (
          <option key={visit.id} value={visit.id}>
            {visit.objective ?? "Visite sans objectif"} - {labelForVisitStatus(visit.status)}
          </option>
        ))}
      </select>
    </Field>
  );
}

function OptionalFields({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <details className="mt-4 rounded-2xl border border-cream-300 bg-cream-50">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3 py-2 text-sm font-black text-slate-800 focus-ring [&::-webkit-details-marker]:hidden">
        {title}
        <span className="text-xs uppercase text-amber-800">Ouvrir</span>
      </summary>
      <div className="grid gap-3 border-t border-cream-300 p-3 sm:grid-cols-2">
        {children}
      </div>
    </details>
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
    <article className="surface-panel rounded-3xl p-5">
      <p className="section-kicker">{label}</p>
      <p className="mt-3 text-3xl font-black text-slate-950">{value}</p>
      <p className="mt-2 text-sm font-bold leading-6 text-field-muted">{detail}</p>
    </article>
  );
}

function DetailPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-cream-300 bg-white p-3">
      <p className="text-xs font-black uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-black text-slate-950">{value}</p>
    </div>
  );
}

function formatDate(date: Date | null) {
  if (!date) {
    return "Non daté";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function labelForSeverity(severity: HealthObservationSummary["severity"]) {
  const labels = {
    CONCERN: "Préoccupation",
    INFO: "Info",
    URGENT: "Urgent",
    WATCH: "À surveiller",
  } satisfies Record<HealthObservationSummary["severity"], string>;

  return labels[severity];
}

function toneForSeverity(severity: HealthObservationSummary["severity"]) {
  if (severity === "URGENT") {
    return "alert";
  }

  if (severity === "CONCERN" || severity === "WATCH") {
    return "amber";
  }

  return "active";
}

function labelForVarroaMethod(method: VarroaRecordSummary["method"]) {
  const labels = {
    ALCOHOL_WASH: "Lavage alcool",
    OTHER: "Autre",
    STICKY_BOARD: "Plateau",
    SUGAR_ROLL: "Sucre glace",
    VISUAL: "Visuel",
  } satisfies Record<VarroaRecordSummary["method"], string>;

  return labels[method];
}

function labelForHornetPressure(pressure: HornetRecordSummary["pressure"]) {
  const labels = {
    HIGH: "Forte",
    LOW: "Faible",
    MEDIUM: "Moyenne",
    NONE: "Aucune",
  } satisfies Record<HornetRecordSummary["pressure"], string>;

  return labels[pressure];
}

function labelForVisitStatus(status: VisitSummary["status"]) {
  const labels = {
    ARCHIVED: "Archivée",
    CANCELLED: "Annulée",
    COMPLETED: "Terminée",
    DRAFT: "Brouillon",
    IN_PROGRESS: "En cours",
    PLANNED: "Prévue",
  } satisfies Record<VisitSummary["status"], string>;

  return labels[status];
}
