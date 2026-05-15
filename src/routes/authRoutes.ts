// backend/src/routes/authRoutes.ts
import express, { Request, Response } from "express";
import {
  consumeOAuthState,
  createOAuthState,
} from "../services/oauthStateService";

const router = express.Router();

const DISCORD_AUTHORIZE_URL = "https://discord.com/oauth2/authorize";

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

function getEnvValue(key: (typeof REQUIRED_DISCORD_OAUTH_ENV_KEYS)[number]): string {
  return String(process.env[key] || "").trim();
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

function buildDiscordAuthorizeUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: getEnvValue("DISCORD_CLIENT_ID"),
    redirect_uri: getEnvValue("DISCORD_OAUTH_REDIRECT_URI"),
    response_type: "code",
    scope: getEnvValue("DISCORD_OAUTH_SCOPES"),
    state,
  });

  return `${DISCORD_AUTHORIZE_URL}?${params.toString()}`;
}

router.get("/discord/start", (_req: Request, res: Response) => {
  const missingEnvKeys = getMissingEnvKeys();

  if (missingEnvKeys.length > 0) {
    sendFailClosed(res, 503, "Discord OAuth is not configured", missingEnvKeys);
    return;
  }

  const oauthState = createOAuthState();
  const redirectUrl = buildDiscordAuthorizeUrl(oauthState.state);

  res.redirect(302, redirectUrl);
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

  const isValidState = consumeOAuthState(state);

  if (!isValidState) {
    sendFailClosed(res, 400, "Invalid Discord OAuth state");
    return;
  }

  sendFailClosed(
    res,
    501,
    "Discord OAuth callback state is valid, but token exchange is not implemented yet"
  );
});

export default router;
