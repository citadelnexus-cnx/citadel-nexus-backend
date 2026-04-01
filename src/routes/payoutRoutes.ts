// backend/src/routes/payoutRoutes.ts

import { Router, Request, Response } from "express";
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

router.post("/:userId/queue", (req: Request, res: Response) => {
  const userId = req.params.userId as string;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const payout = queuePayout(userId);

  if (!payout) {
    return res
      .status(404)
      .json({ error: "User not payout ready or below threshold" });
  }

  res.json(payout);
});

router.post("/:payoutId/approve", (req: Request, res: Response) => {
  const payoutId = req.params.payoutId as string;
  const { adminId } = req.body;

  if (!payoutId) {
    return res.status(400).json({ error: "Payout ID is required" });
  }

  if (!adminId || typeof adminId !== "string") {
    return res.status(400).json({ error: "Valid adminId is required" });
  }

  const result = approvePayout(payoutId, adminId);

  if (!result) {
    return res.status(404).json({ error: "Payout not found" });
  }

  if ("error" in result) {
    return res.status(400).json(result);
  }

  res.json(result);
});

router.post("/:payoutId/reject", (req: Request, res: Response) => {
  const payoutId = req.params.payoutId as string;
  const { reason, adminId } = req.body;

  if (!payoutId) {
    return res.status(400).json({ error: "Payout ID is required" });
  }

  if (!reason || typeof reason !== "string") {
    return res.status(400).json({ error: "Valid rejection reason is required" });
  }

  const result = rejectPayout(
    payoutId,
    reason,
    typeof adminId === "string" ? adminId : undefined
  );

  if (!result) {
    return res.status(404).json({ error: "Payout not found" });
  }

  if ("error" in result) {
    return res.status(400).json(result);
  }

  res.json(result);
});

router.post("/:payoutId/send", (req: Request, res: Response) => {
  const payoutId = req.params.payoutId as string;
  const { txId } = req.body;

  if (!payoutId) {
    return res.status(400).json({ error: "Payout ID is required" });
  }

  if (!txId || typeof txId !== "string") {
    return res.status(400).json({ error: "Valid txId is required" });
  }

  const result = markPayoutSent(payoutId, txId);

  if (!result) {
    return res.status(404).json({ error: "Payout not found" });
  }

  if ("error" in result) {
    return res.status(400).json(result);
  }

  res.json(result);
});

router.post("/:payoutId/confirm", (req: Request, res: Response) => {
  const payoutId = req.params.payoutId as string;

  if (!payoutId) {
    return res.status(400).json({ error: "Payout ID is required" });
  }

  const result = confirmPayout(payoutId);

  if (!result) {
    return res.status(404).json({ error: "Payout not found" });
  }

  if ("error" in result) {
    return res.status(400).json(result);
  }

  res.json(result);
});

router.post("/:payoutId/fail", (req: Request, res: Response) => {
  const payoutId = req.params.payoutId as string;
  const { reason } = req.body;

  if (!payoutId) {
    return res.status(400).json({ error: "Payout ID is required" });
  }

  if (!reason || typeof reason !== "string") {
    return res.status(400).json({ error: "Valid failure reason is required" });
  }

  const result = failPayout(payoutId, reason);

  if (!result) {
    return res.status(404).json({ error: "Payout not found" });
  }

  if ("error" in result) {
    return res.status(400).json(result);
  }

  res.json(result);
});

router.get("/:payoutId", (req: Request, res: Response) => {
  const payoutId = req.params.payoutId as string;

  if (!payoutId) {
    return res.status(400).json({ error: "Payout ID is required" });
  }

  const payout = getPayoutById(payoutId);

  if (!payout) {
    return res.status(404).json({ error: "Payout not found" });
  }

  res.json(payout);
});

router.get("/log/all", (_req: Request, res: Response) => {
  res.json(getPayoutLog());
});

router.get("/:payoutId", (req: Request, res: Response) => {
  const payoutId = req.params.payoutId as string;

  if (!payoutId) {
    return res.status(400).json({ error: "Payout ID is required" });
  }

  const payout = getPayoutById(payoutId);

  if (!payout) {
    return res.status(404).json({ error: "Payout not found" });
  }

  res.json(payout);
});

export default router;