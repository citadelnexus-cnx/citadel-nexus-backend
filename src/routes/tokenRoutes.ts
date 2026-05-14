import { Router, Request, Response } from "express";
import { HederaConfigError } from "../config/hederaClient";
import { getTokenInfo } from "../services/tokenService";

const router = Router();

router.get("/info", async (_req: Request, res: Response) => {
  try {
    const data = await getTokenInfo();
    res.json(data);
  } catch (err) {
    if (err instanceof HederaConfigError) {
      console.warn("GET /token/info configuration unavailable:", err.message);
      return res.status(503).json({
        error: "Token info temporarily unavailable",
        reason: "Hedera configuration unavailable",
      });
    }

    console.error("GET /token/info failed:", err);
    return res.status(500).json({ error: "Failed to fetch token info" });
  }
});

export default router;