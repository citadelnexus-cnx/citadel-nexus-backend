// backend/src/types/httpAuth.ts
import type { Request } from "express";

export type HttpAuthRole = "public" | "session-user" | "admin" | "founder" | "internal-worker";

export type HttpAuthSource =
  | "session"
  | "admin-header"
  | "founder-header"
  | "internal-worker-secret"
  | "none";

export type HttpAuthPrincipal = {
  userId?: string;
  adminId?: string;
  discordId?: string;
  roles: HttpAuthRole[];
  source: HttpAuthSource;
};

export type AuthenticatedRequest = Request & {
  auth?: HttpAuthPrincipal;
};
