import { TokenInfoQuery } from "@hashgraph/sdk";
import { getHederaClient, HederaConfigError } from "../config/hederaClient";

function getTokenId(): string {
  const tokenId = process.env.HEDERA_TOKEN_ID?.trim();

  if (!tokenId) {
    throw new HederaConfigError("Missing required Hedera environment variable: HEDERA_TOKEN_ID");
  }

  return tokenId;
}

export async function getTokenInfo() {
  const client = getHederaClient();

  const info = await new TokenInfoQuery()
    .setTokenId(getTokenId())
    .execute(client);

  return {
    name: info.name,
    symbol: info.symbol,
    tokenId: info.tokenId.toString(),
    decimals: info.decimals,
    totalSupply: info.totalSupply.toString(),
    treasury: info.treasuryAccountId ? info.treasuryAccountId.toString() : null,
    maxSupply: info.maxSupply ? info.maxSupply.toString() : null,
  };
}
