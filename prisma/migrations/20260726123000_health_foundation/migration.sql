-- CreateEnum
CREATE TYPE "HealthObservationCategory" AS ENUM ('GENERAL', 'DISEASE_SIGN', 'QUEEN', 'BROOD', 'FOOD', 'BEHAVIOR', 'MATERIAL', 'OTHER');

-- CreateEnum
CREATE TYPE "HealthSeverity" AS ENUM ('INFO', 'WATCH', 'CONCERN', 'URGENT');

-- CreateEnum
CREATE TYPE "VarroaCheckMethod" AS ENUM ('VISUAL', 'STICKY_BOARD', 'SUGAR_ROLL', 'ALCOHOL_WASH', 'OTHER');

-- CreateEnum
CREATE TYPE "HornetPressureLevel" AS ENUM ('NONE', 'LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "HealthObservation" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "apiaryId" TEXT,
    "hiveId" TEXT,
    "colonyId" TEXT,
    "visitId" TEXT,
    "authorMembershipId" TEXT,
    "category" "HealthObservationCategory" NOT NULL DEFAULT 'GENERAL',
    "severity" "HealthSeverity" NOT NULL DEFAULT 'INFO',
    "observedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "label" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archivedAt" TIMESTAMP(3),

    CONSTRAINT "HealthObservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VarroaRecord" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "apiaryId" TEXT,
    "hiveId" TEXT,
    "colonyId" TEXT,
    "visitId" TEXT,
    "authorMembershipId" TEXT,
    "method" "VarroaCheckMethod" NOT NULL DEFAULT 'VISUAL',
    "observedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "miteCount" INTEGER,
    "sampleSize" INTEGER,
    "infestationRate" DECIMAL(6,3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archivedAt" TIMESTAMP(3),

    CONSTRAINT "VarroaRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HornetRecord" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "apiaryId" TEXT,
    "visitId" TEXT,
    "authorMembershipId" TEXT,
    "pressure" "HornetPressureLevel" NOT NULL DEFAULT 'NONE',
    "observedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hornetCount" INTEGER,
    "trapCount" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archivedAt" TIMESTAMP(3),

    CONSTRAINT "HornetRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HealthObservation_organizationId_idx" ON "HealthObservation"("organizationId");

-- CreateIndex
CREATE INDEX "HealthObservation_apiaryId_idx" ON "HealthObservation"("apiaryId");

-- CreateIndex
CREATE INDEX "HealthObservation_hiveId_idx" ON "HealthObservation"("hiveId");

-- CreateIndex
CREATE INDEX "HealthObservation_colonyId_idx" ON "HealthObservation"("colonyId");

-- CreateIndex
CREATE INDEX "HealthObservation_visitId_idx" ON "HealthObservation"("visitId");

-- CreateIndex
CREATE INDEX "HealthObservation_authorMembershipId_idx" ON "HealthObservation"("authorMembershipId");

-- CreateIndex
CREATE INDEX "HealthObservation_category_idx" ON "HealthObservation"("category");

-- CreateIndex
CREATE INDEX "HealthObservation_severity_idx" ON "HealthObservation"("severity");

-- CreateIndex
CREATE INDEX "HealthObservation_observedAt_idx" ON "HealthObservation"("observedAt");

-- CreateIndex
CREATE INDEX "VarroaRecord_organizationId_idx" ON "VarroaRecord"("organizationId");

-- CreateIndex
CREATE INDEX "VarroaRecord_apiaryId_idx" ON "VarroaRecord"("apiaryId");

-- CreateIndex
CREATE INDEX "VarroaRecord_hiveId_idx" ON "VarroaRecord"("hiveId");

-- CreateIndex
CREATE INDEX "VarroaRecord_colonyId_idx" ON "VarroaRecord"("colonyId");

-- CreateIndex
CREATE INDEX "VarroaRecord_visitId_idx" ON "VarroaRecord"("visitId");

-- CreateIndex
CREATE INDEX "VarroaRecord_authorMembershipId_idx" ON "VarroaRecord"("authorMembershipId");

-- CreateIndex
CREATE INDEX "VarroaRecord_method_idx" ON "VarroaRecord"("method");

-- CreateIndex
CREATE INDEX "VarroaRecord_observedAt_idx" ON "VarroaRecord"("observedAt");

-- CreateIndex
CREATE INDEX "HornetRecord_organizationId_idx" ON "HornetRecord"("organizationId");

-- CreateIndex
CREATE INDEX "HornetRecord_apiaryId_idx" ON "HornetRecord"("apiaryId");

-- CreateIndex
CREATE INDEX "HornetRecord_visitId_idx" ON "HornetRecord"("visitId");

-- CreateIndex
CREATE INDEX "HornetRecord_authorMembershipId_idx" ON "HornetRecord"("authorMembershipId");

-- CreateIndex
CREATE INDEX "HornetRecord_pressure_idx" ON "HornetRecord"("pressure");

-- CreateIndex
CREATE INDEX "HornetRecord_observedAt_idx" ON "HornetRecord"("observedAt");

-- AddForeignKey
ALTER TABLE "HealthObservation" ADD CONSTRAINT "HealthObservation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthObservation" ADD CONSTRAINT "HealthObservation_apiaryId_fkey" FOREIGN KEY ("apiaryId") REFERENCES "Apiary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthObservation" ADD CONSTRAINT "HealthObservation_hiveId_fkey" FOREIGN KEY ("hiveId") REFERENCES "Hive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthObservation" ADD CONSTRAINT "HealthObservation_colonyId_fkey" FOREIGN KEY ("colonyId") REFERENCES "Colony"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthObservation" ADD CONSTRAINT "HealthObservation_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthObservation" ADD CONSTRAINT "HealthObservation_authorMembershipId_fkey" FOREIGN KEY ("authorMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VarroaRecord" ADD CONSTRAINT "VarroaRecord_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VarroaRecord" ADD CONSTRAINT "VarroaRecord_apiaryId_fkey" FOREIGN KEY ("apiaryId") REFERENCES "Apiary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VarroaRecord" ADD CONSTRAINT "VarroaRecord_hiveId_fkey" FOREIGN KEY ("hiveId") REFERENCES "Hive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VarroaRecord" ADD CONSTRAINT "VarroaRecord_colonyId_fkey" FOREIGN KEY ("colonyId") REFERENCES "Colony"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VarroaRecord" ADD CONSTRAINT "VarroaRecord_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VarroaRecord" ADD CONSTRAINT "VarroaRecord_authorMembershipId_fkey" FOREIGN KEY ("authorMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HornetRecord" ADD CONSTRAINT "HornetRecord_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HornetRecord" ADD CONSTRAINT "HornetRecord_apiaryId_fkey" FOREIGN KEY ("apiaryId") REFERENCES "Apiary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HornetRecord" ADD CONSTRAINT "HornetRecord_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HornetRecord" ADD CONSTRAINT "HornetRecord_authorMembershipId_fkey" FOREIGN KEY ("authorMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;
