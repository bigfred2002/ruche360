type StatusBadgeProps = {
  label: string;
  tone?: "active" | "muted" | "soon";
};

const toneClasses = {
  active: "border-olive-200 bg-olive-50 text-olive-800",
  muted: "border-slate-200 bg-slate-100 text-slate-600",
  soon: "border-honey-200 bg-honey-50 text-honey-900"
};

export function StatusBadge({ label, tone = "active" }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex min-h-7 items-center rounded-full border px-3 text-xs font-semibold ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}
