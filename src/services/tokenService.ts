import { TokenInfoQuery } from "@hashgraph/sdk";
import { getHederaClient } from "../config/hederaClient";

const TOKEN_ID = "0.0.8315924";

export async function getTokenInfo() {
  const client = getHederaClient();

  const info = await new TokenInfoQuery()
    .setTokenId(TOKEN_ID)
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