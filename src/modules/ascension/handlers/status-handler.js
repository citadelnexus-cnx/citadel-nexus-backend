/**
 * ============================================================
 * CITADEL ASCENSION — /status Handler
 * Prisma/Supabase-backed Citadel dashboard
 * ============================================================
 */

const { EmbedBuilder } = require("discord.js");
const {
  getResolvedAscensionActor,
  getStageName,
  getNextStage,
  xpToNextRank,
  checkClaimCooldown,
  formatCooldown,
} = require("../../../services/ascensionGameplayService");

// ─── DISPLAY MAPS ─────────────────────────────────────────────────────────────

const GUARDIAN_DISPLAY = {
  nova: { emoji: "🦉", name: "Nova", color: 0x60a5fa },
  tarin: { emoji: "🐘", name: "Tarin", color: 0x4ade80 },
  raxa: { emoji: "🐅", name: "Raxa", color: 0xf59e0b },
};

const STAGE_EMOJI = { 1: "⬛", 2: "🟦", 3: "🟪", 4: "🟧", 5: "🟨" };

const RANK_DISPLAY = {
  initiate: { label: "Initiate", emoji: "▪️" },
  operator: { label: "Operator", emoji: "🔵" },
  builder: { label: "Builder", emoji: "🟢" },
  architect: { label: "Architect", emoji: "🟣" },
  warden: { label: "Warden", emoji: "🟠" },
  sentinel: { label: "Sentinel", emoji: "🟡" },
};

// ─── FLAVOR LINES ─────────────────────────────────────────────────────────────

const FLAVOR_LINES = [
  "*The Nexus hums. Something is watching.*",
  "*Three dormant Nodes pulsed in your direction. Coincidence is rare here.*",
  "*The signal is stronger today. Your Citadel is being noticed.*",
  "*Patterns form in the static. The archive stirs.*",
  "*Your Node is not the only one rebuilding. Be ready.*",
  "*The Cascade left echoes. Some of them are still running.*",
  "*A broadcast loops nearby. Its origin is unclear.*",
  "*The Nexus remembers everything. Even what you haven't done yet.*",
];

function getFlavorLine() {
  return FLAVOR_LINES[Math.floor(Math.random() * FLAVOR_LINES.length)];
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function powerBar(current, max) {
  const safeMax = Math.max(1, max || 1);
  const filled = Math.round((current / safeMax) * 10);
  return "█".repeat(filled) + "░".repeat(10 - filled);
}

function xpBar(xp, next) {
  if (!next) return "██████████ MAX";
  const filled = Math.round(Math.min(xp / next, 1) * 10);
  return "█".repeat(filled) + "░".repeat(10 - filled);
}

function buildingLine(name, level, outputLabel) {
  return `\`${"▮".repeat(level)}${"▯".repeat(5 - level)}\` L${level}  ${name}  —  ${outputLabel}`;
}

function parseBuildings(buildingsJson) {
  const fallback = {
    knowledge_core: 1,
    trade_hub: 1,
    power_reactor: 1,
    security_layer: 1,
  };

  if (!buildingsJson || typeof buildingsJson !== "object" || Array.isArray(buildingsJson)) {
    return fallback;
  }

  return {
    knowledge_core: Number(buildingsJson.knowledge_core ?? 1),
    trade_hub: Number(buildingsJson.trade_hub ?? 1),
    power_reactor: Number(buildingsJson.power_reactor ?? 1),
    security_layer: Number(buildingsJson.security_layer ?? 1),
  };
}

function stageProgress(nodeScore, stage) {
  const next = getNextStage(stage);
  if (!next) return { pct: 100, label: "ASCENDED", next: null };

  const thresholds = {
    1: 0,
    2: 50,
    3: 200,
    4: 750,
    5: 2500,
  };

  const base = thresholds[stage] ?? 0;
  const nextRequired = next.nodeScoreRequired ?? 0;

  const pct =
    nextRequired > base
      ? Math.min(
          Math.round(((nodeScore - base) / (nextRequired - base)) * 100),
          100
        )
      : 100;

  return {
    pct: Math.max(0, pct),
    label: next.name,
    next,
  };
}

// ─── /status ─────────────────────────────────────────────────────────────────

async function handleStatus(interaction) {
  await interaction.deferReply();

  const discordId = interaction.user.id;
  const username = interaction.user.username;
  const discordTag = interaction.user.tag ?? interaction.user.username;

  const { profile } = await getResolvedAscensionActor({
    discordId,
    username,
    discordTag,
  });

  if (!profile) {
    return interaction.editReply("Your Node is not initialized. Use `/start` to begin.");
  }

  const guardian = GUARDIAN_DISPLAY[profile.guardian] || GUARDIAN_DISPLAY.nova;
  const rankInfo = RANK_DISPLAY[profile.rank] || RANK_DISPLAY.initiate;
  const stageName = getStageName(profile.stage);
  const nextRankXP = xpToNextRank(profile.xp);
  const progress = stageProgress(profile.nodeScore, profile.stage);
  const buildings = parseBuildings(profile.buildingsJson);

  const embed = new EmbedBuilder()
    .setColor(guardian.color)
    .setTitle(`🏛️  CITADEL STATUS — ${interaction.user.username.toUpperCase()}`)
    .setDescription(getFlavorLine())
    .addFields(
      {
        name: "── IDENTITY ────────────────────────",
        value: [
          `Stage:     ${STAGE_EMOJI[profile.stage] || "⬛"} **${stageName}**`,
          `Rank:      ${rankInfo.emoji} **${rankInfo.label}**`,
          `Guardian:  ${guardian.emoji} **${guardian.name}**`,
        ].join("\n"),
      },
      {
        name: "── RESOURCES ───────────────────────",
        value: [
          `🔋 Power      \`${powerBar(profile.power, profile.maxPower)}\` ${profile.power} / ${profile.maxPower}`,
          `💰 Credits    \`${profile.credits}\``,
          `🧠 Intel      \`${profile.intel}\``,
        ].join("\n"),
      },
      {
        name: "── BUILDINGS ───────────────────────",
        value: [
          buildingLine(
            "Knowledge Core",
            buildings.knowledge_core,
            `+${5 * buildings.knowledge_core} Intel/mission`
          ),
          buildingLine(
            "Trade Hub",
            buildings.trade_hub,
            `+${10 * buildings.trade_hub} Credits/claim`
          ),
          buildingLine(
            "Power Reactor",
            buildings.power_reactor,
            `${10 + (buildings.power_reactor - 1) * 2} max Power`
          ),
          buildingLine(
            "Security Layer",
            buildings.security_layer,
            `${buildings.security_layer * 10}% risk reduction`
          ),
        ].join("\n"),
      },
      {
        name: "── PROGRESSION ─────────────────────",
        value: [
          nextRankXP
            ? `XP:          \`${xpBar(profile.xp, nextRankXP)}\` ${profile.xp} / ${nextRankXP}`
            : "XP:          `██████████` MAX RANK",
          `Node Score:  **${profile.nodeScore}**  →  next stage: *${progress.label}* (${progress.pct}%)`,
          `Sessions:    **${profile.sessionCount}** claims completed`,
        ].join("\n"),
      },
      {
        name: "━━━━━━━━━━━━━━━━",
        value: buildNextActionPrompt(profile, buildings),
      }
    )
    .setFooter({ text: "Citadel Ascension  |  Node online" });

  return interaction.editReply({ embeds: [embed] });
}

// ─── SMART NEXT ACTION PROMPT ─────────────────────────────────────────────────

function buildNextActionPrompt(profile, buildings) {
  const lines = [];

  if (profile.power >= 2) {
    lines.push("> 🔋 You have **" + profile.power + "** Power — run a mission: `/mission recon`");
  }

  const cooldown = checkClaimCooldown(profile);
  if (!cooldown.onCooldown && profile.power < 5) {
    lines.push("> ⚡ `/claim` is available — restore your Power now");
  } else if (cooldown.onCooldown) {
    lines.push(`> ⏳ Next claim in \`${formatCooldown(cooldown.remainingMs)}\``);
  }

  if (profile.intel < 20) {
    lines.push("> 🧠 Intel low — try `/mission archive_dive` for Intel-heavy rewards");
  }

  const suggestion = getSuggestedUpgrade(profile, buildings);
  if (suggestion) {
    lines.push(`> 🏗️  You can afford: \`/build ${suggestion}\``);
  }

  const progress = stageProgress(profile.nodeScore, profile.stage);
  if (progress.pct >= 75 && progress.pct < 100) {
    lines.push(`> 🏛️  **${progress.pct}%** to *${progress.label}* — you're close`);
  }

  return lines.length > 0 ? lines.join("\n") : "> Keep building. The Nexus is watching.";
}

function getSuggestedUpgrade(profile, buildings) {
  const BASE_COSTS = {
    knowledge_core: { credits: 50, intel: 20 },
    trade_hub: { credits: 50, intel: 20 },
    power_reactor: { credits: 60, intel: 15 },
    security_layer: { credits: 40, intel: 25 },
  };

  for (const [key, base] of Object.entries(BASE_COSTS)) {
    const level = buildings[key] || 1;
    if (level >= 5) continue;

    const cost = {
      credits: Math.round(base.credits * Math.pow(1.8, level - 1)),
      intel: Math.round(base.intel * Math.pow(1.8, level - 1)),
    };

    if (profile.credits >= cost.credits && profile.intel >= cost.intel) {
      return key;
    }
  }

  return null;
}

module.exports = { handleStatus };