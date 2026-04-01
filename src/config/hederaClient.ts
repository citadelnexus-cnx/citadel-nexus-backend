import { Client, PrivateKey, AccountId } from "@hashgraph/sdk";
import dotenv from "dotenv";

dotenv.config();

export function getHederaClient(): Client {
  const operatorId = AccountId.fromString(process.env.OPERATOR_ID!);
  const operatorKey = PrivateKey.fromStringECDSA(process.env.OPERATOR_KEY!);

  const client = Client.forTestnet();
  client.setOperator(operatorId, operatorKey);

  return client;
}