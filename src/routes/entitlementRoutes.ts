// backend/src/routes/entitlementRoutes.ts
import { Router, Request, Response } from "express";
import { requireAdmin, requireOwnerOrAdmin } from "../middleware/httpAuth";
import {
  getAllEntitlements,
  getEntitlementById,
  getUserEntitlements,
  getUserActiveEntitlements,
} from "../services/entitlementStore";

const router = Router();

router.get("/", requireAdmin, async (_req: Request, res: Response) => {
  try {
    const entitlements = await getAllEntitlements();
    return res.json(entitlements);
  } catch (error) {
    console.error("GET /entitlements failed:", error);
    return res.status(500).json({ error: "Failed to fetch entitlements" });
  }
});

router.get("/user/:userId", requireOwnerOrAdmin("userId"), async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.userId ?? "");

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const entitlements = await getUserEntitlements(userId);
    return res.json(entitlements);
  } catch (error) {
    console.error("GET /entitlements/user/:userId failed:", error);
    return res.status(500).json({ error: "Failed to fetch user entitlements" });
  }
});

router.get("/user/:userId/active", requireOwnerOrAdmin("userId"), async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.userId ?? "");

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const entitlements = await getUserActiveEntitlements(userId);
    return res.json(entitlements);
  } catch (error) {
    console.error(
      "GET /entitlements/user/:userId/active failed:",
      error
    );
    return res
      .status(500)
      .json({ error: "Failed to fetch active user entitlements" });
  }
});

router.get("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id ?? "");

    if (!id) {
      return res.status(400).json({ error: "Entitlement ID is required" });
    }

    const entitlement = await getEntitlementById(id);

    if (!entitlement) {
      return res.status(404).json({ error: "Entitlement not found" });
    }

    return res.json(entitlement);
  } catch (error) {
    console.error("GET /entitlements/:id failed:", error);
    return res.status(500).json({ error: "Failed to fetch entitlement" });
  }
});

export default router;
