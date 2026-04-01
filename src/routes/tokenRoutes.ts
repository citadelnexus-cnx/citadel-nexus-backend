import { Router, Request, Response } from "express";
import { getTokenInfo } from "../services/tokenService";

const router = Router();

router.get("/info", async (_req: Request, res: Response) => {
  try {
    const data = await getTokenInfo();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch token info" });
  }
});

export default router;