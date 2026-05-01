//backend/src/routes/sessionRoutes.ts
import crypto from "node:crypto";
import express, { Request, Response } from "express";
import { createUser, getUser, getUserByUsername } from "../services/userService";

const router = express.Router();

const SESSION_COOKIE_NAME = "cnx_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

type DevSessionRecord = {
  token: string;
  userId: string;
  createdAt: number;
  expiresAt: number;
};

const devSessionStore = new Map<string, DevSessionRecord>();

function parseCookies(req: Request): Record<string, string> {
  const header = req.headers.cookie;
  if (!header) return {};

  return header
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, pair) => {
      const eqIndex = pair.indexOf("=");
      if (eqIndex === -1) return acc;

      const key = decodeURIComponent(pair.slice(0, eqIndex).trim());
      const value = decodeURIComponent(pair.slice(eqIndex + 1).trim());
      acc[key] = value;
      return acc;
    }, {});
}

function buildCookieValue(token: string, maxAgeMs: number): string {
  const isProd = process.env.NODE_ENV === "production";

  return [
    `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    isProd ? "Secure" : null,
    `Max-Age=${Math.floor(maxAgeMs / 1000)}`,
  ]
    .filter(Boolean)
    .join("; ");
}

function buildExpiredCookieValue(): string {
  const isProd = process.env.NODE_ENV === "production";

  return [
    `${SESSION_COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    isProd ? "Secure" : null,
    "Max-Age=0",
  ]
    .filter(Boolean)
    .join("; ");
}

function createSession(userId: string): DevSessionRecord {
  const token = crypto.randomBytes(32).toString("hex");
  const now = Date.now();

  const record: DevSessionRecord = {
    token,
    userId,
    createdAt: now,
    expiresAt: now + SESSION_TTL_MS,
  };

  devSessionStore.set(token, record);
  return record;
}

function getSessionRecordFromRequest(req: Request): DevSessionRecord | null {
  const cookies = parseCookies(req);
  const token = cookies[SESSION_COOKIE_NAME];

  if (!token) return null;

  const record = devSessionStore.get(token);
  if (!record) return null;

  if (record.expiresAt <= Date.now()) {
    devSessionStore.delete(token);
    return null;
  }

  return record;
}

export function getSessionUserIdFromRequest(req: Request): string | null {
  const record = getSessionRecordFromRequest(req);
  return record?.userId ?? null;
}

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
    const cookies = parseCookies(req);
    const token = cookies[SESSION_COOKIE_NAME];

    if (token) {
      devSessionStore.delete(token);
    }

    res.setHeader("Set-Cookie", buildExpiredCookieValue());

    return res.json({
      ok: true,
    });
  } catch (error) {
    console.error("POST /session/logout failed:", error);
    return res.status(500).json({ error: "Failed to clear session" });
  }
});

export default router;