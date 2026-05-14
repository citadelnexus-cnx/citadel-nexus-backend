import { AccountId, Client, PrivateKey } from "@hashgraph/sdk";
import dotenv from "dotenv";

dotenv.config();

export type HederaNetwork = "testnet" | "mainnet";

export class HederaConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HederaConfigError";
  }
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new HederaConfigError(`Missing required Hedera environment variable: ${name}`);
  }

  return value;
}

export function getHederaNetwork(): HederaNetwork {
  const value = (process.env.HEDERA_NETWORK || "testnet").trim().toLowerCase();

  if (value !== "testnet" && value !== "mainnet") {
    throw new HederaConfigError("HEDERA_NETWORK must be either testnet or mainnet");
  }

  return value;
}

export function getHederaClient(): Client {
  const operatorId = AccountId.fromString(requiredEnv("HEDERA_OPERATOR_ID"));
  const operatorKey = PrivateKey.fromString(requiredEnv("HEDERA_OPERATOR_PRIVATE_KEY"));

  const client =
    getHederaNetwork() === "mainnet" ? Client.forMainnet() : Client.forTestnet();

  client.setOperator(operatorId, operatorKey);

  return client;
}
