import Link from "next/link";
import type { ReactNode } from "react";

type DetailCoherenceLink = {
  href: string;
  label: string;
  tone?: "primary" | "secondary";
};

type DetailCoherencePanelProps = {
  children?: ReactNode;
  kicker: string;
  links: DetailCoherenceLink[];
  limits: string[];
  nextAction: string;
  title: string;
};

export function DetailCoherencePanel({
  children,
  kicker,
  links,
  limits,
  nextAction,
  title,
}: DetailCoherencePanelProps) {
  return (
    <aside className="surface-muted rounded-3xl p-5">
      <p className="section-kicker">{kicker}</p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">{title}</h2>

      <div className="mt-4 rounded-2xl border border-cream-300 bg-white p-4">
        <p className="text-xs font-black uppercase text-amber-800">
          Prochaine action
        </p>
        <p className="mt-2 text-sm font-bold leading-6 text-slate-800">
          {nextAction}
        </p>
      </div>

      <div className="mt-4 grid gap-2">
        {links.map((link) => (
          <Link
            className={linkClassName(link.tone)}
            href={link.href}
            key={`${link.href}-${link.label}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-cream-300 bg-cream-50 p-4">
        <p className="text-xs font-black uppercase text-slate-650">Limites</p>
        <ul className="mt-2 space-y-2 text-sm font-bold leading-6 text-field-muted">
          {limits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
      </div>

      {children}
    </aside>
  );
}

function linkClassName(tone: DetailCoherenceLink["tone"] = "secondary") {
  const base =
    "inline-flex min-h-11 items-center justify-center rounded-2xl px-4 text-sm font-black transition focus-ring";

  if (tone === "primary") {
    return `${base} bg-forest-900 text-white hover:bg-forest-800`;
  }

  return `${base} border border-cream-300 bg-white text-slate-800 hover:border-amber-300`;
}
