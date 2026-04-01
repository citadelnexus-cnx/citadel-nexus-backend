// backend/src/routes/discordSyncWorkerRoutes.ts
import express, { Request, Response } from "express";
import {
  buildDiscordSyncDecision,
  getRoleKeyToRoleIdPreview,
} from "../services/discordSyncWorkerService";
import { executeDiscordRoleSyncAttempt } from "../services/discordRoleSyncExecutionService";
import { mutateDiscordRolesForUser } from "../services/discordRoleMutationService";
import {
  getDiscordRoleSyncAuditRecord,
  getDiscordRoleSyncAuditRecords,
  getDiscordRoleSyncAuditRecordsByUserId,
  type DiscordRoleSyncExecutionSource,
} from "../services/discordRoleSyncAuditStore";
import { verifyDiscordRoleSyncResult } from "../services/discordRoleSyncVerificationService";

const router = express.Router();

function parseRoleIds(input: unknown): string[] {
  return Array.isArray(input)
    ? input.filter((value: unknown): value is string => typeof value === "string")
    : [];
}

function parseExecutionSource(input: unknown): DiscordRoleSyncExecutionSource {
  const valid: DiscordRoleSyncExecutionSource[] = [
    "manual",
    "worker",
    "scheduler",
    "retry",
    "verification",
    "rollback",
  ];

  return typeof input === "string" && valid.includes(input as DiscordRoleSyncExecutionSource)
    ? (input as DiscordRoleSyncExecutionSource)
    : "manual";
}

function parsePositiveInt(input: unknown, fallback: number): number {
  const value = Number(input);
  return Number.isInteger(value) && value >= 0 ? value : fallback;
}

router.get("/role-map", (_req: Request, res: Response) => {
  return res.json(getRoleKeyToRoleIdPreview());
});

router.post("/:userId/dry-run", (req: Request, res: Response) => {
  const userId = req.params.userId as string;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const currentMemberRoleIds = parseRoleIds(req.body?.currentMemberRoleIds);
  const decision = buildDiscordSyncDecision(userId, currentMemberRoleIds);

  if (!decision) {
    return res.status(404).json({ error: "Discord sync decision could not be built" });
  }

  return res.json(decision);
});

router.post("/:userId/execute-attempt", (req: Request, res: Response) => {
  const userId = req.params.userId as string;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const currentMemberRoleIds = parseRoleIds(req.body?.currentMemberRoleIds);
  const executionSource = parseExecutionSource(req.body?.executionSource);
  const idempotencyKey =
    typeof req.body?.idempotencyKey === "string" ? req.body.idempotencyKey : undefined;

  const result = executeDiscordRoleSyncAttempt({
    userId,
    currentMemberRoleIds,
    executionSource,
    idempotencyKey,
  });

  if (!result) {
    return res.status(404).json({ error: "Discord sync execution attempt could not be built" });
  }

  return res.json(result);
});

router.post("/:userId/mutate", (req: Request, res: Response) => {
  const userId = req.params.userId as string;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const currentMemberRoleIds = parseRoleIds(req.body?.currentMemberRoleIds);
  const executionSource = parseExecutionSource(req.body?.executionSource);
  const idempotencyKey =
    typeof req.body?.idempotencyKey === "string" ? req.body.idempotencyKey : undefined;

  const result = mutateDiscordRolesForUser({
    userId,
    currentMemberRoleIds,
    executionSource,
    idempotencyKey,
  });

  if (!result) {
    return res.status(404).json({ error: "Discord role mutation could not be performed" });
  }

  return res.json(result);
});

router.get("/audit", (req: Request, res: Response) => {
  const limit = parsePositiveInt(req.query.limit, 25);
  const offset = parsePositiveInt(req.query.offset, 0);

  return res.json({
    records: getDiscordRoleSyncAuditRecords({ limit, offset }),
    pagination: { limit, offset },
  });
});

router.get("/audit/user/:userId", (req: Request, res: Response) => {
  const userId = req.params.userId as string;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const limit = parsePositiveInt(req.query.limit, 25);
  const offset = parsePositiveInt(req.query.offset, 0);

  return res.json({
    records: getDiscordRoleSyncAuditRecordsByUserId(userId, { limit, offset }),
    pagination: { limit, offset },
  });
});

router.get("/audit/:auditId", (req: Request, res: Response) => {
  const auditId = req.params.auditId as string;

  if (!auditId) {
    return res.status(400).json({ error: "Audit ID is required" });
  }

  const record = getDiscordRoleSyncAuditRecord(auditId);
  if (!record) {
    return res.status(404).json({ error: "Audit record not found" });
  }

  return res.json(record);
});

router.post("/verify/:auditId", (req: Request, res: Response) => {
  const auditId = req.params.auditId as string;

  if (!auditId) {
    return res.status(400).json({ error: "Audit ID is required" });
  }

  const actualMemberRoleIds = parseRoleIds(req.body?.actualMemberRoleIds);

  const result = verifyDiscordRoleSyncResult({
    auditId,
    actualMemberRoleIds,
  });

  if (!result) {
    return res.status(404).json({ error: "Audit record not found" });
  }

  return res.json(result);
});

export default router;