type StatusBadgeProps = {
  label: string;
  tone?: "active" | "amber" | "alert" | "muted" | "preview" | "soon";
};

const toneClasses = {
  active: "border-sage-200 bg-sage-100 text-forest-900",
  amber: "border-amber-200 bg-amber-100 text-amber-950",
  alert: "border-red-200 bg-red-100 text-red-800",
  muted: "border-stone-200 bg-stone-100 text-stone-600",
  preview: "border-cream-300 bg-white text-slate-700",
  soon: "border-amber-200 bg-amber-50 text-amber-900"
};

export function StatusBadge({ label, tone = "active" }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex min-h-7 items-center rounded-full border px-3 text-[11px] font-bold uppercase tracking-wide ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}
