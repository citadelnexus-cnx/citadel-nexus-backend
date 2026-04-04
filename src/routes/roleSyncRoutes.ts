//backend/src/routes/roleSyncRoutes.ts
import express, { Request, Response } from "express";
import {
  buildRoleSyncPayload,
  buildAllRoleSyncPayloads,
} from "../services/roleSyncService";
import { markRoleSync } from "../services/accessStateService";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const payloads = await buildAllRoleSyncPayloads();
    return res.json(payloads);
  } catch (error) {
    console.error("GET /role-sync failed:", error);
    return res.status(500).json({ error: "Failed to build role sync payloads" });
  }
});

router.get("/:userId", async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.userId ?? "");

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const payload = await buildRoleSyncPayload(userId);

    if (!payload) {
      return res.status(404).json({ error: "Role sync payload not found" });
    }

    return res.json(payload);
  } catch (error) {
    console.error("GET /role-sync/:userId failed:", error);
    return res.status(500).json({ error: "Failed to build role sync payload" });
  }
});

router.post("/:userId/mark-synced", async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.userId ?? "");

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const updated = await markRoleSync(userId);

    if (!updated) {
      return res.status(404).json({ error: "Access state not found" });
    }

    return res.json({
      userId: updated.userId,
      lastRoleSyncAt: updated.lastRoleSyncAt ?? null,
      message: "Role sync timestamp updated",
    });
  } catch (error) {
    console.error("POST /role-sync/:userId/mark-synced failed:", error);
    return res.status(500).json({ error: "Failed to mark role sync" });
  }
});

export default router;