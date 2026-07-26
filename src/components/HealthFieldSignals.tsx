import Link from "next/link";

import type {
  HealthObservationSummary,
  HornetRecordSummary,
  VarroaRecordSummary,
} from "@/features/health";

import { StatusBadge } from "./StatusBadge";

type HealthFieldSignalsProps = {
  apiaryId?: string | null;
  compact?: boolean;
  hiveId?: string | null;
  hornetRecords: HornetRecordSummary[] | null;
  observations: HealthObservationSummary[] | null;
  title?: string;
  varroaRecords: VarroaRecordSummary[] | null;
  visitId?: string | null;
};

export function HealthFieldSignals({
  apiaryId,
  compact = false,
  hiveId,
  hornetRecords,
  observations,
  title = "Signaux sanitaires",
  varroaRecords,
  visitId,
}: HealthFieldSignalsProps) {
  const scopedObservations = (observations ?? []).filter((observation) =>
    matchesScope(observation, { apiaryId, hiveId, visitId }),
  );
  const scopedVarroa = (varroaRecords ?? []).filter((record) =>
    matchesScope(record, { apiaryId, hiveId, visitId }),
  );
  const scopedHornet = (hornetRecords ?? []).filter((record) =>
    matchesScope(record, { apiaryId, visitId }),
  );
  const attentionCount = scopedObservations.filter(
    (observation) =>
      observation.severity === "CONCERN" || observation.severity === "URGENT",
  ).length;
  const latestObservation = scopedObservations[0] ?? null;
  const latestVarroa = scopedVarroa[0] ?? null;
  const latestHornet = scopedHornet[0] ?? null;
  const hasLiveData =
    observations !== null && varroaRecords !== null && hornetRecords !== null;

  return (
    <section className="surface-panel rounded-3xl p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="section-kicker">Lecture seule</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">{title}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge
            label={hasLiveData ? "Prisma" : "Indisponible"}
            tone={hasLiveData ? "active" : "preview"}
          />
          <StatusBadge label="Sans diagnostic" tone="muted" />
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <SignalMetric
          detail="Faits à relire"
          label="Observations"
          tone={attentionCount > 0 ? "amber" : "active"}
          value={String(scopedObservations.length)}
        />
        <SignalMetric
          detail={latestVarroa ? labelForVarroaMethod(latestVarroa.method) : "Aucun relevé"}
          label="Varroa"
          tone="preview"
          value={String(scopedVarroa.length)}
        />
        <SignalMetric
          detail={latestHornet ? labelForHornetPressure(latestHornet.pressure) : "Aucun signal"}
          label="Frelon"
          tone={latestHornet?.pressure === "HIGH" ? "amber" : "preview"}
          value={String(scopedHornet.length)}
        />
      </div>

      {compact ? null : (
        <div className="mt-4 rounded-2xl border border-cream-300 bg-cream-50 p-4">
          <p className="text-xs font-black uppercase text-amber-800">
            Dernier fait
          </p>
          <p className="mt-2 text-sm font-bold leading-6 text-slate-800">
            {latestObservation
              ? `${latestObservation.label} · ${labelForSeverity(latestObservation.severity)}`
              : "Aucun fait sanitaire rattaché à ce contexte."}
          </p>
        </div>
      )}

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-amber-800 focus-ring"
          href="/health"
        >
          Ouvrir sanitaire
        </Link>
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cream-300 bg-white px-4 text-sm font-black text-slate-800 transition hover:border-amber-300 hover:bg-cream-50 focus-ring"
          href="/health/varroa"
        >
          Voir varroa
        </Link>
      </div>
    </section>
  );
}

function matchesScope(
  record: {
    apiaryId?: string | null;
    hiveId?: string | null;
    visitId?: string | null;
  },
  scope: {
    apiaryId?: string | null;
    hiveId?: string | null;
    visitId?: string | null;
  },
) {
  if (scope.visitId) {
    return record.visitId === scope.visitId;
  }

  if (scope.hiveId) {
    return record.hiveId === scope.hiveId;
  }

  if (scope.apiaryId) {
    return record.apiaryId === scope.apiaryId;
  }

  return true;
}

function SignalMetric({
  detail,
  label,
  tone,
  value,
}: {
  detail: string;
  label: string;
  tone: "active" | "amber" | "preview";
  value: string;
}) {
  return (
    <article className="rounded-2xl border border-cream-300 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-black uppercase text-slate-600">{label}</p>
        <StatusBadge label={tone === "amber" ? "À relire" : "Manuel"} tone={tone} />
      </div>
      <p className="mt-3 text-3xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-xs font-bold leading-5 text-field-muted">{detail}</p>
    </article>
  );
}

function labelForSeverity(severity: HealthObservationSummary["severity"]) {
  const labels = {
    CONCERN: "préoccupation",
    INFO: "info",
    URGENT: "urgent",
    WATCH: "à surveiller",
  } satisfies Record<HealthObservationSummary["severity"], string>;

  return labels[severity];
}

function labelForVarroaMethod(method: VarroaRecordSummary["method"]) {
  const labels = {
    ALCOHOL_WASH: "lavage alcool",
    OTHER: "autre méthode",
    STICKY_BOARD: "plateau graissé",
    SUGAR_ROLL: "sucre glace",
    VISUAL: "visuel",
  } satisfies Record<VarroaRecordSummary["method"], string>;

  return labels[method];
}

function labelForHornetPressure(pressure: HornetRecordSummary["pressure"]) {
  const labels = {
    HIGH: "pression forte",
    LOW: "pression faible",
    MEDIUM: "pression moyenne",
    NONE: "aucune pression",
  } satisfies Record<HornetRecordSummary["pressure"], string>;

  return labels[pressure];
}
