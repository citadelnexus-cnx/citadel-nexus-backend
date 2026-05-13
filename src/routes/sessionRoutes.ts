// backend/src/routes/sessionRoutes.ts
import express, { Request, Response } from "express";
import { createUser, getUser, getUserByUsername } from "../services/userService";
import {
  SESSION_TTL_MS,
  buildCookieValue,
  buildExpiredCookieValue,
  createSession,
  deleteSessionFromRequest,
  getSessionUserIdFromRequest,
} from "../services/sessionService";

const router = express.Router();

router.post("/dev-login", async (req: Request, res: Response) => {
  try {
    const body = req.body ?? {};
    const providedUserId =
      typeof body.userId === "string" ? body.userId.trim() : "";
    const providedUsername =
      typeof body.username === "string" ? body.username.trim() : "";

    let user = null;

    if (providedUserId) {
      user = await getUser(providedUserId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
    } else if (providedUsername) {
      user = await getUserByUsername(providedUsername);

      if (!user) {
        user = await createUser(providedUsername);
      }
    } else {
      return res.status(400).json({
        error: "Either userId or username is required",
      });
    }

    const session = createSession(user.id);

    res.setHeader("Set-Cookie", buildCookieValue(session.token, SESSION_TTL_MS));

    return res.json({
      ok: true,
      sessionUserId: user.id,
      user,
      expiresAt: new Date(session.expiresAt).toISOString(),
    });
  } catch (error) {
    console.error("POST /session/dev-login failed:", error);
    return res.status(500).json({ error: "Failed to create session" });
  }
});

router.get("/me", async (req: Request, res: Response) => {
  try {
    const userId = getSessionUserIdFromRequest(req);

    if (!userId) {
      return res.status(401).json({ error: "No active session" });
    }

    const user = await getUser(userId);

    if (!user) {
      res.setHeader("Set-Cookie", buildExpiredCookieValue());
      return res.status(404).json({ error: "Session user not found" });
    }

    return res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.error("GET /session/me failed:", error);
    return res.status(500).json({ error: "Failed to resolve session" });
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  try {
    deleteSessionFromRequest(req);

    res.setHeader("Set-Cookie", buildExpiredCookieValue());

    return res.json({
      ok: true,
    });
  } catch (error) {
    console.error("POST /session/logout failed:", error);
    return res.status(500).json({ error: "Failed to clear session" });
  }
});

export { getSessionUserIdFromRequest };
export default router;
