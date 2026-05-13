// backend/src/middleware/httpAuth.ts
import crypto from "crypto";
import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest, HttpAuthPrincipal } from "../types/httpAuth";
import { getSessionUserIdFromRequest } from "../routes/sessionRoutes";

function splitCsv(value: string | undefined): string[] {
  return (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function hasRole(req: AuthenticatedRequest, role: string): boolean {
  return Boolean(req.auth?.roles.includes(role as never));
}

function safeHeaderValue(req: AuthenticatedRequest, headerName: string): string | null {
  const value = req.headers[headerName.toLowerCase()];
  if (Array.isArray(value)) return value[0] ?? null;
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function safeCompare(value: string, expected: string): boolean {
  const a = Buffer.from(value);
  const b = Buffer.from(expected);

  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}

function deny(res: Response, status: number, error: string): void {
  res.status(status).json({ error });
}

export function requireSession(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const userId = getSessionUserIdFromRequest(req);

  if (!userId) {
    deny(res, 401, "Authentication required");
    return;
  }

  req.auth = {
    userId,
    roles: ["session-user"],
    source: "session",
  };

  next();
}

export function optionalSession(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void {
  const userId = getSessionUserIdFromRequest(req);

  if (userId) {
    req.auth = {
      userId,
      roles: ["session-user"],
      source: "session",
    };
  }

  next();
}

export function requireOwnerParam(paramName: string) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const userId = getSessionUserIdFromRequest(req);
    const targetUserId = req.params[paramName];

    if (!userId) {
      deny(res, 401, "Authentication required");
      return;
    }

    if (!targetUserId || userId !== targetUserId) {
      deny(res, 403, "Forbidden");
      return;
    }

    req.auth = {
      userId,
      roles: ["session-user"],
      source: "session",
    };

    next();
  };
}

export function requireAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const adminId = safeHeaderValue(req, "x-citadel-admin-id");
  const allowedAdmins = splitCsv(process.env.HTTP_ADMIN_DISCORD_IDS);

  if (!adminId || !allowedAdmins.includes(adminId)) {
    deny(res, 403, "Admin permission required");
    return;
  }

  req.auth = {
    adminId,
    discordId: adminId,
    roles: ["admin"],
    source: "admin-header",
  };

  next();
}

export function requireFounder(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const founderId = safeHeaderValue(req, "x-citadel-admin-id");
  const allowedFounders = splitCsv(process.env.FOUNDER_IDS);

  if (!founderId || !allowedFounders.includes(founderId)) {
    deny(res, 403, "Founder permission required");
    return;
  }

  req.auth = {
    adminId: founderId,
    discordId: founderId,
    roles: ["admin", "founder"],
    source: "founder-header",
  };

  next();
}

export function requireOwnerOrAdmin(paramName: string) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const sessionUserId = getSessionUserIdFromRequest(req);
    const targetUserId = req.params[paramName];

    if (sessionUserId && targetUserId && sessionUserId === targetUserId) {
      req.auth = {
        userId: sessionUserId,
        roles: ["session-user"],
        source: "session",
      };
      next();
      return;
    }

    const adminId = safeHeaderValue(req, "x-citadel-admin-id");
    const allowedAdmins = splitCsv(process.env.HTTP_ADMIN_DISCORD_IDS);

    if (adminId && allowedAdmins.includes(adminId)) {
      req.auth = {
        adminId,
        discordId: adminId,
        roles: ["admin"],
        source: "admin-header",
      };
      next();
      return;
    }

    deny(res, sessionUserId ? 403 : 401, "Owner or admin permission required");
  };
}

export function requireInternalWorker(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const configuredSecret = process.env.INTERNAL_WORKER_SECRET;

  if (process.env.NODE_ENV === "production" && !configuredSecret) {
    deny(res, 500, "Internal worker authentication is not configured");
    return;
  }

  const providedSecret = safeHeaderValue(req, "x-citadel-worker-secret");

  if (!configuredSecret || !providedSecret || !safeCompare(providedSecret, configuredSecret)) {
    deny(res, 403, "Internal worker permission required");
    return;
  }

  const principal: HttpAuthPrincipal = {
    roles: ["internal-worker"],
    source: "internal-worker-secret",
  };

  req.auth = principal;

  next();
}

export function requireProductionDisabled(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const explicitlyEnabled = process.env.DEV_LOGIN_ENABLED === "true";

  if (process.env.NODE_ENV === "production" && !explicitlyEnabled) {
    deny(res, 403, "This route is disabled in production");
    return;
  }

  next();
}
