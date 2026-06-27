import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { DynamicStatesPreview } from "./DynamicStatesPreview";
import { ResponsiveWorkflowsPreview } from "./ResponsiveWorkflowsPreview";
import { StatePanel } from "./StatePanel";
import { StatusBadge } from "./StatusBadge";

type ShellRoutePageProps = {
  currentPath: string;
  eyebrow: string;
  highlights: string[];
  title: string;
};

export function ShellRoutePage({
  currentPath,
  eyebrow,
  highlights,
  title,
}: ShellRoutePageProps) {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation(currentPath);

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-6">
          <section className="surface-panel rounded-3xl p-5 backdrop-blur sm:p-7 lg:p-8">
            <StatusBadge label="Écran shell" tone="preview" />
            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-end">
              <div>
                <p className="section-kicker">
                  {eyebrow}
                </p>
                <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
                  {title}
                </h1>
                <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-700">
                  Cette page active la navigation prévue, mais reste une surface
                  statique. Aucun formulaire, CRUD, API ou traitement métier
                  n&apos;est branché dans ce lot.
                </p>
              </div>
              <div className="rounded-3xl bg-gradient-amber p-5 text-white shadow-amber">
                <p className="text-sm font-bold uppercase tracking-wide text-amber-100">
                  Statut
                </p>
                <p className="mt-3 text-3xl font-black">Préparation</p>
                <p className="mt-2 text-sm leading-6 text-amber-50">
                  Route disponible, données et actions encore non fonctionnelles.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {highlights.map((highlight) => (
              <article
                className="surface-panel rounded-2xl p-4"
                key={highlight}
              >
                <StatusBadge label="Prévu" tone="soon" />
                <p className="mt-3 text-base font-black text-slate-950">
                  {highlight}
                </p>
                <p className="mt-2 text-sm leading-6 text-field-muted">
                  Élément de parcours affiché pour cadrer le futur écran.
                </p>
              </article>
            ))}
          </section>

          <StatePanel
            detail="Le contenu réel sera ajouté dans un lot dédié, avec ses validations et ses limites métier."
            kind="coming-soon"
            label="Route active"
            title="Navigation maintenant fonctionnelle"
          />

          <ResponsiveWorkflowsPreview />
          <DynamicStatesPreview />
        </div>
      </div>
    </AppShell>
  );
}
