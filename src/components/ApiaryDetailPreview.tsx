import Link from "next/link";

import type { ApiaryDetail } from "@/features/apiary";

import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { DetailCoherencePanel } from "./DetailCoherencePanel";
import { StatePanel } from "./StatePanel";
import { StatusBadge } from "./StatusBadge";

type ApiaryDetailPreviewProps = {
  apiary: ApiaryDetail;
};

export function ApiaryDetailPreview({ apiary }: ApiaryDetailPreviewProps) {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation("/apiaries");
  const activeHives = apiary.hives.filter((hive) => hive.status === "ACTIVE");
  const storedHives = apiary.hives.filter((hive) => hive.status === "STORED");
  const maintenanceHives = apiary.hives.filter(
    (hive) => hive.status === "MAINTENANCE",
  );

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <main className="mx-auto w-full max-w-6xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-5 lg:space-y-6">
          <Link
            className="inline-flex min-h-11 items-center rounded-2xl border border-cream-300 bg-white px-4 text-sm font-black text-slate-800 transition hover:border-amber-300 hover:text-amber-900 focus-ring"
            href="/apiaries"
          >
            Retour aux ruchers
          </Link>

          <section className="surface-panel rounded-3xl p-5 sm:p-7 lg:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge label={labelForApiaryStatus(apiary.status)} tone="active" />
              <StatusBadge label="Lecture seule" tone="preview" />
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
              <div>
                <p className="section-kicker">Fiche rucher</p>
                <h1 className="mt-2 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
                  {apiary.name}
                </h1>
                <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
                  {apiary.description ??
                    "Vue courte du site apicole, pensée pour préparer une visite sans surcharge."}
                </p>
              </div>
              <div className="rounded-3xl border border-sage-200 bg-sage-50 p-5">
                <p className="text-sm font-black uppercase text-forest-900">
                  État du site
                </p>
                <p className="mt-2 text-3xl font-black text-slate-950">
                  {apiary.activeHiveCount}
                </p>
                <p className="mt-1 text-sm font-bold leading-6 text-field-muted">
                  ruche(s) active(s) sur {apiary.hiveCount} ruche(s)
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-3 sm:grid-cols-3">
            <QuickLink
              detail="Préparer une observation courte"
              href="/visits"
              label="Visite"
              tone="primary"
            />
            <QuickLink
              detail="Garder une suite visible"
              href="/tasks"
              label="Tâche"
            />
            <QuickLink
              detail="Vérifier caisse et outils"
              href="/equipment"
              label="Matériel"
            />
          </section>

          <section className="grid gap-3 sm:grid-cols-3">
            <MetricCard label="Actives" value={activeHives.length} />
            <MetricCard label="Au stock" value={storedHives.length} />
            <MetricCard label="Maintenance" value={maintenanceHives.length} />
          </section>

          <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <article className="surface-panel rounded-3xl p-5 sm:p-6">
              <p className="section-kicker">Terrain</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Repères pratiques
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <InfoBlock
                  label="Emplacement"
                  value={apiary.locationDescription ?? "Non précisé"}
                />
                <InfoBlock
                  label="Accès"
                  value={apiary.accessNotes ?? "Aucune note d'accès"}
                />
              </div>
            </article>

            <DetailCoherencePanel
              kicker="Suite simple"
              links={[
                { href: "/visits", label: "Aller aux visites", tone: "primary" },
                { href: "/transhumance", label: "Voir mouvements" },
                { href: "/equipment", label: "Vérifier matériel" },
              ]}
              limits={[
                "Pas de GPS actif ni de partage fin par rucher dans cette fiche.",
                "Le rucher reste le site; les ruches portent les mouvements.",
              ]}
              nextAction="Ouvrir une ruche active pour préparer une visite ou vérifier son état courant."
              title="Prochain geste"
            />
          </section>

          <section className="surface-panel rounded-3xl p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="section-kicker">Ruches du site</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Inventaire lisible
                </h2>
              </div>
              <StatusBadge label={`${apiary.hives.length} ruche(s)`} tone="preview" />
            </div>

            {apiary.hives.length > 0 ? (
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {apiary.hives.map((hive) => (
                  <Link
                    className="rounded-2xl border border-cream-300 bg-white p-4 transition hover:border-amber-300 hover:shadow-field focus-ring"
                    href={`/hives/${hive.id}`}
                    key={hive.id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-black text-slate-950">
                          {hive.fieldIdentifier}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-field-muted">
                          {hive.hiveType ?? "Type non précisé"}
                        </p>
                      </div>
                      <StatusBadge label={labelForHiveStatus(hive.status)} tone="active" />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <MetricPill label="Colonies" value={hive.colonyCount} />
                      <MetricPill label="Actives" value={hive.activeColonyCount} />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-5">
                <StatePanel
                  detail="Ajoute une ruche depuis la liste des ruchers pour démarrer une visite."
                  kind="empty"
                  label="Aucune ruche"
                  title="Le rucher est prêt, il manque la ruche"
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

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="surface-muted rounded-2xl p-4">
      <p className="text-xs font-black uppercase text-slate-650">{label}</p>
      <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
    </article>
  );
}

function MetricPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-cream-300 bg-cream-50 p-3">
      <p className="text-xs font-black uppercase text-slate-600">{label}</p>
      <p className="mt-1 text-xl font-black text-slate-950">{value}</p>
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

function labelForApiaryStatus(status: ApiaryDetail["status"]) {
  const labels = {
    ACTIVE: "Actif",
    PAUSED: "En pause",
    ARCHIVED: "Archivé",
  } satisfies Record<ApiaryDetail["status"], string>;

  return labels[status];
}

function labelForHiveStatus(status: ApiaryDetail["hives"][number]["status"]) {
  const labels = {
    ACTIVE: "Active",
    STORED: "Au stock",
    MAINTENANCE: "Maintenance",
    ARCHIVED: "Archivée",
  } satisfies Record<ApiaryDetail["hives"][number]["status"], string>;

  return labels[status];
}
