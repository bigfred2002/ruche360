import { StatusBadge } from "./StatusBadge";

type DashboardCardProps = {
  accent?: "amber" | "forest" | "sage" | "red" | "slate";
  icon: string;
  title: string;
  metric: string;
  detail: string;
  status: string;
  statusTone?: "active" | "amber" | "alert" | "muted" | "preview" | "soon";
};

const accentClasses = {
  amber: "bg-amber-100 text-amber-900 ring-amber-200",
  forest: "bg-forest-100 text-forest-900 ring-forest-200",
  sage: "bg-sage-100 text-forest-900 ring-sage-200",
  red: "bg-red-100 text-red-800 ring-red-200",
  slate: "bg-slate-100 text-slate-800 ring-slate-200"
};

export function DashboardCard({
  accent = "amber",
  icon,
  title,
  metric,
  detail,
  status,
  statusTone = "preview"
}: DashboardCardProps) {
  return (
    <article className="motion-card group rounded-2xl border border-cream-300 bg-white p-5 shadow-field hover:shadow-field-lg">
      <div className="flex items-start justify-between gap-3">
        <span
          className={`grid h-12 w-12 place-items-center rounded-2xl text-sm font-black ring-1 ${accentClasses[accent]}`}
        >
          {icon}
        </span>
        <StatusBadge label={status} tone={statusTone} />
      </div>
      <p className="mt-5 text-4xl font-black leading-none text-slate-950">
        {metric}
      </p>
      <h3 className="mt-2 text-base font-bold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-650">{detail}</p>
    </article>
  );
}
