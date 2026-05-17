import { AccountId, Client, PrivateKey } from "@hashgraph/sdk";
import dotenv from "dotenv";

dotenv.config();

export type HederaNetwork = "testnet" | "mainnet";
export type HederaOperatorKeyType = "ECDSA" | "ED25519" | "AUTO";

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

export function getHederaOperatorKeyType(): HederaOperatorKeyType {
  const value = (process.env.HEDERA_OPERATOR_KEY_TYPE || "ECDSA")
    .trim()
    .toUpperCase();

  if (value !== "ECDSA" && value !== "ED25519" && value !== "AUTO") {
    throw new HederaConfigError(
      "HEDERA_OPERATOR_KEY_TYPE must be ECDSA, ED25519, or AUTO"
    );
  }

  return value;
}

export function parseHederaPrivateKey(rawKey: string): PrivateKey {
  const keyType = getHederaOperatorKeyType();

  if (keyType === "ECDSA") {
    return PrivateKey.fromStringECDSA(rawKey);
  }

  if (keyType === "ED25519") {
    return PrivateKey.fromStringED25519(rawKey);
  }

  return PrivateKey.fromString(rawKey);
}

export function getHederaClient(): Client {
  const operatorId = AccountId.fromString(requiredEnv("HEDERA_OPERATOR_ID"));
  const operatorKey = parseHederaPrivateKey(
    requiredEnv("HEDERA_OPERATOR_PRIVATE_KEY")
  );

  const client =
    getHederaNetwork() === "mainnet" ? Client.forMainnet() : Client.forTestnet();

  client.setOperator(operatorId, operatorKey);

  return client;
}
