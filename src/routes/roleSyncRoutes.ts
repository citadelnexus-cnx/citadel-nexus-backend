//backend/src/routes/roleSyncRoutes.ts
import express, { Request, Response } from "express";
import {
  buildRoleSyncPayload,
  buildAllRoleSyncPayloads,
} from "../services/roleSyncService";
import { markRoleSync } from "../services/accessStateService";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  return res.json(buildAllRoleSyncPayloads());
});

router.get("/:userId", (req: Request, res: Response) => {
  const userId = req.params.userId as string;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const payload = buildRoleSyncPayload(userId);
  if (!payload) {
    return res.status(404).json({ error: "Role sync payload not found" });
  }

  return res.json(payload);
});

router.post("/:userId/mark-synced", (req: Request, res: Response) => {
  const userId = req.params.userId as string;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const updated = markRoleSync(userId);
  if (!updated) {
    return res.status(404).json({ error: "Access state not found" });
  }

  return res.json({
    userId: updated.userId,
    lastRoleSyncAt: updated.lastRoleSyncAt ?? null,
    message: "Role sync timestamp updated",
  });
});

export default router;