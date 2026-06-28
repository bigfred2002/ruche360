import type {
  ModuleCode,
  ModuleAvailabilityStatus,
  ModuleNavigationSurface,
  ModuleRegistryEntry,
} from "@/features/rbac";

export type ModuleAccent = "amber" | "forest" | "sage" | "red" | "slate";

export type NavigationItem = {
  label: string;
  marker: string;
  href: string;
  route: string | null;
  active?: boolean;
  availability?: ModuleAvailabilityStatus;
};

export type ModuleCardViewModel = {
  accent: ModuleAccent;
  category: string;
  description: string;
  disabled: boolean;
  icon: string;
  status: "Disponible" | "A venir" | "Désactivé" | "Preview";
  title: string;
};

export type DashboardCardViewModel = {
  accent: ModuleAccent;
  detail: string;
  icon: string;
  metric: string;
  status: string;
  statusTone?: "active" | "amber" | "alert" | "muted" | "preview" | "soon";
  title: string;
};

type ModulePresentation = {
  accent: ModuleAccent;
  description: string;
  icon: string;
  metric?: string;
  shortLabel?: string;
};

const modulePresentation = {
  organizations: {
    accent: "slate",
    description: "Paramètres et espace de travail de l'organisation.",
    icon: "Or",
    shortLabel: "Org.",
  },
  users_roles: {
    accent: "slate",
    description: "Membres, rôles et droits préparés pour les prochains lots.",
    icon: "Ut",
    shortLabel: "Membres",
  },
  apiaries: {
    accent: "amber",
    description: "Sites apicoles visibles depuis le cockpit, sans CRUD actif.",
    icon: "Ru",
    metric: "12",
    shortLabel: "Ruchers",
  },
  hives: {
    accent: "sage",
    description: "Parc de ruches représenté comme surface de consultation.",
    icon: "Rc",
    metric: "84",
    shortLabel: "Ruches",
  },
  colonies: {
    accent: "forest",
    description: "Vie des colonies prévue, sans fiche dynamique dans ce lot.",
    icon: "Cl",
    metric: "76",
    shortLabel: "Colonies",
  },
  visits: {
    accent: "forest",
    description: "Repères de visites à venir, sans formulaire fonctionnel.",
    icon: "Vi",
    metric: "7",
    shortLabel: "Visites",
  },
  tasks: {
    accent: "amber",
    description: "Priorités terrain affichées comme éléments de cockpit.",
    icon: "Ta",
    metric: "18",
    shortLabel: "Tâches",
  },
  health: {
    accent: "red",
    description: "Suivi sanitaire prévu, sans prescription automatique.",
    icon: "Sa",
    metric: "1",
    shortLabel: "Santé",
  },
  varroa: {
    accent: "red",
    description: "Suivi varroa prévu comme sous-module sanitaire.",
    icon: "Va",
    shortLabel: "Varroa",
  },
  hornet: {
    accent: "red",
    description: "Signalements frelon prévus, sans automatisation.",
    icon: "Fr",
    shortLabel: "Frelon",
  },
  knowledge: {
    accent: "forest",
    description: "Fiches et procédures internes visibles comme module support.",
    icon: "Bc",
    metric: "24",
    shortLabel: "Savoir",
  },
  contacts: {
    accent: "amber",
    description: "Carnet de contacts utiles prévu pour l'organisation.",
    icon: "Co",
    metric: "9",
    shortLabel: "Contacts",
  },
  documents: {
    accent: "slate",
    description: "Documents organisationnels prévus, sans stockage actif.",
    icon: "Do",
    shortLabel: "Docs",
  },
  harvests: {
    accent: "amber",
    description: "Récoltes simples prévues, sans saisie ni calcul.",
    icon: "Ré",
    shortLabel: "Récoltes",
  },
  equipment: {
    accent: "sage",
    description: "Inventaire matériel prévu, sans gestion opérationnelle dans ce lot.",
    icon: "Ma",
    shortLabel: "Matériel",
  },
  low_power_config: {
    accent: "sage",
    description: "Configuration basse consommation prévue, sans paramétrage réel.",
    icon: "Bc",
    shortLabel: "Basse conso",
  },
  connected_scale: {
    accent: "slate",
    description: "Objet connecté visible comme option, sans donnée capteur.",
    icon: "Ba",
    shortLabel: "Balance",
  },
  apiary_weather: {
    accent: "slate",
    description: "Aucun fournisseur météo ni appel externe dans ce lot.",
    icon: "Mé",
    shortLabel: "Météo",
  },
  camera: {
    accent: "slate",
    description: "Pas de flux vidéo, pas de stockage image, simple preview.",
    icon: "Ca",
    shortLabel: "Caméra",
  },
  sensors: {
    accent: "slate",
    description: "Préparation visuelle sans protocole matériel actif.",
    icon: "Cp",
    shortLabel: "Capteurs",
  },
  gps: {
    accent: "slate",
    description: "Positionnement prévu, sans suivi GPS actif.",
    icon: "GP",
    shortLabel: "GPS",
  },
  ai_visit_analysis: {
    accent: "slate",
    description: "Analyse de visite prévue, sans automatisation active.",
    icon: "IA",
    shortLabel: "IA visite",
  },
  ai_knowledge_assistant: {
    accent: "slate",
    description: "Assistant connaissance prévu, sans appel IA.",
    icon: "IA",
    shortLabel: "Assistant",
  },
  ai_species_recognition: {
    accent: "slate",
    description: "Reconnaissance d'espèce prévue, sans modèle actif.",
    icon: "IA",
    shortLabel: "Espèce",
  },
  ai_varroa_counting: {
    accent: "slate",
    description: "Comptage varroa prévu, sans traitement d'image.",
    icon: "IA",
    shortLabel: "Varroa IA",
  },
} satisfies Record<ModuleCode, ModulePresentation>;

const categoryLabels: Record<ModuleRegistryEntry["category"], string> = {
  AI: "IA désactivée",
  BEEKEEPING: "Apiculture",
  CONNECTED: "Connecté",
  CORE: "Organisation",
  DOCUMENTS: "Documents",
  KNOWLEDGE: "Savoir",
};

export function getModulePresentation(module: ModuleCode): ModulePresentation {
  return modulePresentation[module];
}

export function createNavigationItems(
  entries: ModuleRegistryEntry[],
  surface: ModuleNavigationSurface,
  currentPath = "/",
): NavigationItem[] {
  const moduleItems = entries
    .filter((entry) => entry.navigation.has(surface))
    .map((entry) => {
      const presentation = getModulePresentation(entry.code);
      const href = entry.route ?? "#modules";

      return {
        active: entry.route === currentPath,
        availability: entry.availability,
        href,
        label: presentation.shortLabel ?? entry.label,
        marker: presentation.icon,
        route: entry.route,
      };
    });

  return [
    { active: currentPath === "/", href: "/", label: "Cockpit", marker: "Co", route: "/" },
    ...moduleItems,
    { active: currentPath === "/modules", href: "/modules", label: "Modules", marker: "Mo", route: "/modules" },
  ];
}

export function createDashboardCard(entry: ModuleRegistryEntry): DashboardCardViewModel {
  const presentation = getModulePresentation(entry.code);

  return {
    accent: presentation.accent,
    detail: presentation.description,
    icon: presentation.icon,
    metric: presentation.metric ?? "•",
    status: entry.availability === "ACTIVE" ? "Aperçu" : "Prévu",
    statusTone: entry.availability === "ACTIVE" ? "preview" : "soon",
    title: entry.label,
  };
}

export function createModuleCard(entry: ModuleRegistryEntry): ModuleCardViewModel {
  const presentation = getModulePresentation(entry.code);
  const disabled = entry.availability !== "ACTIVE";

  return {
    accent: presentation.accent,
    category: categoryLabels[entry.category],
    description: presentation.description,
    disabled,
    icon: presentation.icon,
    status:
      entry.availability === "DISABLED"
        ? "Désactivé"
        : entry.availability === "PLANNED"
          ? "A venir"
          : "Preview",
    title: entry.label,
  };
}
