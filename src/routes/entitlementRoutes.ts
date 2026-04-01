// backend/src/routes/entitlementRoutes.ts
import { Router, Request, Response } from "express";
import {
  getAllEntitlements,
  getEntitlementById,
  getUserEntitlements,
  getUserActiveEntitlements,
} from "../services/entitlementStore";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json(getAllEntitlements());
});

router.get("/user/:userId", (req: Request, res: Response) => {
  const userId = req.params.userId as string;
  res.json(getUserEntitlements(userId));
});

router.get("/user/:userId/active", (req: Request, res: Response) => {
  const userId = req.params.userId as string;
  res.json(getUserActiveEntitlements(userId));
});

router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id as string;
  const entitlement = getEntitlementById(id);

  if (!entitlement) {
    return res.status(404).json({ error: "Entitlement not found" });
  }

  res.json(entitlement);
});

export default router;