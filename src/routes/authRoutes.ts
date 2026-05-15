// backend/src/routes/authRoutes.ts
import express, { Request, Response } from "express";

const router = express.Router();

const REQUIRED_DISCORD_OAUTH_ENV_KEYS = [
  "DISCORD_CLIENT_ID",
  "DISCORD_CLIENT_SECRET",
  "DISCORD_OAUTH_REDIRECT_URI",
  "DISCORD_OAUTH_SCOPES",
  "FRONTEND_ORIGIN",
] as const;

function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

function getMissingEnvKeys(): string[] {
  return REQUIRED_DISCORD_OAUTH_ENV_KEYS.filter((key) => {
    const value = process.env[key];
    return typeof value !== "string" || value.trim().length === 0;
  });
}

function sendFailClosed(
  res: Response,
  status: number,
  error: string,
  missingEnvKeys: string[] = []
): void {
  const body: {
    error: string;
    missingEnvKeys?: string[];
  } = { error };

  if (!isProduction() && missingEnvKeys.length > 0) {
    body.missingEnvKeys = missingEnvKeys;
  }

  res.status(status).json(body);
}

router.get("/discord/start", (_req: Request, res: Response) => {
  const missingEnvKeys = getMissingEnvKeys();

  if (missingEnvKeys.length > 0) {
    sendFailClosed(res, 503, "Discord OAuth is not configured", missingEnvKeys);
    return;
  }

  sendFailClosed(
    res,
    501,
    "Discord OAuth start route is registered, but OAuth state protection is not implemented yet"
  );
});

router.get("/discord/callback", (req: Request, res: Response) => {
  const missingEnvKeys = getMissingEnvKeys();

  if (missingEnvKeys.length > 0) {
    sendFailClosed(res, 503, "Discord OAuth is not configured", missingEnvKeys);
    return;
  }

  const code = typeof req.query.code === "string" ? req.query.code.trim() : "";
  const state = typeof req.query.state === "string" ? req.query.state.trim() : "";

  if (!code || !state) {
    sendFailClosed(res, 400, "Invalid Discord OAuth callback");
    return;
  }

  sendFailClosed(
    res,
    501,
    "Discord OAuth callback route is registered, but token exchange is not implemented yet"
  );
});

export default router;
