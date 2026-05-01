-- CreateTable
CREATE TABLE "AscensionProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "discordId" TEXT,
    "username" TEXT NOT NULL,
    "guardian" TEXT NOT NULL DEFAULT 'nova',
    "stage" INTEGER NOT NULL DEFAULT 1,
    "rank" TEXT NOT NULL DEFAULT 'initiate',
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "nodeScore" INTEGER NOT NULL DEFAULT 0,
    "sessionCount" INTEGER NOT NULL DEFAULT 0,
    "missionsCompleted" INTEGER NOT NULL DEFAULT 0,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "lockReason" TEXT,
    "power" INTEGER NOT NULL DEFAULT 5,
    "maxPower" INTEGER NOT NULL DEFAULT 10,
    "credits" INTEGER NOT NULL DEFAULT 50,
    "intel" INTEGER NOT NULL DEFAULT 10,
    "lastClaimAt" TIMESTAMP(3),
    "buildingsJson" JSONB NOT NULL DEFAULT '{"knowledge_core":1,"trade_hub":1,"power_reactor":1,"security_layer":1}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AscensionProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AscensionProfile_userId_key" ON "AscensionProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AscensionProfile_discordId_key" ON "AscensionProfile"("discordId");

-- CreateIndex
CREATE INDEX "AscensionProfile_discordId_idx" ON "AscensionProfile"("discordId");

-- CreateIndex
CREATE INDEX "AscensionProfile_stage_rank_idx" ON "AscensionProfile"("stage", "rank");

-- AddForeignKey
ALTER TABLE "AscensionProfile" ADD CONSTRAINT "AscensionProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
