import { AppShell } from "@/components/AppShell";
import { DashboardCard } from "@/components/DashboardCard";
import { DynamicStatesPreview } from "@/components/DynamicStatesPreview";
import { MemberModulePreferencesPreview } from "@/components/MemberModulePreferencesPreview";
import { ModuleCard } from "@/components/ModuleCard";
import {
  createDashboardCard,
  createModuleCard,
  createNavigationItems,
  getModulePresentation,
} from "@/components/modulePresentation";
import { StatusBadge } from "@/components/StatusBadge";
import {
  activeUserContextScenario,
  userContextScenarios,
} from "@/components/userContextScenarios";
import {
  createEnabledModuleSet,
  createPermissionSet,
  getVisibleModuleEntries,
} from "@/features/rbac";

const activeScenario = activeUserContextScenario;

const activeEnabledModules = createEnabledModuleSet(activeScenario.enabledModules);
const activePermissions = createPermissionSet(activeScenario.permissions);

const activeCatalogEntries = getVisibleModuleEntries(
  activeEnabledModules,
  activePermissions,
  "catalog",
);

const dashboardCards = activeScenario.dashboardModules
  .map((code) => activeCatalogEntries.find((entry) => entry.code === code))
  .filter((entry) => entry !== undefined)
  .map(createDashboardCard);

const activeModules = activeScenario.featuredModules
  .map((code) => activeCatalogEntries.find((entry) => entry.code === code))
  .filter((entry) => entry !== undefined)
  .map(createModuleCard);

const mobileNavigationItems = createNavigationItems(
  getVisibleModuleEntries(activeEnabledModules, activePermissions, "mobile"),
  "mobile",
);

const desktopNavigationItems = createNavigationItems(
  getVisibleModuleEntries(activeEnabledModules, activePermissions, "desktop"),
  "desktop",
);

const scenarioSummaries = userContextScenarios.map((scenario) => ({
  ...scenario,
  modulePreview: scenario.dashboardModules.slice(0, 4).map((code) => ({
    code,
    label: getModulePresentation(code).shortLabel ?? code,
    icon: getModulePresentation(code).icon,
  })),
}));

export default function Home() {
  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <section className="grid gap-6 xl:grid-cols-[1fr_22rem]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-cream-300 bg-white/86 p-5 shadow-field backdrop-blur sm:p-7 lg:p-8">
              <StatusBadge label="Cockpit apicole modulaire" />
              <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-end">
                <div>
                  <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
                    Bonjour, {activeScenario.userName}
                  </h1>
                  <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-700">
                    {activeScenario.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <StatusBadge
                      label={activeScenario.organizationType}
                      tone="preview"
                    />
                    <StatusBadge label={activeScenario.role} tone="amber" />
                  </div>
                </div>
                <div className="rounded-3xl bg-gradient-amber p-5 text-white shadow-amber">
                  <p className="text-sm font-bold uppercase tracking-wide text-amber-100">
                    {activeScenario.seasonLabel}
                  </p>
                  <p className="mt-3 text-3xl font-black">
                    {activeScenario.seasonMetric}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-amber-50">
                    {activeScenario.seasonDetail}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {dashboardCards.slice(0, 4).map((card) => (
                <DashboardCard key={card.title} {...card} />
              ))}
            </div>

            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <article className="apiary-visual min-h-72 overflow-hidden rounded-3xl p-6 text-white shadow-field-lg">
                <div className="flex h-full min-h-60 flex-col justify-end">
                  <StatusBadge label="Inspirations du jour" tone="amber" />
                  <h2 className="mt-5 max-w-xl text-3xl font-black leading-tight sm:text-4xl">
                    Observer vite, décider calmement.
                  </h2>
                  <p className="mt-3 max-w-lg text-base leading-7 text-cream-50">
                    Une présence plus visuelle, inspirée des exports Stitch,
                    sans contenu dynamique ni activation métier.
                  </p>
                </div>
              </article>

              <section className="rounded-3xl border border-cream-300 bg-white p-5 shadow-field">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black uppercase tracking-wide text-amber-800">
                      À surveiller
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-slate-950">
                      Priorités terrain
                    </h2>
                  </div>
                  <StatusBadge label="Preview" tone="soon" />
                </div>
                <div className="mt-5 space-y-3">
                  {activeScenario.watchItems.map((item) => (
                    <article
                      className="rounded-2xl border border-cream-300 bg-cream-50 p-4"
                      key={item.title}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-base font-black text-slate-950">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-slate-650">
                            {item.detail}
                          </p>
                        </div>
                        <StatusBadge
                          label={item.label}
                          tone={
                            item.accent === "red"
                              ? "alert"
                              : item.accent === "amber"
                                ? "amber"
                                : "active"
                          }
                        />
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </section>

            <section>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-amber-800">
                    Contextes simulés
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-slate-950">
                    Variations de cockpit prévues
                  </h2>
                </div>
                <StatusBadge label="Statique" tone="preview" />
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {scenarioSummaries.map((scenario) => (
                  <article
                    className={`rounded-2xl border p-4 shadow-field ${
                      scenario.id === activeScenario.id
                        ? "border-amber-300 bg-amber-50"
                        : "border-cream-300 bg-white"
                    }`}
                    key={scenario.id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-black text-slate-950">
                          {scenario.label}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-slate-650">
                          {scenario.organization}
                        </p>
                      </div>
                      <StatusBadge
                        label={
                          scenario.id === activeScenario.id ? "Actif" : "Exemple"
                        }
                        tone={
                          scenario.id === activeScenario.id ? "amber" : "preview"
                        }
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-650">
                      {scenario.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {scenario.modulePreview.map((module) => (
                        <span
                          className="inline-flex min-h-8 items-center gap-2 rounded-full border border-cream-300 bg-white px-3 text-xs font-bold text-slate-700"
                          key={module.code}
                        >
                          <span className="text-[10px] font-black text-amber-800">
                            {module.icon}
                          </span>
                          {module.label}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <MemberModulePreferencesPreview scenario={activeScenario} />

            <DynamicStatesPreview />

            <section>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-amber-800">
                    Modules visibles
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-slate-950">
                    Surfaces statiques du cockpit
                  </h2>
                </div>
                <StatusBadge label="Lecture seule" tone="preview" />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {activeModules.map((card) => (
                  <ModuleCard key={card.title} {...card} />
                ))}
              </div>
            </section>
          </div>

          <aside className="hidden space-y-5 xl:block">
            <section className="rounded-3xl border border-cream-300 bg-cream-200 p-5 shadow-field">
              <p className="text-sm font-black uppercase tracking-wide text-amber-800">
                Catalogue modules
              </p>
              <h2 className="mt-3 text-2xl font-black leading-tight text-slate-950">
                Les options restent rangées hors du cockpit.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-650">
                IA, capteurs, balance, météo et autres modules prévus sont
                conservés dans la registry. Ils seront exposés dans un futur
                catalogue dédié, sans encombrer l&apos;accueil terrain.
              </p>
              <div className="mt-5 rounded-2xl border border-dashed border-amber-300 bg-white/70 p-4">
                <p className="text-sm font-black text-slate-950">
                  Futur écran prévu
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Actif · désactivé · à venir · sans permission
                </p>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl bg-gradient-amber p-6 text-white shadow-amber">
              <p className="text-sm font-black uppercase tracking-wide text-amber-100">
                Preview
              </p>
              <h2 className="mt-3 text-2xl font-black leading-tight">
                Un shell plus proche des maquettes Stitch.
              </h2>
              <p className="mt-3 text-sm leading-6 text-amber-50">
                Couleurs, profondeur et rythme visuel ont été renforcés sans
                activer de fonctionnalité.
              </p>
            </section>
          </aside>
        </section>
      </div>
    </AppShell>
  );
}
