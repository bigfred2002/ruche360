-- CreateEnum
CREATE TYPE "ActivityLogImportance" AS ENUM ('INFO', 'IMPORTANT', 'SENSITIVE', 'SECURITY');

-- CreateTable
CREATE TABLE "ActivityLogEntry" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "actorMembershipId" TEXT,
    "moduleCode" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "targetType" TEXT,
    "targetId" TEXT,
    "label" TEXT NOT NULL,
    "importance" "ActivityLogImportance" NOT NULL DEFAULT 'INFO',
    "summary" TEXT,
    "metadata" JSONB,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityLogEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ActivityLogEntry_organizationId_idx" ON "ActivityLogEntry"("organizationId");

-- CreateIndex
CREATE INDEX "ActivityLogEntry_actorMembershipId_idx" ON "ActivityLogEntry"("actorMembershipId");

-- CreateIndex
CREATE INDEX "ActivityLogEntry_moduleCode_idx" ON "ActivityLogEntry"("moduleCode");

-- CreateIndex
CREATE INDEX "ActivityLogEntry_actionType_idx" ON "ActivityLogEntry"("actionType");

-- CreateIndex
CREATE INDEX "ActivityLogEntry_targetType_targetId_idx" ON "ActivityLogEntry"("targetType", "targetId");

-- CreateIndex
CREATE INDEX "ActivityLogEntry_importance_idx" ON "ActivityLogEntry"("importance");

-- CreateIndex
CREATE INDEX "ActivityLogEntry_occurredAt_idx" ON "ActivityLogEntry"("occurredAt");

-- AddForeignKey
ALTER TABLE "ActivityLogEntry" ADD CONSTRAINT "ActivityLogEntry_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLogEntry" ADD CONSTRAINT "ActivityLogEntry_actorMembershipId_fkey" FOREIGN KEY ("actorMembershipId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;
