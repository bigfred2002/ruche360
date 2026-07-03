-- CreateEnum
CREATE TYPE "VisitStatus" AS ENUM ('DRAFT', 'PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "VisitObservationCategory" AS ENUM ('COLONY', 'RESERVES', 'HIVE', 'HEALTH', 'ACTION', 'FOLLOW_UP', 'NOTE');

-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "apiaryId" TEXT,
    "hiveId" TEXT,
    "colonyId" TEXT,
    "authorMembershipId" TEXT,
    "status" "VisitStatus" NOT NULL DEFAULT 'DRAFT',
    "visitedAt" TIMESTAMP(3),
    "objective" TEXT,
    "weatherSummary" TEXT,
    "colonyStrength" INTEGER,
    "notes" TEXT,
    "followUpSummary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archivedAt" TIMESTAMP(3),

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitObservation" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "visitId" TEXT NOT NULL,
    "category" "VisitObservationCategory" NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisitObservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Visit_organizationId_idx" ON "Visit"("organizationId");

-- CreateIndex
CREATE INDEX "Visit_apiaryId_idx" ON "Visit"("apiaryId");

-- CreateIndex
CREATE INDEX "Visit_hiveId_idx" ON "Visit"("hiveId");

-- CreateIndex
CREATE INDEX "Visit_colonyId_idx" ON "Visit"("colonyId");

-- CreateIndex
CREATE INDEX "Visit_authorMembershipId_idx" ON "Visit"("authorMembershipId");

-- CreateIndex
CREATE INDEX "Visit_status_idx" ON "Visit"("status");

-- CreateIndex
CREATE INDEX "Visit_visitedAt_idx" ON "Visit"("visitedAt");

-- CreateIndex
CREATE INDEX "VisitObservation_organizationId_idx" ON "VisitObservation"("organizationId");

-- CreateIndex
CREATE INDEX "VisitObservation_visitId_idx" ON "VisitObservation"("visitId");

-- CreateIndex
CREATE INDEX "VisitObservation_category_idx" ON "VisitObservation"("category");

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_apiaryId_fkey" FOREIGN KEY ("apiaryId") REFERENCES "Apiary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_hiveId_fkey" FOREIGN KEY ("hiveId") REFERENCES "Hive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_colonyId_fkey" FOREIGN KEY ("colonyId") REFERENCES "Colony"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_authorMembershipId_fkey" FOREIGN KEY ("authorMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitObservation" ADD CONSTRAINT "VisitObservation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitObservation" ADD CONSTRAINT "VisitObservation_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
