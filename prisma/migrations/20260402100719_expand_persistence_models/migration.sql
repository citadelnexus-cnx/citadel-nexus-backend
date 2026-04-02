/*
  Warnings:

  - You are about to drop the column `details` on the `DiscordRoleSyncAudit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `AccessState` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idempotencyKey]` on the table `DiscordRoleSyncAudit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[executionHash]` on the table `DiscordRoleSyncAudit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `canExecute` to the `DiscordRoleSyncAudit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractVersion` to the `DiscordRoleSyncAudit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `executionHash` to the `DiscordRoleSyncAudit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `executionSource` to the `DiscordRoleSyncAudit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idempotencyKey` to the `DiscordRoleSyncAudit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payloadJson` to the `DiscordRoleSyncAudit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rateLimitBucket` to the `DiscordRoleSyncAudit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `DiscordRoleSyncAudit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccessState" ADD COLUMN     "cooldownReduction" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "holderTierInternal" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isCnxHolder" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastEvaluatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastRoleSyncAt" TIMESTAMP(3),
ADD COLUMN     "tempAccessExpiresAt" TIMESTAMP(3),
ADD COLUMN     "tempAccessType" TEXT,
ADD COLUMN     "xpBoost" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "DiscordRoleSyncAudit" DROP COLUMN "details",
ADD COLUMN     "attemptCount" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "canExecute" BOOLEAN NOT NULL,
ADD COLUMN     "contractVersion" TEXT NOT NULL,
ADD COLUMN     "currentMemberRoleIds" TEXT[],
ADD COLUMN     "desiredAddRoleIds" TEXT[],
ADD COLUMN     "desiredRemoveRoleIds" TEXT[],
ADD COLUMN     "errorMessage" TEXT,
ADD COLUMN     "executionDurationMs" INTEGER,
ADD COLUMN     "executionHash" TEXT NOT NULL,
ADD COLUMN     "executionSource" TEXT NOT NULL,
ADD COLUMN     "finalMemberRoleIds" TEXT[],
ADD COLUMN     "idempotencyKey" TEXT NOT NULL,
ADD COLUMN     "payloadJson" TEXT NOT NULL,
ADD COLUMN     "rateLimitBucket" TEXT NOT NULL,
ADD COLUMN     "reasonsBlocked" TEXT[],
ADD COLUMN     "rollbackSnapshotJson" TEXT,
ADD COLUMN     "unresolvedRoleKeys" TEXT[],
ADD COLUMN     "unsupportedTempAccessType" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "verificationPassed" BOOLEAN,
ADD COLUMN     "warnings" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cnxBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "discordTag" TEXT,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastActiveAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "payoutEligible" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reservedCnx" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "rewardLog" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ADD COLUMN     "wallet" TEXT,
ADD COLUMN     "xp" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "AccessState_userId_key" ON "AccessState"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordRoleSyncAudit_idempotencyKey_key" ON "DiscordRoleSyncAudit"("idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordRoleSyncAudit_executionHash_key" ON "DiscordRoleSyncAudit"("executionHash");

-- CreateIndex
CREATE INDEX "DiscordRoleSyncAudit_userId_createdAt_idx" ON "DiscordRoleSyncAudit"("userId", "createdAt");
