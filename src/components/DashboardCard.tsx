import { StatusBadge } from "./StatusBadge";

type DashboardCardProps = {
  title: string;
  metric: string;
  detail: string;
  status: string;
};

export function DashboardCard({
  title,
  metric,
  detail,
  status
}: DashboardCardProps) {
  return (
    <article className="rounded-lg border border-cream-300 bg-white p-4 shadow-field">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <StatusBadge label={status} />
      </div>
      <p className="mt-5 text-3xl font-semibold text-slate-950">{metric}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
    </article>
  );
}
