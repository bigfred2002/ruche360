import {
  createEnabledModuleSet,
  createPermissionSet,
  getVisibleModuleEntries,
} from "@/features/rbac";

import { createNavigationItems, type NavigationItem } from "./modulePresentation";
import { activeUserContextScenario } from "./userContextScenarios";

export type AppNavigation = {
  desktopNavigationItems: NavigationItem[];
  mobileNavigationItems: NavigationItem[];
};

export function createAppNavigation(currentPath = "/"): AppNavigation {
  const enabledModules = createEnabledModuleSet(activeUserContextScenario.enabledModules);
  const permissions = createPermissionSet(activeUserContextScenario.permissions);

  return {
    desktopNavigationItems: createNavigationItems(
      getVisibleModuleEntries(enabledModules, permissions, "desktop"),
      "desktop",
      currentPath,
    ),
    mobileNavigationItems: createNavigationItems(
      getVisibleModuleEntries(enabledModules, permissions, "mobile"),
      "mobile",
      currentPath,
    ),
  };
}
