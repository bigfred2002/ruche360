import type { ModuleCode, PermissionCode } from "@/features/rbac";

import { createApplicationSession, type ApplicationSession } from "./session";

export const developmentSessionIds = {
  userId: "dev-user-apiculteur",
  organizationId: "dev-organization-rucher",
  membershipId: "dev-membership-owner",
  roleId: "dev-role-owner",
} as const;

export const developmentEnabledModules = [
  "organizations",
  "users_roles",
  "apiaries",
  "hives",
  "colonies",
  "visits",
  "tasks",
  "health",
  "varroa",
  "hornet",
  "knowledge",
  "contacts",
  "documents",
  "harvests",
  "equipment",
] satisfies ModuleCode[];

export const developmentPermissions = [
  "organization.manage",
  "users.manage",
  "roles.manage",
  "modules.manage",
  "apiaries.read",
  "apiaries.write",
  "hives.read",
  "hives.write",
  "colonies.read",
  "colonies.write",
  "visits.read",
  "visits.write",
  "tasks.read",
  "tasks.write",
  "health.read",
  "health.write",
  "knowledge.read",
  "knowledge.write",
  "documents.read",
  "documents.write",
  "contacts.read",
  "contacts.write",
  "harvests.read",
  "harvests.write",
  "equipment.read",
  "equipment.write",
  "equipment.manage",
] satisfies PermissionCode[];

export function createDevelopmentApplicationSession(): ApplicationSession {
  return createApplicationSession({
    user: {
      id: developmentSessionIds.userId,
      email: "dev-user.example.invalid",
      name: "Apiculteur de développement",
      status: "ACTIVE",
    },
    memberships: [
      {
        id: developmentSessionIds.membershipId,
        organizationId: developmentSessionIds.organizationId,
        userId: developmentSessionIds.userId,
        roleId: developmentSessionIds.roleId,
        status: "ACTIVE",
      },
    ],
    organizations: [
      {
        id: developmentSessionIds.organizationId,
        name: "Rucher de développement",
        status: "ACTIVE",
      },
    ],
    permissionsByMembershipId: {
      [developmentSessionIds.membershipId]: developmentPermissions,
    },
    organizationModulesByOrganizationId: {
      [developmentSessionIds.organizationId]: developmentEnabledModules.map((code) => ({
        code,
        status: "ENABLED",
      })),
    },
    activeOrganizationId: developmentSessionIds.organizationId,
  });
}
