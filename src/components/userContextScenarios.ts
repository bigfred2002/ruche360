import type { ModuleCode, PermissionCode } from "@/features/rbac";

export type UserContextScenario = {
  id: string;
  label: string;
  userName: string;
  role: string;
  organization: string;
  organizationType: string;
  description: string;
  seasonLabel: string;
  seasonMetric: string;
  seasonDetail: string;
  enabledModules: ModuleCode[];
  permissions: PermissionCode[];
  dashboardModules: ModuleCode[];
  featuredModules: ModuleCode[];
  watchItems: {
    accent: "amber" | "forest" | "red";
    label: string;
    title: string;
    detail: string;
  }[];
};

const baseModules = [
  "organizations",
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
  "equipment",
] satisfies ModuleCode[];

const baseReadPermissions = [
  "apiaries.read",
  "hives.read",
  "colonies.read",
  "visits.read",
  "tasks.read",
  "health.read",
  "knowledge.read",
  "contacts.read",
  "equipment.read",
] satisfies PermissionCode[];

export const userContextScenarios: UserContextScenario[] = [
  {
    id: "amateur",
    label: "Apiculteur amateur",
    userName: "Jean",
    role: "Responsable de son rucher",
    organization: "Rucher familial",
    organizationType: "Espace personnel",
    description: "Cockpit court, centré sur les ruchers, ruches et visites utiles au terrain.",
    seasonLabel: "Saison en préparation",
    seasonMetric: "Printemps",
    seasonDetail: "Profil simple avec modules essentiels et peu de bruit visuel.",
    enabledModules: baseModules,
    permissions: baseReadPermissions,
    dashboardModules: ["apiaries", "hives", "visits", "tasks"],
    featuredModules: ["health", "equipment", "knowledge", "contacts"],
    watchItems: [
      {
        accent: "amber",
        label: "Priorité",
        title: "Réserves faibles",
        detail: "Rucher du Vallon · Ruche #4",
      },
      {
        accent: "forest",
        label: "48h",
        title: "Varroa à recompter",
        detail: "Toutes les ruches · suivi manuel",
      },
      {
        accent: "red",
        label: "Signal",
        title: "Frelon observé",
        detail: "Rucher de la Forêt · observation",
      },
    ],
  },
  {
    id: "association",
    label: "Association",
    userName: "Claire",
    role: "Coordinatrice",
    organization: "Association des Ruchers Partagés",
    organizationType: "Organisation multi-utilisateurs",
    description: "Vue collective avec membres, documents et contacts davantage présents.",
    seasonLabel: "Vie associative",
    seasonMetric: "Collectif",
    seasonDetail: "Plus d'organisation, sans activer de partage fin par rucher.",
    enabledModules: [...baseModules, "users_roles", "documents"],
    permissions: [
      ...baseReadPermissions,
      "documents.read",
      "users.manage",
      "roles.manage",
      "organization.manage",
    ],
    dashboardModules: ["apiaries", "visits", "tasks", "contacts"],
    featuredModules: ["documents", "equipment", "knowledge", "contacts"],
    watchItems: [
      {
        accent: "forest",
        label: "Réunion",
        title: "Visite école à préparer",
        detail: "Rucher pédagogique · samedi",
      },
      {
        accent: "amber",
        label: "Membres",
        title: "Accès à vérifier",
        detail: "2 nouveaux bénévoles à cadrer",
      },
      {
        accent: "red",
        label: "Signal",
        title: "Observation sanitaire",
        detail: "Rucher partagé · lecture seule",
      },
    ],
  },
  {
    id: "professional",
    label: "Exploitation",
    userName: "Nadia",
    role: "Exploitante",
    organization: "Miellerie des Coteaux",
    organizationType: "Exploitation professionnelle",
    description: "Vue plus dense pour suivre ruchers, tâches, visites et récoltes simples.",
    seasonLabel: "Production",
    seasonMetric: "Miellée",
    seasonDetail: "Priorité aux opérations et au suivi de volume, sans comptabilité.",
    enabledModules: [...baseModules, "documents", "harvests"],
    permissions: [...baseReadPermissions, "documents.read", "harvests.read"],
    dashboardModules: ["apiaries", "hives", "visits", "harvests"],
    featuredModules: ["tasks", "equipment", "health", "harvests"],
    watchItems: [
      {
        accent: "amber",
        label: "À faire",
        title: "Hausse à poser",
        detail: "Rucher des Acacias · 12 ruches",
      },
      {
        accent: "forest",
        label: "Récolte",
        title: "Maturateur à réserver",
        detail: "Lot printemps · préparation",
      },
      {
        accent: "red",
        label: "Sanitaire",
        title: "Contrôle varroa",
        detail: "Rucher nord · suivi manuel",
      },
    ],
  },
  {
    id: "reader",
    label: "Lecture seule",
    userName: "Marc",
    role: "Observateur",
    organization: "Rucher familial",
    organizationType: "Accès invité",
    description: "Navigation réduite pour consulter sans modifier ni administrer.",
    seasonLabel: "Consultation",
    seasonMetric: "Lecture",
    seasonDetail: "Peu de modules et aucune action d'administration.",
    enabledModules: ["apiaries", "hives", "knowledge", "contacts"],
    permissions: ["apiaries.read", "hives.read", "knowledge.read", "contacts.read"],
    dashboardModules: ["apiaries", "hives", "knowledge", "contacts"],
    featuredModules: ["knowledge", "contacts"],
    watchItems: [
      {
        accent: "forest",
        label: "Info",
        title: "Consulter les ruchers",
        detail: "Accès limité aux données partagées",
      },
      {
        accent: "amber",
        label: "Guide",
        title: "Lire une fiche pratique",
        detail: "Base de connaissance",
      },
      {
        accent: "red",
        label: "Limite",
        title: "Aucune action d'écriture",
        detail: "Démonstration de permission",
      },
    ],
  },
  {
    id: "health",
    label: "Intervenant sanitaire",
    userName: "Sophie",
    role: "Référente sanitaire",
    organization: "Groupement sanitaire apicole",
    organizationType: "Intervention externe",
    description: "Vue spécialisée sur les ruchers, visites et signaux sanitaires.",
    seasonLabel: "Surveillance",
    seasonMetric: "Sanitaire",
    seasonDetail: "Accès orienté observation, sans prescription automatique.",
    enabledModules: ["apiaries", "hives", "visits", "health", "varroa", "hornet", "knowledge"],
    permissions: [
      "apiaries.read",
      "hives.read",
      "visits.read",
      "health.read",
      "knowledge.read",
    ],
    dashboardModules: ["apiaries", "hives", "visits", "health"],
    featuredModules: ["health", "varroa", "hornet"],
    watchItems: [
      {
        accent: "red",
        label: "Signal",
        title: "Suspicion à revoir",
        detail: "Rucher de la Forêt · observation",
      },
      {
        accent: "amber",
        label: "Varroa",
        title: "Comptage manuel attendu",
        detail: "Rucher du Vallon",
      },
      {
        accent: "forest",
        label: "Fiche",
        title: "Procédure sanitaire",
        detail: "Base de connaissance",
      },
    ],
  },
];

export const activeUserContextScenario = userContextScenarios[0];
