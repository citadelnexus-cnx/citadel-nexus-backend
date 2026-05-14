// backend/src/routes/tempAccessRoutes.ts
import { Router, Request, Response } from "express";
import { requireOwnerOrAdmin } from "../middleware/httpAuth";
import { purchaseTemporaryAccess } from "../services/tempAccessService";

const router = Router();

router.post("/:id/purchase", requireOwnerOrAdmin("id"), async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id ?? "").trim();
    const { accessType } = req.body;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (!accessType || typeof accessType !== "string") {
      return res.status(400).json({ error: "Valid accessType is required" });
    }

    const result = await purchaseTemporaryAccess(id, accessType);

    if (!result) {
      return res.status(400).json({
        error: "Unable to purchase temporary access. Check CNX balance or active pass status.",
      });
    }

    return res.json(result);
  } catch (error) {
    console.error("POST /temp-access/:id/purchase failed:", error);
    return res.status(500).json({ error: "Failed to purchase temporary access" });
  }
});

export default router;
