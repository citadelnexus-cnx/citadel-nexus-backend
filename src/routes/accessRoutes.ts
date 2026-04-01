// backend/src/routes/accessRoutes.ts
import express, { Request, Response } from "express";
import {
  getOrCreateAccessState,
  getAllAccessStates,
  getAccessModifiers,
  refreshAccessState,
} from "../services/accessStateService";
import { expireExpiredEntitlements } from "../services/entitlementExpiryService";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  return res.json(getAllAccessStates());
});

router.post("/expire/run", (_req: Request, res: Response) => {
  const result = expireExpiredEntitlements();
  return res.json(result);
});

router.get("/:userId/modifiers", (req: Request, res: Response) => {
  const userId = req.params.userId as string;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  return res.json(getAccessModifiers(userId));
});

router.post("/:userId/refresh", (req: Request, res: Response) => {
  const userId = req.params.userId as string;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const refreshed = refreshAccessState(userId);
  if (!refreshed) {
    return res.status(404).json({ error: "User not found or access state unavailable" });
  }

  return res.json(refreshed);
});

router.get("/:userId", (req: Request, res: Response) => {
  const userId = req.params.userId as string;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const state = getOrCreateAccessState(userId);
  if (!state) {
    return res.status(404).json({ error: "Access state not found" });
  }

  return res.json(state);
});

export default router;