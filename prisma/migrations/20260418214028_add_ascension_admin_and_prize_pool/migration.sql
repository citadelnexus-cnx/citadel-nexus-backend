-- CreateTable
CREATE TABLE "AscensionPrizePool" (
    "id" TEXT NOT NULL,
    "poolName" TEXT NOT NULL DEFAULT 'main',
    "totalXpAvailable" INTEGER NOT NULL DEFAULT 0,
    "totalXpAdded" INTEGER NOT NULL DEFAULT 0,
    "totalXpAwarded" INTEGER NOT NULL DEFAULT 0,
    "totalXpRemoved" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "seasonId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AscensionPrizePool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AscensionAdminAction" (
    "id" TEXT NOT NULL,
    "adminUserId" TEXT NOT NULL,
    "adminUsername" TEXT,
    "targetUserId" TEXT,
    "targetUsername" TEXT,
    "actionType" TEXT NOT NULL,
    "resourceType" TEXT,
    "amount" INTEGER,
    "valueBefore" JSONB,
    "valueAfter" JSONB,
    "reason" TEXT NOT NULL,
    "metadataJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AscensionAdminAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AscensionAdminSnapshot" (
    "id" TEXT NOT NULL,
    "actionId" TEXT NOT NULL,
    "targetUserId" TEXT NOT NULL,
    "snapshotType" TEXT NOT NULL,
    "profileState" JSONB,
    "inventoryState" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AscensionAdminSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AscensionPrizePool_poolName_key" ON "AscensionPrizePool"("poolName");

-- CreateIndex
CREATE INDEX "AscensionAdminAction_adminUserId_createdAt_idx" ON "AscensionAdminAction"("adminUserId", "createdAt");

-- CreateIndex
CREATE INDEX "AscensionAdminAction_targetUserId_createdAt_idx" ON "AscensionAdminAction"("targetUserId", "createdAt");

-- CreateIndex
CREATE INDEX "AscensionAdminAction_actionType_createdAt_idx" ON "AscensionAdminAction"("actionType", "createdAt");

-- CreateIndex
CREATE INDEX "AscensionAdminSnapshot_actionId_idx" ON "AscensionAdminSnapshot"("actionId");

-- CreateIndex
CREATE INDEX "AscensionAdminSnapshot_targetUserId_createdAt_idx" ON "AscensionAdminSnapshot"("targetUserId", "createdAt");
