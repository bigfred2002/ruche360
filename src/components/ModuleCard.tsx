import { StatusBadge } from "./StatusBadge";

type ModuleCardProps = {
  title: string;
  description: string;
  status?: "Disponible" | "A venir";
  disabled?: boolean;
};

export function ModuleCard({
  title,
  description,
  status = "Disponible",
  disabled = false
}: ModuleCardProps) {
  return (
    <article
      className={`rounded-lg border p-4 shadow-field ${
        disabled
          ? "border-slate-200 bg-slate-50 text-slate-500"
          : "border-cream-300 bg-white text-slate-900"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold">{title}</h3>
        <StatusBadge
          label={status}
          tone={disabled ? "muted" : "active"}
        />
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}
