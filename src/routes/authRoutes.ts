// backend/src/routes/authRoutes.ts
import express, { Request, Response } from "express";
import {
  consumeOAuthState,
  createOAuthState,
} from "../services/oauthStateService";

const router = express.Router();

const DISCORD_AUTHORIZE_URL = "https://discord.com/oauth2/authorize";
const DISCORD_TOKEN_URL = "https://discord.com/api/oauth2/token";

const REQUIRED_DISCORD_OAUTH_ENV_KEYS = [
  "DISCORD_CLIENT_ID",
  "DISCORD_CLIENT_SECRET",
  "DISCORD_OAUTH_REDIRECT_URI",
  "DISCORD_OAUTH_SCOPES",
  "FRONTEND_ORIGIN",
] as const;

type RequiredDiscordOAuthEnvKey = (typeof REQUIRED_DISCORD_OAUTH_ENV_KEYS)[number];

type DiscordTokenExchangeResult =
  | {
      ok: true;
      tokenType: string;
      scope: string;
      expiresIn: number;
    }
  | {
      ok: false;
      status: number;
    };

function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

function getMissingEnvKeys(): string[] {
  return REQUIRED_DISCORD_OAUTH_ENV_KEYS.filter((key) => {
    const value = process.env[key];
    return typeof value !== "string" || value.trim().length === 0;
  });
}

function getEnvValue(key: RequiredDiscordOAuthEnvKey): string {
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

function isTokenResponseShape(value: unknown): value is {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
} {
  if (!value || typeof value !== "object") return false;

  const record = value as Record<string, unknown>;

  return (
    typeof record.access_token === "string" &&
    record.access_token.length > 0 &&
    typeof record.token_type === "string" &&
    record.token_type.length > 0 &&
    typeof record.expires_in === "number" &&
    Number.isFinite(record.expires_in)
  );
}

async function exchangeDiscordCodeForToken(
  code: string
): Promise<DiscordTokenExchangeResult> {
  const body = new URLSearchParams({
    client_id: getEnvValue("DISCORD_CLIENT_ID"),
    client_secret: getEnvValue("DISCORD_CLIENT_SECRET"),
    grant_type: "authorization_code",
    code,
    redirect_uri: getEnvValue("DISCORD_OAUTH_REDIRECT_URI"),
  });

  const response = await fetch(DISCORD_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
    };
  }

  const tokenResponse: unknown = await response.json();

  if (!isTokenResponseShape(tokenResponse)) {
    return {
      ok: false,
      status: 502,
    };
  }

  return {
    ok: true,
    tokenType: tokenResponse.token_type,
    scope: tokenResponse.scope || "",
    expiresIn: tokenResponse.expires_in,
  };
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

router.get("/discord/callback", async (req: Request, res: Response) => {
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

  try {
    const tokenExchange = await exchangeDiscordCodeForToken(code);

    if (!tokenExchange.ok) {
      sendFailClosed(res, 502, "Discord OAuth token exchange failed");
      return;
    }

    res.status(501).json({
      message:
        "Discord OAuth token exchange completed, identity lookup is not implemented yet",
    });
  } catch {
    sendFailClosed(res, 502, "Discord OAuth token exchange failed");
  }
});

export default router;
