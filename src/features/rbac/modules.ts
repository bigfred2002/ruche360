export const moduleCodes = [
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
  "low_power_config",
  "connected_scale",
  "apiary_weather",
  "camera",
  "sensors",
  "gps",
  "ai_visit_analysis",
  "ai_knowledge_assistant",
  "ai_species_recognition",
  "ai_varroa_counting",
] as const;

export type ModuleCode = (typeof moduleCodes)[number];

export type ModuleDefinition = {
  code: ModuleCode;
  label: string;
  category: "CORE" | "BEEKEEPING" | "KNOWLEDGE" | "DOCUMENTS" | "CONNECTED" | "AI";
  defaultEnabled: boolean;
};

export const modules: ModuleDefinition[] = [
  { code: "organizations", label: "Organisations", category: "CORE", defaultEnabled: true },
  { code: "users_roles", label: "Utilisateurs et rôles", category: "CORE", defaultEnabled: true },
  { code: "apiaries", label: "Ruchers", category: "BEEKEEPING", defaultEnabled: true },
  { code: "hives", label: "Ruches", category: "BEEKEEPING", defaultEnabled: true },
  { code: "colonies", label: "Colonies", category: "BEEKEEPING", defaultEnabled: true },
  { code: "visits", label: "Visites", category: "BEEKEEPING", defaultEnabled: true },
  { code: "tasks", label: "Tâches", category: "BEEKEEPING", defaultEnabled: true },
  { code: "health", label: "Sanitaire", category: "BEEKEEPING", defaultEnabled: true },
  { code: "varroa", label: "Varroa", category: "BEEKEEPING", defaultEnabled: true },
  { code: "hornet", label: "Frelon", category: "BEEKEEPING", defaultEnabled: true },
  { code: "knowledge", label: "Base de connaissance", category: "KNOWLEDGE", defaultEnabled: true },
  { code: "contacts", label: "Contacts utiles", category: "CORE", defaultEnabled: true },
  { code: "documents", label: "Documents", category: "DOCUMENTS", defaultEnabled: true },
  { code: "harvests", label: "Récoltes simples", category: "BEEKEEPING", defaultEnabled: true },
  { code: "equipment", label: "Matériel", category: "BEEKEEPING", defaultEnabled: false },
  { code: "low_power_config", label: "Configuration basse consommation", category: "CONNECTED", defaultEnabled: true },
  { code: "connected_scale", label: "Balance connectée", category: "CONNECTED", defaultEnabled: false },
  { code: "apiary_weather", label: "Météo de rucher", category: "CONNECTED", defaultEnabled: false },
  { code: "camera", label: "Caméra", category: "CONNECTED", defaultEnabled: false },
  { code: "sensors", label: "Capteurs", category: "CONNECTED", defaultEnabled: false },
  { code: "gps", label: "GPS", category: "CONNECTED", defaultEnabled: false },
  { code: "ai_visit_analysis", label: "Analyse de visite", category: "AI", defaultEnabled: false },
  { code: "ai_knowledge_assistant", label: "Assistant connaissance", category: "AI", defaultEnabled: false },
  { code: "ai_species_recognition", label: "Reconnaissance d'espèce", category: "AI", defaultEnabled: false },
  { code: "ai_varroa_counting", label: "Comptage varroa", category: "AI", defaultEnabled: false },
];
