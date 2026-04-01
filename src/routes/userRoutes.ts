// backend/src/routes/userRoues.ts
import { Router, Request, Response } from "express";
import {
  createUser,
  getUser,
  addXP,
  linkDiscord,
  bindWallet,
  getPayoutReadyUser,
  getAvailableCnx,
} from "../services/userService";

const router = Router();

router.post("/create", (req: Request, res: Response) => {
  const { username } = req.body;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ error: "Valid username is required" });
  }

  const user = createUser(username);
  res.json(user);
});

router.post("/:id/discord", (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { discordId, discordTag } = req.body;

  if (!discordId || typeof discordId !== "string") {
    return res.status(400).json({ error: "Valid discordId is required" });
  }

  if (!discordTag || typeof discordTag !== "string") {
    return res.status(400).json({ error: "Valid discordTag is required" });
  }

  const user = linkDiscord(id, discordId, discordTag);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

router.post("/:id/wallet", (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { wallet } = req.body;

  if (!wallet || typeof wallet !== "string") {
    return res.status(400).json({ error: "Valid wallet is required" });
  }

  const user = bindWallet(id, wallet);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

router.get("/:id/payout-ready", (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = getPayoutReadyUser(id);

  if (!user) {
    return res.status(404).json({ error: "User not payout ready" });
  }

  res.json(user);
});

router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = getUser(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

router.post("/:id/xp", (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { amount } = req.body;

  if (typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "Valid XP amount is required" });
  }

  const user = addXP(id, amount);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

router.get("/:id/balance", (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = getUser(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({
    userId: user.id,
    cnxBalance: user.cnxBalance,
    reservedCnx: user.reservedCnx,
    availableCnx: user.cnxBalance - user.reservedCnx,
  });
});

export default router;