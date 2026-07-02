import {
  createEnabledModuleSet,
  createPermissionSet,
  getVisibleModuleEntries,
  type PermissionCode,
} from "@/features/rbac";

import { createNavigationItems, type NavigationItem } from "./modulePresentation";
import { activeUserContextScenario } from "./userContextScenarios";

export type AppNavigation = {
  desktopNavigationItems: NavigationItem[];
  mobileNavigationItems: NavigationItem[];
};

const adminNavigationPermissions = [
  "organization.manage",
  "users.manage",
  "roles.manage",
  "modules.manage",
] satisfies PermissionCode[];

export function createAppNavigation(currentPath = "/"): AppNavigation {
  const enabledModules = createEnabledModuleSet(activeUserContextScenario.enabledModules);
  const permissions = createPermissionSet(activeUserContextScenario.permissions);

  return {
    desktopNavigationItems: withAdministrationItem(
      createNavigationItems(
        getVisibleModuleEntries(enabledModules, permissions, "desktop"),
        "desktop",
        currentPath,
      ),
      currentPath,
      adminNavigationPermissions.some((permission) => permissions.has(permission)),
    ),
    mobileNavigationItems: createNavigationItems(
      getVisibleModuleEntries(enabledModules, permissions, "mobile"),
      "mobile",
      currentPath,
    ),
  };
}

function withAdministrationItem(
  items: NavigationItem[],
  currentPath: string,
  canSeeAdministration: boolean,
): NavigationItem[] {
  if (!canSeeAdministration && currentPath !== "/admin") {
    return items;
  }

  const modulesIndex = items.findIndex((item) => item.href === "/modules");
  const adminItem: NavigationItem = {
    active: currentPath === "/admin",
    href: "/admin",
    label: "Admin",
    marker: "Ad",
    route: "/admin",
  };

  if (modulesIndex === -1) {
    return [...items, adminItem];
  }

  return [
    ...items.slice(0, modulesIndex),
    adminItem,
    ...items.slice(modulesIndex),
  ];
}
