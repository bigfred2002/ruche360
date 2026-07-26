export const healthObservationCategories = [
  "GENERAL",
  "DISEASE_SIGN",
  "QUEEN",
  "BROOD",
  "FOOD",
  "BEHAVIOR",
  "MATERIAL",
  "OTHER",
] as const;

export const healthSeverities = ["INFO", "WATCH", "CONCERN", "URGENT"] as const;

export const varroaCheckMethods = [
  "VISUAL",
  "STICKY_BOARD",
  "SUGAR_ROLL",
  "ALCOHOL_WASH",
  "OTHER",
] as const;

export const hornetPressureLevels = ["NONE", "LOW", "MEDIUM", "HIGH"] as const;

export type HealthObservationCategory = (typeof healthObservationCategories)[number];
export type HealthSeverity = (typeof healthSeverities)[number];
export type VarroaCheckMethod = (typeof varroaCheckMethods)[number];
export type HornetPressureLevel = (typeof hornetPressureLevels)[number];

export type HealthObservationSummary = {
  id: string;
  organizationId: string;
  apiaryId: string | null;
  hiveId: string | null;
  colonyId: string | null;
  visitId: string | null;
  authorMembershipId: string | null;
  category: HealthObservationCategory;
  severity: HealthSeverity;
  observedAt: Date;
  label: string;
  notes: string | null;
};

export type VarroaRecordSummary = {
  id: string;
  organizationId: string;
  apiaryId: string | null;
  hiveId: string | null;
  colonyId: string | null;
  visitId: string | null;
  authorMembershipId: string | null;
  method: VarroaCheckMethod;
  observedAt: Date;
  miteCount: number | null;
  sampleSize: number | null;
  infestationRate: string | null;
  notes: string | null;
};

export type HornetRecordSummary = {
  id: string;
  organizationId: string;
  apiaryId: string | null;
  visitId: string | null;
  authorMembershipId: string | null;
  pressure: HornetPressureLevel;
  observedAt: Date;
  hornetCount: number | null;
  trapCount: number | null;
  notes: string | null;
};
