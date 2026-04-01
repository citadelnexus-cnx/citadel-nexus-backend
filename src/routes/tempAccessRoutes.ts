// backend/src/routes/tempAccessRoutes.ts
import { Router, Request, Response } from "express";
import { purchaseTemporaryAccess } from "../services/tempAccessService";

const router = Router();

router.post("/:id/purchase", (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { accessType } = req.body;

  if (!accessType || typeof accessType !== "string") {
    return res.status(400).json({ error: "Valid accessType is required" });
  }

  const result = purchaseTemporaryAccess(id, accessType as "premium_alpha" | "partner_offers");

  if (!result) {
    return res.status(400).json({
      error: "Unable to purchase temporary access. Check CNX balance or active pass status.",
    });
  }

  res.json(result);
});

export default router;