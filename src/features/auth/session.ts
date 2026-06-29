import {
  canUseModulePermission,
  createEffectiveModuleSet,
  createPermissionSet,
  type ModuleActivationRecord,
  type ModuleCode,
  type PermissionCode,
} from "@/features/rbac";

import {
  canAccessOrganization,
  isActiveUser,
} from "./access";
import type {
  AuthIdentity,
  OrganizationAccess,
  OrganizationAccount,
  OrganizationMembership,
} from "./types";

export type SessionOrganizationAccess = OrganizationAccess & {
  permissions: PermissionCode[];
  organizationModules: ModuleActivationRecord[];
  membershipModulePreferences?: ModuleActivationRecord[];
};

export type ApplicationSession = {
  identity: AuthIdentity;
  activeOrganizationId: string | null;
  organizations: SessionOrganizationAccess[];
};

export type ActiveSessionScope = {
  userId: string;
  organizationId: string;
  membershipId: string;
  enabledModules: ModuleCode[];
  permissions: PermissionCode[];
};

export function createApplicationSession(input: {
  user: AuthIdentity["user"];
  memberships: OrganizationMembership[];
  organizations: OrganizationAccount[];
  permissionsByMembershipId?: Record<string, PermissionCode[]>;
  organizationModulesByOrganizationId?: Record<string, ModuleActivationRecord[]>;
  membershipModulePreferencesByMembershipId?: Record<string, ModuleActivationRecord[]>;
  activeOrganizationId?: string | null;
}): ApplicationSession {
  const identity: AuthIdentity = {
    user: input.user,
    memberships: input.memberships,
  };
  const organizations = input.organizations.flatMap((organization) => {
    const membership = input.memberships.find(
      (candidate) => candidate.organizationId === organization.id,
    );

    if (!membership) {
      return [];
    }

    return [
      {
        organization,
        membership,
        permissions: input.permissionsByMembershipId?.[membership.id] ?? [],
        organizationModules:
          input.organizationModulesByOrganizationId?.[organization.id] ?? [],
        membershipModulePreferences:
          input.membershipModulePreferencesByMembershipId?.[membership.id] ?? [],
      },
    ];
  });

  return {
    identity,
    activeOrganizationId:
      input.activeOrganizationId ?? findDefaultActiveOrganizationId(identity, organizations),
    organizations,
  };
}

export function getActiveSessionOrganization(
  session: ApplicationSession,
): SessionOrganizationAccess | null {
  if (!isActiveUser(session.identity) || !session.activeOrganizationId) {
    return null;
  }

  const access =
    session.organizations.find(
      (candidate) => candidate.organization.id === session.activeOrganizationId,
    ) ?? null;

  if (!access || !canAccessOrganization(access)) {
    return null;
  }

  return access;
}

export function getActiveSessionScope(session: ApplicationSession): ActiveSessionScope | null {
  const activeOrganization = getActiveSessionOrganization(session);

  if (!activeOrganization) {
    return null;
  }

  return {
    userId: session.identity.user.id,
    organizationId: activeOrganization.organization.id,
    membershipId: activeOrganization.membership.id,
    enabledModules: [
      ...createEffectiveModuleSet(
        activeOrganization.organizationModules,
        activeOrganization.membershipModulePreferences,
      ),
    ],
    permissions: [...createPermissionSet(activeOrganization.permissions)],
  };
}

export function canUseSessionModulePermission(
  session: ApplicationSession,
  module: ModuleCode,
  permission: PermissionCode,
): boolean {
  const activeOrganization = getActiveSessionOrganization(session);

  if (!activeOrganization) {
    return false;
  }

  const enabledModules = createEffectiveModuleSet(
    activeOrganization.organizationModules,
    activeOrganization.membershipModulePreferences,
  );
  const permissions = createPermissionSet(activeOrganization.permissions);

  return canUseModulePermission(permissions, enabledModules, module, permission);
}

function findDefaultActiveOrganizationId(
  identity: AuthIdentity,
  organizations: SessionOrganizationAccess[],
): string | null {
  if (!isActiveUser(identity)) {
    return null;
  }

  return organizations.find(canAccessOrganization)?.organization.id ?? null;
}
