export const permissionCodes = [
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
] as const;

export type PermissionCode = (typeof permissionCodes)[number];

export type PermissionDefinition = {
  code: PermissionCode;
  label: string;
  description: string;
};

export const permissions: PermissionDefinition[] = [
  {
    code: "organization.manage",
    label: "Gérer l'organisation",
    description: "Modifier l'organisation et ses paramètres.",
  },
  { code: "users.manage", label: "Gérer les utilisateurs", description: "Inviter, retirer et modifier les utilisateurs." },
  { code: "roles.manage", label: "Gérer les rôles", description: "Attribuer les rôles et permissions." },
  { code: "modules.manage", label: "Gérer les modules", description: "Activer ou désactiver les modules." },
  { code: "apiaries.read", label: "Lire les ruchers", description: "Consulter les ruchers." },
  { code: "apiaries.write", label: "Modifier les ruchers", description: "Créer et modifier les ruchers." },
  { code: "hives.read", label: "Lire les ruches", description: "Consulter les ruches." },
  { code: "hives.write", label: "Modifier les ruches", description: "Créer et modifier les ruches." },
  { code: "colonies.read", label: "Lire les colonies", description: "Consulter les colonies." },
  { code: "colonies.write", label: "Modifier les colonies", description: "Créer et modifier les colonies." },
  { code: "visits.read", label: "Lire les visites", description: "Consulter les visites." },
  { code: "visits.write", label: "Modifier les visites", description: "Créer et modifier les visites." },
  { code: "tasks.read", label: "Lire les tâches", description: "Consulter les tâches." },
  { code: "tasks.write", label: "Modifier les tâches", description: "Créer et modifier les tâches." },
  { code: "health.read", label: "Lire le sanitaire", description: "Consulter le suivi sanitaire." },
  { code: "health.write", label: "Modifier le sanitaire", description: "Créer et modifier les observations sanitaires." },
  { code: "knowledge.read", label: "Lire la connaissance", description: "Consulter la base de connaissance." },
  { code: "knowledge.write", label: "Modifier la connaissance", description: "Créer et modifier les contenus de connaissance." },
  { code: "documents.read", label: "Lire les documents", description: "Consulter les documents." },
  { code: "documents.write", label: "Modifier les documents", description: "Ajouter et modifier les documents." },
  { code: "contacts.read", label: "Lire les contacts", description: "Consulter les contacts." },
  { code: "contacts.write", label: "Modifier les contacts", description: "Créer et modifier les contacts." },
  { code: "harvests.read", label: "Lire les récoltes", description: "Consulter les récoltes." },
  { code: "harvests.write", label: "Modifier les récoltes", description: "Créer et modifier les récoltes." },
];
