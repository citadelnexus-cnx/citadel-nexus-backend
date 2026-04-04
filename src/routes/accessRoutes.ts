import express, { Request, Response } from "express";
import {
  getOrCreateAccessState,
  getAllAccessStates,
  getAccessModifiers,
  refreshAccessState,
} from "../services/accessStateService";
import { expireExpiredEntitlements } from "../services/entitlementExpiryService";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const states = await getAllAccessStates();
    return res.json(states);
  } catch (error) {
    console.error("GET /access failed:", error);
    return res.status(500).json({ error: "Failed to fetch access states" });
  }
});

router.post("/expire/run", async (_req: Request, res: Response) => {
  try {
    const result = await expireExpiredEntitlements();
    return res.json(result);
  } catch (error) {
    console.error("POST /access/expire/run failed:", error);
    return res.status(500).json({ error: "Failed to expire entitlements" });
  }
});

router.get("/:userId/modifiers", async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.userId ?? "");

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const modifiers = await getAccessModifiers(userId);
    return res.json(modifiers);
  } catch (error) {
    console.error("GET /access/:userId/modifiers failed:", error);
    return res.status(500).json({ error: "Failed to fetch access modifiers" });
  }
});

router.post("/:userId/refresh", async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.userId ?? "");

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const refreshed = await refreshAccessState(userId);

    if (!refreshed) {
      return res
        .status(404)
        .json({ error: "User not found or access state unavailable" });
    }

    return res.json(refreshed);
  } catch (error) {
    console.error("POST /access/:userId/refresh failed:", error);
    return res.status(500).json({ error: "Failed to refresh access state" });
  }
});

router.get("/:userId", async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.userId ?? "");

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const state = await getOrCreateAccessState(userId);

    if (!state) {
      return res.status(404).json({ error: "Access state not found" });
    }

    return res.json(state);
  } catch (error) {
    console.error("GET /access/:userId failed:", error);
    return res.status(500).json({ error: "Failed to fetch access state" });
  }
});

export default router;