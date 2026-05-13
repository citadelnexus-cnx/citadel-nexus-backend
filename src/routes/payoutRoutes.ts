// backend/src/routes/payoutRoutes.ts
import { Router, Request, Response } from "express";
import { requireAdmin } from "../middleware/httpAuth";
import type { AuthenticatedRequest } from "../types/httpAuth";
import {
  queuePayout,
  approvePayout,
  rejectPayout,
  markPayoutSent,
  confirmPayout,
  failPayout,
  getPayoutById,
  getPayoutLog,
} from "../services/payoutService";

const router = Router();

function getAuthenticatedAdminId(req: Request): string | null {
  return (req as AuthenticatedRequest).auth?.adminId ?? null;
}

router.get("/log/all", requireAdmin, async (_req: Request, res: Response) => {
  try {
    const log = await getPayoutLog();
    return res.json(log);
  } catch (error) {
    console.error("GET /payout/log/all failed:", error);
    return res.status(500).json({ error: "Failed to fetch payout log" });
  }
});

router.post("/:userId/queue", requireAdmin, async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.userId ?? "");

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const payout = await queuePayout(userId);

    if (!payout) {
      return res
        .status(404)
        .json({ error: "User not payout ready or below threshold" });
    }

    return res.json(payout);
  } catch (error) {
    console.error("POST /payout/:userId/queue failed:", error);
    return res.status(500).json({ error: "Failed to queue payout" });
  }
});

router.post("/:payoutId/approve", requireAdmin, async (req: Request, res: Response) => {
  try {
    const payoutId = String(req.params.payoutId ?? "");
    const adminId = getAuthenticatedAdminId(req);

    if (!payoutId) {
      return res.status(400).json({ error: "Payout ID is required" });
    }

    if (!adminId) {
      return res.status(403).json({ error: "Admin permission required" });
    }

    const result = await approvePayout(payoutId, adminId);

    if (!result) {
      return res.status(404).json({ error: "Payout not found" });
    }

    if ("error" in result) {
      return res.status(400).json(result);
    }

    return res.json(result);
  } catch (error) {
    console.error("POST /payout/:payoutId/approve failed:", error);
    return res.status(500).json({ error: "Failed to approve payout" });
  }
});

router.post("/:payoutId/reject", requireAdmin, async (req: Request, res: Response) => {
  try {
    const payoutId = String(req.params.payoutId ?? "");
    const { reason } = req.body;
    const adminId = getAuthenticatedAdminId(req);

    if (!payoutId) {
      return res.status(400).json({ error: "Payout ID is required" });
    }

    if (!adminId) {
      return res.status(403).json({ error: "Admin permission required" });
    }

    if (!reason || typeof reason !== "string") {
      return res.status(400).json({ error: "Valid rejection reason is required" });
    }

    const result = await rejectPayout(payoutId, reason, adminId);

    if (!result) {
      return res.status(404).json({ error: "Payout not found" });
    }

    if ("error" in result) {
      return res.status(400).json(result);
    }

    return res.json(result);
  } catch (error) {
    console.error("POST /payout/:payoutId/reject failed:", error);
    return res.status(500).json({ error: "Failed to reject payout" });
  }
});

router.post("/:payoutId/send", requireAdmin, async (req: Request, res: Response) => {
  try {
    const payoutId = String(req.params.payoutId ?? "");
    const { txId } = req.body;

    if (!payoutId) {
      return res.status(400).json({ error: "Payout ID is required" });
    }

    if (!txId || typeof txId !== "string") {
      return res.status(400).json({ error: "Valid txId is required" });
    }

    const result = await markPayoutSent(payoutId, txId);

    if (!result) {
      return res.status(404).json({ error: "Payout not found" });
    }

    if ("error" in result) {
      return res.status(400).json(result);
    }

    return res.json(result);
  } catch (error) {
    console.error("POST /payout/:payoutId/send failed:", error);
    return res.status(500).json({ error: "Failed to mark payout as sent" });
  }
});

router.post("/:payoutId/confirm", requireAdmin, async (req: Request, res: Response) => {
  try {
    const payoutId = String(req.params.payoutId ?? "");

    if (!payoutId) {
      return res.status(400).json({ error: "Payout ID is required" });
    }

    const result = await confirmPayout(payoutId);

    if (!result) {
      return res.status(404).json({ error: "Payout not found" });
    }

    if ("error" in result) {
      return res.status(400).json(result);
    }

    return res.json(result);
  } catch (error) {
    console.error("POST /payout/:payoutId/confirm failed:", error);
    return res.status(500).json({ error: "Failed to confirm payout" });
  }
});

router.post("/:payoutId/fail", requireAdmin, async (req: Request, res: Response) => {
  try {
    const payoutId = String(req.params.payoutId ?? "");
    const { reason } = req.body;

    if (!payoutId) {
      return res.status(400).json({ error: "Payout ID is required" });
    }

    if (!reason || typeof reason !== "string") {
      return res.status(400).json({ error: "Valid failure reason is required" });
    }

    const result = await failPayout(payoutId, reason);

    if (!result) {
      return res.status(404).json({ error: "Payout not found" });
    }

    if ("error" in result) {
      return res.status(400).json(result);
    }

    return res.json(result);
  } catch (error) {
    console.error("POST /payout/:payoutId/fail failed:", error);
    return res.status(500).json({ error: "Failed to fail payout" });
  }
});

router.get("/:payoutId", requireAdmin, async (req: Request, res: Response) => {
  try {
    const payoutId = String(req.params.payoutId ?? "");

    if (!payoutId) {
      return res.status(400).json({ error: "Payout ID is required" });
    }

    const payout = await getPayoutById(payoutId);

    if (!payout) {
      return res.status(404).json({ error: "Payout not found" });
    }

    return res.json(payout);
  } catch (error) {
    console.error("GET /payout/:payoutId failed:", error);
    return res.status(500).json({ error: "Failed to fetch payout" });
  }
});

export default router;
