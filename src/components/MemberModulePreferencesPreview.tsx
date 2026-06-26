import {
  moduleRegistry,
  type ModuleCode,
  type ModuleRegistryEntry,
} from "@/features/rbac";

import { getModulePresentation } from "./modulePresentation";
import { StatusBadge } from "./StatusBadge";
import type { UserContextScenario } from "./userContextScenarios";

type MemberModulePreferencesPreviewProps = {
  scenario: UserContextScenario;
};

type MemberModuleState = {
  entry: ModuleRegistryEntry;
  icon: string;
  memberEnabled: boolean;
  missingPermission: boolean;
  organizationEnabled: boolean;
  shortLabel: string;
  state: "visible" | "member-hidden" | "missing-permission" | "organization-disabled";
};

const organizationEnabledModules = new Set<ModuleCode>(
  moduleRegistry
    .filter((entry) => entry.availability === "ACTIVE" && entry.defaultEnabled)
    .map((entry) => entry.code),
);

const memberPreviewModules = moduleRegistry.filter(
  (entry) => entry.availability === "ACTIVE",
);

function getModuleState(
  entry: ModuleRegistryEntry,
  scenario: UserContextScenario,
): MemberModuleState {
  const presentation = getModulePresentation(entry.code);
  const organizationEnabled = organizationEnabledModules.has(entry.code);
  const memberEnabled = scenario.enabledModules.includes(entry.code);
  const missingPermission =
    memberEnabled &&
    entry.requiredPermissions.length > 0 &&
    !entry.requiredPermissions.some((permission) =>
      scenario.permissions.includes(permission),
    );

  const state = !organizationEnabled
    ? "organization-disabled"
    : !memberEnabled
      ? "member-hidden"
      : missingPermission
        ? "missing-permission"
        : "visible";

  return {
    entry,
    icon: presentation.icon,
    memberEnabled,
    missingPermission,
    organizationEnabled,
    shortLabel: presentation.shortLabel ?? entry.label,
    state,
  };
}

function getStateBadge(state: MemberModuleState["state"]) {
  if (state === "visible") {
    return { label: "Visible", tone: "active" as const };
  }

  if (state === "missing-permission") {
    return { label: "Sans permission", tone: "alert" as const };
  }

  if (state === "organization-disabled") {
    return { label: "Org. inactive", tone: "muted" as const };
  }

  return { label: "Masqué membre", tone: "preview" as const };
}

export function MemberModulePreferencesPreview({
  scenario,
}: MemberModulePreferencesPreviewProps) {
  const moduleStates = memberPreviewModules.map((entry) =>
    getModuleState(entry, scenario),
  );
  const visibleCount = moduleStates.filter((module) => module.state === "visible").length;
  const hiddenCount = moduleStates.filter(
    (module) => module.state === "member-hidden",
  ).length;
  const futureCount = moduleRegistry.filter(
    (entry) => entry.availability !== "ACTIVE",
  ).length;

  return (
    <section className="rounded-3xl border border-cream-300 bg-white p-5 shadow-field sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-amber-800">
            Profil membre
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Modules visibles pour {scenario.userName}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-650">
            Prévisualisation statique du futur réglage par adhésion: seuls les
            modules actifs dans l&apos;organisation peuvent être visibles, puis
            les permissions du rôle limitent les actions.
          </p>
        </div>
        <StatusBadge label="Prototype statique" tone="preview" />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-sage-200 bg-sage-100 p-4">
          <p className="text-2xl font-black text-forest-900">{visibleCount}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-forest-900">
            Modules visibles
          </p>
        </div>
        <div className="rounded-2xl border border-cream-300 bg-cream-50 p-4">
          <p className="text-2xl font-black text-slate-950">{hiddenCount}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-650">
            Masqués pour ce membre
          </p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-2xl font-black text-amber-950">{futureCount}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-amber-900">
            Options non proposées
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {moduleStates.map((module) => {
          const badge = getStateBadge(module.state);

          return (
            <article
              className="rounded-2xl border border-cream-300 bg-cream-50 p-4"
              key={module.entry.code}
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white text-xs font-black text-amber-900 shadow-sm"
                >
                  {module.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-black text-slate-950">
                        {module.shortLabel}
                      </h3>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                        {module.entry.label}
                      </p>
                    </div>
                    <StatusBadge label={badge.label} tone={badge.tone} />
                  </div>

                  <div className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
                    <div className="flex items-center gap-2 text-slate-650">
                      <span
                        className={`size-3 rounded-full ${
                          module.organizationEnabled ? "bg-forest-700" : "bg-stone-300"
                        }`}
                      />
                      Organisation
                    </div>
                    <div className="flex items-center gap-2 text-slate-650">
                      <span
                        className={`size-3 rounded-full ${
                          module.memberEnabled ? "bg-amber-500" : "bg-stone-300"
                        }`}
                      />
                      Membre
                    </div>
                    <div className="flex items-center gap-2 text-slate-650">
                      <span
                        className={`size-3 rounded-full ${
                          !module.missingPermission ? "bg-sage-500" : "bg-red-500"
                        }`}
                      />
                      Permissions
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-4">
        <p className="text-sm font-black text-slate-950">
          La désactivation masque les écrans, mais ne supprime aucune donnée.
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-650">
          Les modules IA, IoT et connectés restent hors de ce choix tant qu’un
          lot dédié ne les active pas côté organisation.
        </p>
      </div>
    </section>
  );
}
