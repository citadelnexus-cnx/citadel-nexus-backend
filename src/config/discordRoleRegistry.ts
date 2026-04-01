// backend/src/config/discordRoleRegistry.ts

export const DISCORD_ROLE_REGISTRY = Object.freeze({
  FOUNDER: {
    key: "founder",
    id: "1484296944833663026",
    displayName: "Founder",
    managedByBackend: false,
    category: "authority",
  },
  MODERATOR: {
    key: "moderator",
    id: "1484296110330871818",
    displayName: "Moderator",
    managedByBackend: false,
    category: "authority",
  },
  MEMBER: {
    key: "member",
    id: "1389883525251072021",
    displayName: "Member",
    managedByBackend: false,
    category: "identity",
  },
  GENESIS: {
    key: "genesis",
    id: "1486385504063717607",
    displayName: "Genesis",
    managedByBackend: false,
    category: "cosmetic",
  },
  CITIZEN: {
    key: "citizen",
    id: "1484152641985450054",
    displayName: "Citizen",
    managedByBackend: false,
    category: "progression",
  },
  BUILDER: {
    key: "builder",
    id: "1484152871850213376",
    displayName: "Builder",
    managedByBackend: false,
    category: "progression",
  },
  GUARDIAN: {
    key: "guardian",
    id: "1484153002158719170",
    displayName: "Guardian",
    managedByBackend: false,
    category: "progression",
  },
  ARCHITECT: {
    key: "architect",
    id: "1484153060463869952",
    displayName: "Architect",
    managedByBackend: false,
    category: "progression",
  },
  ELITE: {
    key: "elite",
    id: "1484138559970742315",
    displayName: "Elite",
    managedByBackend: false,
    category: "progression",
  },
  CNX_HOLDER: {
    key: "cnx_holder",
    id: "1484138333788704878",
    displayName: "CNX Holder",
    managedByBackend: true,
    category: "utility",
  },
  NEXUS_HOLDER: {
    key: "nexus_holder",
    id: "1484138442991337593",
    displayName: "Nexus Holder",
    managedByBackend: false,
    category: "utility",
  },
  PREMIUM: {
    key: "premium",
    id: "1485197214388326541",
    displayName: "Premium",
    managedByBackend: false,
    category: "utility",
  },
  TEMPORARY_ACCESS: {
    key: "temporary_access",
    id: "1485197044598444163",
    displayName: "Temporary Access",
    managedByBackend: false,
    category: "utility",
  },
  ARCANE_BOT: {
    key: "arcane_bot",
    id: "1484147756984438887",
    displayName: "Arcane Bot",
    managedByBackend: false,
    category: "system",
  },
  CARL_BOT: {
    key: "carl_bot",
    id: "1484141634009694372",
    displayName: "Carl-bot",
    managedByBackend: false,
    category: "system",
  },
  CNX_HOLDER_TIER_1: {
    key: "cnx_holder_tier_1",
    id: "1486299725056446524",
    displayName: "CNX Holder Tier 1",
    managedByBackend: true,
    category: "utility",
  },
  CNX_HOLDER_TIER_2: {
    key: "cnx_holder_tier_2",
    id: "1486299823257948191",
    displayName: "CNX Holder Tier 2",
    managedByBackend: true,
    category: "utility",
  },
  CNX_HOLDER_TIER_3: {
    key: "cnx_holder_tier_3",
    id: "1486299865322491914",
    displayName: "CNX Holder Tier 3",
    managedByBackend: true,
    category: "utility",
  },
  TEMP_PREMIUM_ALPHA: {
    key: "temp_premium_alpha",
    id: "1486300614957994054",
    displayName: "Temp Premium Alpha",
    managedByBackend: true,
    category: "utility",
  },
} as const);

export type DiscordRoleRegistryEntry =
  (typeof DISCORD_ROLE_REGISTRY)[keyof typeof DISCORD_ROLE_REGISTRY];

export function getAllDiscordRoleRegistryEntries(): DiscordRoleRegistryEntry[] {
  return Object.values(DISCORD_ROLE_REGISTRY);
}