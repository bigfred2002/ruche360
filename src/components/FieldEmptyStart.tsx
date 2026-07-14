import Link from "next/link";

import { StatusBadge } from "./StatusBadge";

type FieldEmptyStartProps = {
  actionHref: string;
  actionLabel: string;
  detail: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  title: string;
};

export function FieldEmptyStart({
  actionHref,
  actionLabel,
  detail,
  secondaryHref,
  secondaryLabel,
  title,
}: FieldEmptyStartProps) {
  return (
    <article className="rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-field sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-amber-800">
            Démarrage
          </p>
          <h2 className="mt-2 text-2xl font-black leading-tight text-slate-950">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm font-bold leading-6 text-slate-700">
            {detail}
          </p>
        </div>
        <StatusBadge label="Base vide" tone="amber" />
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-forest-900 px-4 text-sm font-black text-white transition hover:bg-forest-800 focus-ring"
          href={actionHref}
        >
          {actionLabel}
        </Link>
        {secondaryHref && secondaryLabel ? (
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cream-300 bg-white px-4 text-sm font-black text-slate-800 transition hover:border-amber-300 hover:bg-cream-50 focus-ring"
            href={secondaryHref}
          >
            {secondaryLabel}
          </Link>
        ) : null}
      </div>
    </article>
  );
}
