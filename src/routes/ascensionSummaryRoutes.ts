//backend/src/routes/ascensionSummaryRoutes.ts
// backend/src/routes/ascensionSummaryRoutes.ts
import express, { Request, Response } from "express";
import { getSessionUserIdFromRequest } from "../services/sessionService";
import {
  getAscensionMemberSummaryByDiscordId,
  getAscensionMemberSummaryByUserId,
  getAscensionPublicCardByDiscordId,
} from "../services/ascensionSummaryService";

const router = express.Router();

function normalizeRouteParam(value: string | string[] | undefined): string | null {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  if (Array.isArray(value) && value.length > 0) {
    const first = value[0];
    if (typeof first === "string" && first.trim()) {
      return first.trim();
    }
  }

  return null;
}

/**
 * GET /ascension-summary/me
 * Internal/member-safe summary for the currently authenticated session user
 */
router.get("/me", async (req: Request, res: Response) => {
  try {
    const userId = getSessionUserIdFromRequest(req);

    if (!userId) {
      return res.status(401).json({
        ok: false,
        error: "No active session.",
      });
    }

    const summary = await getAscensionMemberSummaryByUserId(userId);

    if (!summary) {
      return res.status(200).json({
        ok: true,
        summary: null,
      });
    }

    return res.status(200).json({
      ok: true,
      summary,
    });
  } catch (error) {
    console.error("[ascension-summary][me] error:", error);

    return res.status(500).json({
      ok: false,
      error: "Failed to load ascension summary for current session.",
    });
  }
});

/**
 * GET /ascension-summary/discord/:discordId
 * Internal/member-safe summary by Discord ID
 */
router.get("/discord/:discordId", async (req: Request, res: Response) => {
  try {
    const discordId = normalizeRouteParam(req.params.discordId);

    if (!discordId) {
      return res.status(400).json({
        ok: false,
        error: "Valid discordId is required.",
      });
    }

    const summary = await getAscensionMemberSummaryByDiscordId(discordId);

    if (!summary) {
      return res.status(404).json({
        ok: false,
        error: "Ascension summary not found for that Discord ID.",
      });
    }

    return res.status(200).json({
      ok: true,
      summary,
    });
  } catch (error) {
    console.error("[ascension-summary][discord] error:", error);

    return res.status(500).json({
      ok: false,
      error: "Failed to load ascension summary by Discord ID.",
    });
  }
});

/**
 * GET /ascension-summary/user/:userId
 * Internal/member-safe summary by platform User.id
 */
router.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const userId = normalizeRouteParam(req.params.userId);

    if (!userId) {
      return res.status(400).json({
        ok: false,
        error: "Valid userId is required.",
      });
    }

    const summary = await getAscensionMemberSummaryByUserId(userId);

    if (!summary) {
      return res.status(404).json({
        ok: false,
        error: "Ascension summary not found for that user ID.",
      });
    }

    return res.status(200).json({
      ok: true,
      summary,
    });
  } catch (error) {
    console.error("[ascension-summary][user] error:", error);

    return res.status(500).json({
      ok: false,
      error: "Failed to load ascension summary by user ID.",
    });
  }
});

/**
 * GET /ascension-summary/public/discord/:discordId
 * Public-safe summary card by Discord ID
 */
router.get("/public/discord/:discordId", async (req: Request, res: Response) => {
  try {
    const discordId = normalizeRouteParam(req.params.discordId);

    if (!discordId) {
      return res.status(400).json({
        ok: false,
        error: "Valid discordId is required.",
      });
    }

    const card = await getAscensionPublicCardByDiscordId(discordId);

    if (!card) {
      return res.status(404).json({
        ok: false,
        error: "Ascension public card not found for that Discord ID.",
      });
    }

    return res.status(200).json({
      ok: true,
      card,
    });
  } catch (error) {
    console.error("[ascension-summary][public-discord] error:", error);

    return res.status(500).json({
      ok: false,
      error: "Failed to load ascension public card.",
    });
  }
});

export default router;
