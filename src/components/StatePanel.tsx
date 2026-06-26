import { StatusBadge } from "./StatusBadge";

export type StatePanelKind =
  | "empty"
  | "loading"
  | "no-permission"
  | "disabled"
  | "coming-soon"
  | "alert";

type StatePanelProps = {
  detail: string;
  kind: StatePanelKind;
  label: string;
  title: string;
};

const stateStyles: Record<
  StatePanelKind,
  {
    badgeTone: "active" | "amber" | "alert" | "muted" | "preview" | "soon";
    frame: string;
    icon: string;
    iconFrame: string;
  }
> = {
  alert: {
    badgeTone: "alert",
    frame: "border-red-200 bg-red-100/45",
    icon: "Al",
    iconFrame: "bg-red-100 text-red-800 ring-red-200",
  },
  "coming-soon": {
    badgeTone: "soon",
    frame: "border-amber-200 bg-amber-50",
    icon: "Av",
    iconFrame: "bg-amber-100 text-amber-950 ring-amber-200",
  },
  disabled: {
    badgeTone: "muted",
    frame: "border-stone-200 bg-stone-100/70",
    icon: "De",
    iconFrame: "bg-white text-stone-600 ring-stone-200",
  },
  empty: {
    badgeTone: "preview",
    frame: "border-cream-300 bg-white",
    icon: "Vi",
    iconFrame: "bg-cream-50 text-amber-900 ring-cream-300",
  },
  loading: {
    badgeTone: "amber",
    frame: "border-cream-300 bg-white",
    icon: "Ch",
    iconFrame: "bg-amber-50 text-amber-900 ring-amber-200",
  },
  "no-permission": {
    badgeTone: "alert",
    frame: "border-red-200 bg-white",
    icon: "Pe",
    iconFrame: "bg-red-100 text-red-800 ring-red-200",
  },
};

export function StatePanel({ detail, kind, label, title }: StatePanelProps) {
  const styles = stateStyles[kind];

  return (
    <article className={`rounded-2xl border p-4 shadow-field ${styles.frame}`}>
      <div className="flex items-start justify-between gap-3">
        <span
          aria-hidden="true"
          className={`grid size-11 shrink-0 place-items-center rounded-2xl text-xs font-black ring-1 ${styles.iconFrame}`}
        >
          {styles.icon}
        </span>
        <StatusBadge label={label} tone={styles.badgeTone} />
      </div>
      <h3 className="mt-4 text-base font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-650">{detail}</p>

      {kind === "loading" ? (
        <div className="mt-4 space-y-2" aria-hidden="true">
          <span className="block h-3 w-11/12 animate-pulse rounded-full bg-cream-300" />
          <span className="block h-3 w-7/12 animate-pulse rounded-full bg-cream-300" />
        </div>
      ) : null}
    </article>
  );
}
