-- CreateEnum
CREATE TYPE "EquipmentTrackingMode" AS ENUM ('QUANTITY', 'INDIVIDUAL', 'HYBRID');

-- CreateEnum
CREATE TYPE "EquipmentTypeStatus" AS ENUM ('ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "EquipmentItemStatus" AS ENUM ('AVAILABLE', 'IN_USE', 'TO_CLEAN', 'MAINTENANCE', 'RETIRED', 'LOST');

-- CreateEnum
CREATE TYPE "EquipmentEventType" AS ENUM ('QUANTITY_ADJUSTED', 'ITEM_CREATED', 'STATUS_CHANGED', 'MOVED', 'CLEANED', 'MAINTENANCE', 'RETIRED', 'NOTE');

-- CreateTable
CREATE TABLE "EquipmentType" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "trackingMode" "EquipmentTrackingMode" NOT NULL DEFAULT 'QUANTITY',
    "defaultUnit" TEXT,
    "status" "EquipmentTypeStatus" NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archivedAt" TIMESTAMP(3),

    CONSTRAINT "EquipmentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentStock" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "equipmentTypeId" TEXT NOT NULL,
    "apiaryId" TEXT,
    "quantity" DECIMAL(12,3) NOT NULL,
    "unit" TEXT NOT NULL,
    "locationLabel" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EquipmentStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentItem" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "equipmentTypeId" TEXT NOT NULL,
    "apiaryId" TEXT,
    "fieldIdentifier" TEXT NOT NULL,
    "status" "EquipmentItemStatus" NOT NULL DEFAULT 'AVAILABLE',
    "locationLabel" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archivedAt" TIMESTAMP(3),

    CONSTRAINT "EquipmentItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentEvent" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "equipmentTypeId" TEXT,
    "equipmentItemId" TEXT,
    "apiaryId" TEXT,
    "eventType" "EquipmentEventType" NOT NULL,
    "quantity" DECIMAL(12,3),
    "unit" TEXT,
    "sourceLocation" TEXT,
    "targetLocation" TEXT,
    "notes" TEXT,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EquipmentEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EquipmentType_organizationId_idx" ON "EquipmentType"("organizationId");

-- CreateIndex
CREATE INDEX "EquipmentType_category_idx" ON "EquipmentType"("category");

-- CreateIndex
CREATE INDEX "EquipmentType_status_idx" ON "EquipmentType"("status");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentType_organizationId_name_key" ON "EquipmentType"("organizationId", "name");

-- CreateIndex
CREATE INDEX "EquipmentStock_organizationId_idx" ON "EquipmentStock"("organizationId");

-- CreateIndex
CREATE INDEX "EquipmentStock_equipmentTypeId_idx" ON "EquipmentStock"("equipmentTypeId");

-- CreateIndex
CREATE INDEX "EquipmentStock_apiaryId_idx" ON "EquipmentStock"("apiaryId");

-- CreateIndex
CREATE INDEX "EquipmentItem_organizationId_idx" ON "EquipmentItem"("organizationId");

-- CreateIndex
CREATE INDEX "EquipmentItem_equipmentTypeId_idx" ON "EquipmentItem"("equipmentTypeId");

-- CreateIndex
CREATE INDEX "EquipmentItem_apiaryId_idx" ON "EquipmentItem"("apiaryId");

-- CreateIndex
CREATE INDEX "EquipmentItem_status_idx" ON "EquipmentItem"("status");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentItem_organizationId_fieldIdentifier_key" ON "EquipmentItem"("organizationId", "fieldIdentifier");

-- CreateIndex
CREATE INDEX "EquipmentEvent_organizationId_idx" ON "EquipmentEvent"("organizationId");

-- CreateIndex
CREATE INDEX "EquipmentEvent_equipmentTypeId_idx" ON "EquipmentEvent"("equipmentTypeId");

-- CreateIndex
CREATE INDEX "EquipmentEvent_equipmentItemId_idx" ON "EquipmentEvent"("equipmentItemId");

-- CreateIndex
CREATE INDEX "EquipmentEvent_apiaryId_idx" ON "EquipmentEvent"("apiaryId");

-- CreateIndex
CREATE INDEX "EquipmentEvent_eventType_idx" ON "EquipmentEvent"("eventType");

-- CreateIndex
CREATE INDEX "EquipmentEvent_occurredAt_idx" ON "EquipmentEvent"("occurredAt");

-- AddForeignKey
ALTER TABLE "EquipmentType" ADD CONSTRAINT "EquipmentType_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentStock" ADD CONSTRAINT "EquipmentStock_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentStock" ADD CONSTRAINT "EquipmentStock_equipmentTypeId_fkey" FOREIGN KEY ("equipmentTypeId") REFERENCES "EquipmentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentStock" ADD CONSTRAINT "EquipmentStock_apiaryId_fkey" FOREIGN KEY ("apiaryId") REFERENCES "Apiary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentItem" ADD CONSTRAINT "EquipmentItem_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentItem" ADD CONSTRAINT "EquipmentItem_equipmentTypeId_fkey" FOREIGN KEY ("equipmentTypeId") REFERENCES "EquipmentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentItem" ADD CONSTRAINT "EquipmentItem_apiaryId_fkey" FOREIGN KEY ("apiaryId") REFERENCES "Apiary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentEvent" ADD CONSTRAINT "EquipmentEvent_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentEvent" ADD CONSTRAINT "EquipmentEvent_equipmentTypeId_fkey" FOREIGN KEY ("equipmentTypeId") REFERENCES "EquipmentType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentEvent" ADD CONSTRAINT "EquipmentEvent_equipmentItemId_fkey" FOREIGN KEY ("equipmentItemId") REFERENCES "EquipmentItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentEvent" ADD CONSTRAINT "EquipmentEvent_apiaryId_fkey" FOREIGN KEY ("apiaryId") REFERENCES "Apiary"("id") ON DELETE SET NULL ON UPDATE CASCADE;
