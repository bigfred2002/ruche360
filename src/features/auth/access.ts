import type {
  AuthIdentity,
  OrganizationAccess,
  OrganizationAccount,
  OrganizationMembership,
} from "./types";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isActiveUser(identity: AuthIdentity): boolean {
  return identity.user.status === "ACTIVE";
}

export function isActiveMembership(membership: OrganizationMembership): boolean {
  return membership.status === "ACTIVE";
}

export function isActiveOrganization(organization: OrganizationAccount): boolean {
  return organization.status === "ACTIVE";
}

export function findActiveMembership(
  identity: AuthIdentity,
  organizationId: string,
): OrganizationMembership | null {
  return (
    identity.memberships.find(
      (membership) =>
        membership.organizationId === organizationId && isActiveMembership(membership),
    ) ?? null
  );
}

export function canAccessOrganization(access: OrganizationAccess): boolean {
  return isActiveOrganization(access.organization) && isActiveMembership(access.membership);
}
