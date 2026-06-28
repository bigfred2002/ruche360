-- CreateEnum
CREATE TYPE "HiveMovementStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "HiveMovementReason" AS ENUM ('HONEY_FLOW', 'POLLINATION', 'WINTERING', 'EMERGENCY', 'HEALTH', 'GROUPING', 'OTHER');

-- CreateTable
CREATE TABLE "HiveMovement" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "sourceApiaryId" TEXT,
    "destinationApiaryId" TEXT NOT NULL,
    "authorMembershipId" TEXT,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "arrivalDate" TIMESTAMP(3),
    "status" "HiveMovementStatus" NOT NULL DEFAULT 'PLANNED',
    "reason" "HiveMovementReason" NOT NULL DEFAULT 'OTHER',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HiveMovement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HiveMovementItem" (
    "movementId" TEXT NOT NULL,
    "hiveId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HiveMovementItem_pkey" PRIMARY KEY ("movementId","hiveId")
);

-- CreateIndex
CREATE INDEX "HiveMovement_organizationId_idx" ON "HiveMovement"("organizationId");

-- CreateIndex
CREATE INDEX "HiveMovement_sourceApiaryId_idx" ON "HiveMovement"("sourceApiaryId");

-- CreateIndex
CREATE INDEX "HiveMovement_destinationApiaryId_idx" ON "HiveMovement"("destinationApiaryId");

-- CreateIndex
CREATE INDEX "HiveMovement_authorMembershipId_idx" ON "HiveMovement"("authorMembershipId");

-- CreateIndex
CREATE INDEX "HiveMovement_status_idx" ON "HiveMovement"("status");

-- CreateIndex
CREATE INDEX "HiveMovement_departureDate_idx" ON "HiveMovement"("departureDate");

-- CreateIndex
CREATE INDEX "HiveMovementItem_hiveId_idx" ON "HiveMovementItem"("hiveId");

-- AddForeignKey
ALTER TABLE "HiveMovement" ADD CONSTRAINT "HiveMovement_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HiveMovement" ADD CONSTRAINT "HiveMovement_sourceApiaryId_fkey" FOREIGN KEY ("sourceApiaryId") REFERENCES "Apiary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HiveMovement" ADD CONSTRAINT "HiveMovement_destinationApiaryId_fkey" FOREIGN KEY ("destinationApiaryId") REFERENCES "Apiary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HiveMovement" ADD CONSTRAINT "HiveMovement_authorMembershipId_fkey" FOREIGN KEY ("authorMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HiveMovementItem" ADD CONSTRAINT "HiveMovementItem_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "HiveMovement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HiveMovementItem" ADD CONSTRAINT "HiveMovementItem_hiveId_fkey" FOREIGN KEY ("hiveId") REFERENCES "Hive"("id") ON DELETE CASCADE ON UPDATE CASCADE;
