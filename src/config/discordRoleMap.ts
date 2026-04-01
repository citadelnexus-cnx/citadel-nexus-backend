// backend/src/config/discordRoleMap.ts

export const DISCORD_ROLE_KEYS = Object.freeze({
  CNX_HOLDER: "cnx_holder",
  CNX_HOLDER_TIER_1: "cnx_holder_tier_1",
  CNX_HOLDER_TIER_2: "cnx_holder_tier_2",
  CNX_HOLDER_TIER_3: "cnx_holder_tier_3",
  TEMP_PREMIUM_ALPHA: "temp_premium_alpha",
} as const);

export type BackendRoleKey =
  (typeof DISCORD_ROLE_KEYS)[keyof typeof DISCORD_ROLE_KEYS];

export type DiscordRoleMap = Record<BackendRoleKey, string>;

export const discordRoleMap: DiscordRoleMap = {
  cnx_holder: "1484138333788704878",
  cnx_holder_tier_1: "1486299725056446524",
  cnx_holder_tier_2: "1486299823257948191",
  cnx_holder_tier_3: "1486299865322491914",
  temp_premium_alpha: "1486300614957994054",
};

export function getAllMappedBackendRoleKeys(): BackendRoleKey[] {
  return Object.keys(discordRoleMap) as BackendRoleKey[];
}

export function getDiscordRoleIdForKey(roleKey: BackendRoleKey): string | null {
  const value = discordRoleMap[roleKey];
  return value || null;
}

export function validateDiscordRoleMap(): {
  isValid: boolean;
  missingKeys: BackendRoleKey[];
} {
  const missingKeys = getAllMappedBackendRoleKeys().filter((key) => {
    const roleId = discordRoleMap[key];
    return !roleId || roleId.trim() === "";
  });

  return {
    isValid: missingKeys.length === 0,
    missingKeys,
  };
}