import express, { Request, Response } from "express";
import { getMemberState } from "../services/memberStateService";
import { getSessionUserIdFromRequest } from "./sessionRoutes";

const router = express.Router();

router.get("/me", async (req: Request, res: Response) => {
  try {
    const userId = getSessionUserIdFromRequest(req);

    if (!userId) {
      return res.status(401).json({ error: "No active session" });
    }

    const state = await getMemberState(userId);

    if (!state) {
      return res.status(404).json({ error: "Member state not found" });
    }

    return res.json(state);
  } catch (error) {
    console.error("GET /member-state/me failed:", error);
    return res.status(500).json({ error: "Failed to fetch member state" });
  }
});

router.get("/:userId", async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.userId ?? "").trim();

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const state = await getMemberState(userId);

    if (!state) {
      return res.status(404).json({ error: "Member state not found" });
    }

    return res.json(state);
  } catch (error) {
    console.error("GET /member-state/:userId failed:", error);
    return res.status(500).json({ error: "Failed to fetch member state" });
  }
});

export default router;