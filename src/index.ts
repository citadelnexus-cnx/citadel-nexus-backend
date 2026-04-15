import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

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

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Citadel Nexus Backend Running");
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});