-- CreateTable
CREATE TABLE "MembershipModulePreference" (
    "id" TEXT NOT NULL,
    "membershipId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "status" "ModuleActivationStatus" NOT NULL DEFAULT 'DISABLED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MembershipModulePreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MembershipModulePreference_moduleId_idx" ON "MembershipModulePreference"("moduleId");

-- CreateIndex
CREATE INDEX "MembershipModulePreference_status_idx" ON "MembershipModulePreference"("status");

-- CreateIndex
CREATE UNIQUE INDEX "MembershipModulePreference_membershipId_moduleId_key" ON "MembershipModulePreference"("membershipId", "moduleId");

-- AddForeignKey
ALTER TABLE "MembershipModulePreference" ADD CONSTRAINT "MembershipModulePreference_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembershipModulePreference" ADD CONSTRAINT "MembershipModulePreference_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "ModuleDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
