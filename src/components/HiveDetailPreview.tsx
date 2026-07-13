import Link from "next/link";

import type { HiveDetail } from "@/features/apiary";

import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { StatePanel } from "./StatePanel";
import { StatusBadge } from "./StatusBadge";

type HiveDetailPreviewProps = {
  hive: HiveDetail;
};

export function HiveDetailPreview({ hive }: HiveDetailPreviewProps) {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation("/apiaries");
  const activeColonies = hive.colonies.filter(
    (colony) => colony.status === "ACTIVE",
  );

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <main className="mx-auto w-full max-w-5xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-5 lg:space-y-6">
          <Link
            className="inline-flex min-h-11 items-center rounded-2xl border border-cream-300 bg-white px-4 text-sm font-black text-slate-800 transition hover:border-amber-300 hover:text-amber-900 focus-ring"
            href={hive.apiaryId ? `/apiaries/${hive.apiaryId}` : "/apiaries"}
          >
            Retour au rucher
          </Link>

          <section className="surface-panel rounded-3xl p-5 sm:p-7 lg:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge label={labelForHiveStatus(hive.status)} tone="active" />
              <StatusBadge label="Lecture seule" tone="preview" />
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
              <div>
                <p className="section-kicker">Fiche ruche</p>
                <h1 className="mt-2 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
                  {hive.fieldIdentifier}
                </h1>
                <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
                  {hive.notes ??
                    "Vue courte de la ruche, pensée pour décider rapidement si une visite ou une tâche est utile."}
                </p>
              </div>
              <div className="rounded-3xl border border-sage-200 bg-sage-50 p-5">
                <p className="text-sm font-black uppercase text-forest-900">
                  Vivant suivi
                </p>
                <p className="mt-2 text-3xl font-black text-slate-950">
                  {hive.activeColonyCount}
                </p>
                <p className="mt-1 text-sm font-bold leading-6 text-field-muted">
                  colonie(s) active(s) sur {hive.colonyCount}
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-3 sm:grid-cols-3">
            <QuickLink
              detail="Noter une observation"
              href="/visits"
              label="Visite"
              tone="primary"
            />
            <QuickLink
              detail="Prévoir une suite"
              href="/tasks"
              label="Tâche"
            />
            <QuickLink
              detail={hive.apiaryName ?? "Revenir à la liste"}
              href={hive.apiaryId ? `/apiaries/${hive.apiaryId}` : "/apiaries"}
              label="Rucher"
            />
          </section>

          <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <article className="surface-panel rounded-3xl p-5 sm:p-6">
              <p className="section-kicker">Contexte</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Où et comment
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <InfoBlock label="Rucher" value={hive.apiaryName ?? "Au stock"} />
                <InfoBlock label="Type" value={hive.hiveType ?? "Non précisé"} />
              </div>
            </article>

            <aside className="surface-muted rounded-3xl p-5">
              <p className="section-kicker">Suite terrain</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Garder simple
              </h2>
              <p className="mt-3 text-sm font-bold leading-6 text-field-muted">
                La visite reste le bon endroit pour noter l&apos;observation. La tâche
                sert seulement à garder une suite visible.
              </p>
              <div className="mt-4 grid gap-2">
                <Link
                  className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-forest-900 px-4 text-sm font-black text-white transition hover:bg-forest-800 focus-ring"
                  href="/visits"
                >
                  Ouvrir les visites
                </Link>
                <Link
                  className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cream-300 bg-white px-4 text-sm font-black text-slate-800 transition hover:border-amber-300 focus-ring"
                  href="/tasks"
                >
                  Voir les tâches
                </Link>
                <Link
                  className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cream-300 bg-white px-4 text-sm font-black text-slate-800 transition hover:border-amber-300 focus-ring"
                  href="/equipment"
                >
                  Vérifier matériel
                </Link>
              </div>
            </aside>
          </section>

          <section className="surface-panel rounded-3xl p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="section-kicker">Colonies</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Suivi vivant
                </h2>
              </div>
              <StatusBadge
                label={`${activeColonies.length} active(s)`}
                tone="preview"
              />
            </div>

            {hive.colonies.length > 0 ? (
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {hive.colonies.map((colony) => (
                  <article
                    className="rounded-2xl border border-cream-300 bg-white p-4"
                    key={colony.id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-black text-slate-950">
                          Colonie
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-field-muted">
                          Reine {colony.queenKnown ? "connue" : "non renseignée"}
                        </p>
                      </div>
                      <StatusBadge
                        label={labelForColonyStatus(colony.status)}
                        tone="active"
                      />
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-5">
                <StatePanel
                  detail="La ruche peut exister au stock ou en maintenance sans colonie active."
                  kind="empty"
                  label="Aucune colonie"
                  title="Pas de vivant rattaché"
                />
              </div>
            )}
          </section>
        </div>
      </main>
    </AppShell>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-cream-300 bg-white p-4">
      <p className="text-xs font-black uppercase text-amber-800">{label}</p>
      <p className="mt-2 text-sm font-bold leading-6 text-slate-800">{value}</p>
    </div>
  );
}

function QuickLink({
  detail,
  href,
  label,
  tone = "secondary",
}: {
  detail: string;
  href: string;
  label: string;
  tone?: "primary" | "secondary";
}) {
  const className =
    tone === "primary"
      ? "border-forest-900 bg-forest-900 text-white hover:bg-forest-800"
      : "border-cream-300 bg-white text-slate-800 hover:border-amber-300";

  return (
    <Link
      className={`min-h-16 rounded-2xl border p-4 transition hover:shadow-field focus-ring ${className}`}
      href={href}
    >
      <span className="block text-sm font-black">{label}</span>
      <span className="mt-1 block text-xs font-bold opacity-80">{detail}</span>
    </Link>
  );
}

function labelForHiveStatus(status: HiveDetail["status"]) {
  const labels = {
    ACTIVE: "Active",
    STORED: "Au stock",
    MAINTENANCE: "Maintenance",
    ARCHIVED: "Archivée",
  } satisfies Record<HiveDetail["status"], string>;

  return labels[status];
}

function labelForColonyStatus(status: HiveDetail["colonies"][number]["status"]) {
  const labels = {
    ACTIVE: "Active",
    WEAK: "Faible",
    LOST: "Perdue",
    ARCHIVED: "Archivée",
  } satisfies Record<HiveDetail["colonies"][number]["status"], string>;

  return labels[status];
}
