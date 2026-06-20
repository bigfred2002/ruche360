export const userStatuses = ["ACTIVE", "INVITED", "DISABLED"] as const;
export const organizationStatuses = ["ACTIVE", "SUSPENDED", "ARCHIVED"] as const;
export const membershipStatuses = ["INVITED", "ACTIVE", "SUSPENDED"] as const;

export type UserStatus = (typeof userStatuses)[number];
export type OrganizationStatus = (typeof organizationStatuses)[number];
export type MembershipStatus = (typeof membershipStatuses)[number];

export type UserAccount = {
  id: string;
  email: string;
  name: string | null;
  status: UserStatus;
};

export type OrganizationAccount = {
  id: string;
  name: string;
  status: OrganizationStatus;
};

export type OrganizationMembership = {
  id: string;
  organizationId: string;
  userId: string;
  roleId: string | null;
  status: MembershipStatus;
};

export type AuthIdentity = {
  user: UserAccount;
  memberships: OrganizationMembership[];
};

export type OrganizationAccess = {
  organization: OrganizationAccount;
  membership: OrganizationMembership;
};
