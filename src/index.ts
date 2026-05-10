//backend/src/index.ts
import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";

import tokenRoutes from "./routes/tokenRoutes";
import userRoutes from "./routes/userRoutes";
import payoutRoutes from "./routes/payoutRoutes";
import accessRoutes from "./routes/accessRoutes";
import tempAccessRoutes from "./routes/tempAccessRoutes";
import entitlementRoutes from "./routes/entitlementRoutes";
import roleSyncRoutes from "./routes/roleSyncRoutes";
import discordSyncWorkerRoutes from "./routes/discordSyncWorkerRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import memberStateRoutes from "./routes/memberStateRoutes";
import ascensionSummaryRoutes from "./routes/ascensionSummaryRoutes";

const app = express();

const PORT = Number(process.env.BACKEND_PORT || process.env.PORT || 3001);

const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  process.env.FRONTEND_ORIGIN ||
  "http://localhost:3000"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Citadel Nexus Backend Running");
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    service: "citadel-backend",
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "unknown",
  });
});

app.get("/health/db", async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      ok: true,
      service: "citadel-database",
      status: "connected",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "unknown",
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    res.status(503).json({
      ok: false,
      service: "citadel-database",
      status: "unavailable",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "unknown",
    });
  }
});

app.use("/user", userRoutes);
app.use("/payout", payoutRoutes);
app.use("/token", tokenRoutes);
app.use("/access", accessRoutes);
app.use("/temp-access", tempAccessRoutes);
app.use("/entitlements", entitlementRoutes);
app.use("/role-sync", roleSyncRoutes);
app.use("/discord-sync-worker", discordSyncWorkerRoutes);
app.use("/session", sessionRoutes);
app.use("/member-state", memberStateRoutes);
app.use("/ascension-summary", ascensionSummaryRoutes);

// Bot Ascension Discord runtime disabled for API production host.
// Start Ascension separately with its own PM2 process after backend API is stable.
// require("./modules/ascension/runtime/bot-entry");

const HOST = process.env.BACKEND_HOST || "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});
