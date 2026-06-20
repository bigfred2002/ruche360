-- CreateEnum
CREATE TYPE "ApiaryStatus" AS ENUM ('ACTIVE', 'PAUSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "HiveStatus" AS ENUM ('ACTIVE', 'STORED', 'MAINTENANCE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ColonyStatus" AS ENUM ('ACTIVE', 'WEAK', 'LOST', 'ARCHIVED');

-- CreateTable
CREATE TABLE "Apiary" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "locationDescription" TEXT,
    "latitude" DECIMAL(9,6),
    "longitude" DECIMAL(9,6),
    "accessNotes" TEXT,
    "status" "ApiaryStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archivedAt" TIMESTAMP(3),

    CONSTRAINT "Apiary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hive" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "apiaryId" TEXT,
    "fieldIdentifier" TEXT NOT NULL,
    "hiveType" TEXT,
    "lowPowerConfiguration" JSONB,
    "status" "HiveStatus" NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archivedAt" TIMESTAMP(3),

    CONSTRAINT "Hive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Colony" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "hiveId" TEXT,
    "origin" TEXT,
    "queenKnown" BOOLEAN NOT NULL DEFAULT false,
    "queenYear" INTEGER,
    "status" "ColonyStatus" NOT NULL DEFAULT 'ACTIVE',
    "estimatedForce" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archivedAt" TIMESTAMP(3),

    CONSTRAINT "Colony_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Apiary_organizationId_idx" ON "Apiary"("organizationId");

-- CreateIndex
CREATE INDEX "Apiary_status_idx" ON "Apiary"("status");

-- CreateIndex
CREATE INDEX "Hive_apiaryId_idx" ON "Hive"("apiaryId");

-- CreateIndex
CREATE INDEX "Hive_status_idx" ON "Hive"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Hive_organizationId_fieldIdentifier_key" ON "Hive"("organizationId", "fieldIdentifier");

-- CreateIndex
CREATE INDEX "Colony_organizationId_idx" ON "Colony"("organizationId");

-- CreateIndex
CREATE INDEX "Colony_hiveId_idx" ON "Colony"("hiveId");

-- CreateIndex
CREATE INDEX "Colony_status_idx" ON "Colony"("status");

-- AddForeignKey
ALTER TABLE "Apiary" ADD CONSTRAINT "Apiary_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hive" ADD CONSTRAINT "Hive_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hive" ADD CONSTRAINT "Hive_apiaryId_fkey" FOREIGN KEY ("apiaryId") REFERENCES "Apiary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Colony" ADD CONSTRAINT "Colony_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Colony" ADD CONSTRAINT "Colony_hiveId_fkey" FOREIGN KEY ("hiveId") REFERENCES "Hive"("id") ON DELETE SET NULL ON UPDATE CASCADE;
