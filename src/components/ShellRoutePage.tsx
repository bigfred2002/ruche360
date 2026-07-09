import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { DecorativeImage } from "./DecorativeImage";
import { DynamicStatesPreview } from "./DynamicStatesPreview";
import { ResponsiveWorkflowsPreview } from "./ResponsiveWorkflowsPreview";
import { StatePanel } from "./StatePanel";
import { StatusBadge } from "./StatusBadge";

type ShellRoutePageProps = {
  currentPath: string;
  eyebrow: string;
  highlights: string[];
  title: string;
  visual?: {
    alt: string;
    aspect?: "wide" | "card" | "square";
    src: string;
  };
};

export function ShellRoutePage({
  currentPath,
  eyebrow,
  highlights,
  title,
  visual,
}: ShellRoutePageProps) {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation(currentPath);

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-5 lg:space-y-6">
          <section className="surface-panel rounded-3xl p-5 backdrop-blur sm:p-7 lg:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge label="Module préparé" tone="preview" />
              <StatusBadge label="Lecture statique" tone="soon" />
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
              <div>
                <p className="section-kicker">{eyebrow}</p>
                <h1 className="mt-2 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
                  {title}
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
                  Une page courte pour cadrer le futur module, garder la
                  navigation utilisable et éviter de suggérer une fonction
                  métier déjà active.
                </p>
              </div>
              <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                <p className="text-sm font-black uppercase tracking-wide text-amber-800">
                  État du module
                </p>
                <p className="mt-2 text-2xl font-black text-slate-950">
                  Préparation
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-650">
                  Route active, actions métier non branchées.
                </p>
              </div>
            </div>
            {visual ? (
              <DecorativeImage
                alt={visual.alt}
                aspect={visual.aspect}
                className="mt-6"
                priority
                src={visual.src}
              />
            ) : null}
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {highlights.slice(0, 3).map((highlight, index) => (
              <article
                className="surface-panel rounded-2xl p-4"
                key={highlight}
              >
                <StatusBadge label={`Repère ${index + 1}`} tone="soon" />
                <p className="mt-3 text-base font-black text-slate-950">
                  {highlight}
                </p>
                <p className="mt-2 text-sm leading-6 text-field-muted">
                  Repère de parcours, sans bouton ni action opérationnelle.
                </p>
              </article>
            ))}
          </section>

          <StatePanel
            detail="Les contenus réels, permissions fines et formulaires seront ajoutés dans des lots dédiés."
            kind="coming-soon"
            label="À venir"
            title="Module volontairement non opérationnel"
          />

          <details className="rounded-3xl border border-cream-300 bg-white shadow-field">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 focus-ring sm:px-6 [&::-webkit-details-marker]:hidden">
              <span>
                <span className="section-kicker">Conception</span>
                <span className="mt-1 block text-xl font-black text-slate-950">
                  Parcours et états prévus
                </span>
                <span className="mt-1 block text-sm leading-6 text-slate-650">
                  Références UX conservées en support, sans alourdir le module.
                </span>
              </span>
              <span className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-cream-300 bg-cream-50 px-4 text-sm font-black text-slate-700">
                Voir
              </span>
            </summary>
            <div className="space-y-6 border-t border-cream-300 px-5 py-5 sm:px-6">
              <ResponsiveWorkflowsPreview />
              <DynamicStatesPreview />
            </div>
          </details>
        </div>
      </div>
    </AppShell>
  );
}
