import { permissionCodes, type PermissionCode } from "./permissions";

export const roleCodes = [
  "owner",
  "admin",
  "apiary_manager",
  "operator",
  "reader",
  "health_referent",
] as const;

export type RoleCode = (typeof roleCodes)[number];

export type RoleDefinition = {
  code: RoleCode;
  label: string;
  description: string;
  permissions: PermissionCode[];
};

const readOnlyPermissions = permissionCodes.filter((permission) => permission.endsWith(".read"));

export const roles: RoleDefinition[] = [
  {
    code: "owner",
    label: "Propriétaire",
    description: "Contrôle complet de l'organisation.",
    permissions: [...permissionCodes],
  },
  {
    code: "admin",
    label: "Administrateur",
    description: "Gestion opérationnelle large, hors transfert de propriété.",
    permissions: permissionCodes.filter((permission) => permission !== "organization.manage"),
  },
  {
    code: "apiary_manager",
    label: "Gestionnaire rucher",
    description: "Gestion des ruchers, ruches, colonies, visites et tâches.",
    permissions: [
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
    ],
  },
  {
    code: "operator",
    label: "Intervenant",
    description: "Saisie de visites, observations et tâches assignées.",
    permissions: ["apiaries.read", "hives.read", "colonies.read", "visits.write", "tasks.read", "tasks.write"],
  },
  {
    code: "reader",
    label: "Lecteur",
    description: "Consultation sans modification.",
    permissions: [...readOnlyPermissions],
  },
  {
    code: "health_referent",
    label: "Référent sanitaire",
    description: "Accès renforcé aux suivis sanitaire, varroa et frelon.",
    permissions: ["apiaries.read", "hives.read", "colonies.read", "health.read", "health.write"],
  },
];
