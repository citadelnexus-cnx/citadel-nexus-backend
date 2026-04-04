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

router.post("/create", async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    if (!username || typeof username !== "string") {
      return res.status(400).json({ error: "Valid username is required" });
    }

    const user = await createUser(username);
    return res.json(user);
  } catch (error) {
    console.error("POST /user/create failed:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
});

router.post("/:id/discord", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id ?? "");
    const { discordId, discordTag } = req.body;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (!discordId || typeof discordId !== "string") {
      return res.status(400).json({ error: "Valid discordId is required" });
    }

    if (!discordTag || typeof discordTag !== "string") {
      return res.status(400).json({ error: "Valid discordTag is required" });
    }

    const user = await linkDiscord(id, discordId, discordTag);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("POST /user/:id/discord failed:", error);
    return res.status(500).json({ error: "Failed to link Discord" });
  }
});

router.post("/:id/wallet", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id ?? "");
    const { wallet } = req.body;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (!wallet || typeof wallet !== "string") {
      return res.status(400).json({ error: "Valid wallet is required" });
    }

    const user = await bindWallet(id, wallet);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("POST /user/:id/wallet failed:", error);
    return res.status(500).json({ error: "Failed to bind wallet" });
  }
});

router.get("/:id/payout-ready", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id ?? "");

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await getPayoutReadyUser(id);

    if (!user) {
      return res.status(404).json({ error: "User not payout ready" });
    }

    return res.json(user);
  } catch (error) {
    console.error("GET /user/:id/payout-ready failed:", error);
    return res.status(500).json({ error: "Failed to fetch payout-ready user" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id ?? "");

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await getUser(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("GET /user/:id failed:", error);
    return res.status(500).json({ error: "Failed to fetch user" });
  }
});

router.post("/:id/xp", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id ?? "");
    const { amount } = req.body;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ error: "Valid XP amount is required" });
    }

    const user = await addXP(id, amount);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("POST /user/:id/xp failed:", error);
    return res.status(500).json({ error: "Failed to add XP" });
  }
});

router.get("/:id/balance", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id ?? "");

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await getUser(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const availableCnx = await getAvailableCnx(id);

    return res.json({
      userId: user.id,
      cnxBalance: user.cnxBalance,
      reservedCnx: user.reservedCnx,
      availableCnx: availableCnx ?? 0,
    });
  } catch (error) {
    console.error("GET /user/:id/balance failed:", error);
    return res.status(500).json({ error: "Failed to fetch balance" });
  }
});

export default router;