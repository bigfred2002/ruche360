import { StatusBadge } from "./StatusBadge";

type ModuleCardProps = {
  accent?: "amber" | "forest" | "sage" | "red" | "slate";
  category?: string;
  icon: string;
  title: string;
  description: string;
  status?: "Disponible" | "A venir" | "Désactivé" | "Preview";
  disabled?: boolean;
};

const accentClasses = {
  amber: "bg-amber-100 text-amber-900 ring-amber-200",
  forest: "bg-forest-100 text-forest-900 ring-forest-200",
  sage: "bg-sage-100 text-forest-900 ring-sage-200",
  red: "bg-red-100 text-red-800 ring-red-200",
  slate: "bg-stone-100 text-stone-600 ring-stone-200"
};

export function ModuleCard({
  accent = "sage",
  category,
  icon,
  title,
  description,
  status = "Disponible",
  disabled = false
}: ModuleCardProps) {
  return (
    <article
      className={`relative overflow-hidden rounded-2xl border p-5 shadow-field transition-smooth ${
        disabled
          ? "border-dashed border-stone-300 bg-stone-50 text-stone-600"
          : "border-cream-300 bg-white text-slate-950 hover:-translate-y-0.5 hover:shadow-field-lg"
      }`}
    >
      {!disabled ? (
        <span className="absolute right-0 top-0 h-24 w-24 -translate-y-12 translate-x-12 rounded-full bg-amber-100/70" />
      ) : null}
      <div className="flex items-start justify-between gap-3">
        <span
          className={`grid h-11 w-11 place-items-center rounded-2xl text-sm font-black ring-1 ${
            disabled ? accentClasses.slate : accentClasses[accent]
          }`}
        >
          {icon}
        </span>
        <StatusBadge
          label={status}
          tone={disabled ? "muted" : status === "Preview" ? "soon" : "active"}
        />
      </div>
      {category ? (
        <p className="mt-5 text-[11px] font-bold uppercase tracking-wide text-amber-800">
          {category}
        </p>
      ) : null}
      <h3 className="mt-2 text-lg font-black leading-7 text-slate-950">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-650">{description}</p>
    </article>
  );
}
