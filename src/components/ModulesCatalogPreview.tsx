import {
  createEnabledModuleSet,
  createPermissionSet,
  moduleRegistry,
  type ModuleRegistryEntry,
} from "@/features/rbac";

import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { getModulePresentation } from "./modulePresentation";
import { StatePanel } from "./StatePanel";
import { StatusBadge } from "./StatusBadge";
import { activeUserContextScenario } from "./userContextScenarios";

type CatalogState = "active" | "no-permission" | "disabled" | "coming-soon";

const stateLabels: Record<
  CatalogState,
  { label: string; tone: "active" | "alert" | "muted" | "soon" }
> = {
  active: { label: "Actif", tone: "active" },
  "coming-soon": { label: "À venir", tone: "soon" },
  disabled: { label: "Désactivé", tone: "muted" },
  "no-permission": { label: "Sans permission", tone: "alert" },
};

function getCatalogState(entry: ModuleRegistryEntry): CatalogState {
  const enabledModules = createEnabledModuleSet(activeUserContextScenario.enabledModules);
  const permissions = createPermissionSet(activeUserContextScenario.permissions);

  if (entry.availability === "PLANNED") {
    return "coming-soon";
  }

  if (entry.availability === "DISABLED" || !enabledModules.has(entry.code)) {
    return "disabled";
  }

  if (
    entry.requiredPermissions.length > 0 &&
    !entry.requiredPermissions.some((permission) => permissions.has(permission))
  ) {
    return "no-permission";
  }

  return "active";
}

export function ModulesCatalogPreview() {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation("/modules");
  const catalogEntries = moduleRegistry.map((entry) => ({
    entry,
    presentation: getModulePresentation(entry.code),
    state: getCatalogState(entry),
  }));

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-6">
          <section className="surface-panel rounded-3xl p-5 sm:p-7 lg:p-8">
            <StatusBadge label="Catalogue statique" tone="preview" />
            <p className="section-kicker mt-5">Modules Rucher360</p>
            <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Catalogue des fonctions
            </h1>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-700">
              Cette page distingue les modules actifs, désactivés, à venir ou
              masqués par permissions. Elle ne déclenche aucune activation et ne
              modifie aucune donnée.
            </p>
          </section>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {catalogEntries.map(({ entry, presentation, state }) => {
              const badge = stateLabels[state];

              return (
                <article
                  className="motion-card surface-panel rounded-2xl p-5"
                  key={entry.code}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid size-11 place-items-center rounded-2xl bg-amber-50 text-sm font-black text-amber-900 ring-1 ring-amber-200">
                      {presentation.icon}
                    </span>
                    <StatusBadge label={badge.label} tone={badge.tone} />
                  </div>
                  <p className="section-kicker mt-5">{entry.category}</p>
                  <h2 className="mt-2 text-lg font-black text-slate-950">
                    {entry.label}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-field-muted">
                    {presentation.description}
                  </p>
                </article>
              );
            })}
          </div>

          <StatePanel
            detail="Le catalogue clarifie ce qui existe et ce qui reste prévu, sans exposer les modules futurs dans le cockpit principal."
            kind="coming-soon"
            label="Sans activation"
            title="Aucune action fonctionnelle"
          />
        </div>
      </div>
    </AppShell>
  );
}
