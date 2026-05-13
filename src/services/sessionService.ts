// backend/src/services/sessionService.ts
import crypto from "node:crypto";
import type { Request } from "express";

export const SESSION_COOKIE_NAME = "cnx_session";
export const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

export type DevSessionRecord = {
  token: string;
  userId: string;
  createdAt: number;
  expiresAt: number;
};

const devSessionStore = new Map<string, DevSessionRecord>();

export function parseCookies(req: Request): Record<string, string> {
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

export function buildCookieValue(token: string, maxAgeMs: number): string {
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

export function buildExpiredCookieValue(): string {
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

export function createSession(userId: string): DevSessionRecord {
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

export function getSessionRecordFromRequest(
  req: Request
): DevSessionRecord | null {
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

export function deleteSessionFromRequest(req: Request): void {
  const cookies = parseCookies(req);
  const token = cookies[SESSION_COOKIE_NAME];

  if (token) {
    devSessionStore.delete(token);
  }
}
