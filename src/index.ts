//backend/src/index.ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import tokenRoutes from "./routes/tokenRoutes";
import userRoutes from "./routes/userRoutes";
import payoutRoutes from "./routes/payoutRoutes";
import accessRoutes from "./routes/accessRoutes";
import tempAccessRoutes from "./routes/tempAccessRoutes";
import entitlementRoutes from "./routes/entitlementRoutes";
import roleSyncRoutes from "./routes/roleSyncRoutes";
import discordSyncWorkerRoutes from "./routes/discordSyncWorkerRoutes";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use("/user", userRoutes);

app.use("/payout", payoutRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Citadel Nexus Backend Running");
});

app.use("/token", tokenRoutes);

app.use("/access", accessRoutes);

app.use("/temp-access", tempAccessRoutes);

app.use("/entitlements", entitlementRoutes);

app.use("/role-sync", roleSyncRoutes);

app.use("/discord-sync-worker", discordSyncWorkerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});