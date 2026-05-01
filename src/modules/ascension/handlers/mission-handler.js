/**
 * ============================================================
 * CITADEL ASCENSION — /mission + /build Handlers
 * Prisma/Supabase-backed mission and build flow
 * ============================================================
 */

const { EmbedBuilder } = require("discord.js");
const pie = require("../loot/pie-service");

const {
  getResolvedAscensionActor,
  applyDelta,
  checkLocked,
} = require("../../../services/ascensionGameplayService");

// ─── MISSION CONFIG ───────────────────────────────────────────────────────────

const MISSIONS = {
  recon: { power: 2, risk: "safe", label: "Recon", emoji: "🔍" },
  trade_run: { power: 2, risk: "safe", label: "Trade Run", emoji: "💰" },
  archive_dive: { power: 3, risk: "medium", label: "Archive Dive", emoji: "🧠" },
  stabilize_node: { power: 2, risk: "safe", label: "Stabilize Node", emoji: "⚡" },
  black_market: { power: 3, risk: "high", label: "Black Market", emoji: "🔥" },
  deep_scan: { power: 3, risk: "high", label: "Deep Scan", emoji: "📡" },
};

const BASE_REWARDS = {
  safe: { credits: 30, intel: 15, xp: 25 },
  medium: { credits: 50, intel: 25, xp: 40 },
  high: { credits: 90, intel: 45, xp: 70 },
};

const FAILURE_PENALTIES = {
  medium: { credits: -10, xp: 0 },
  high: { credits: -25, xp: -15 },
};

const SUCCESS_RATES = { safe: 1.0, medium: 0.8, high: 0.5 };

const GUARDIAN_MISSION_BONUS = {
  nova: (r) => ({ ...r, intel: Math.floor(r.intel * 1.2) }),
  tarin: (r) => r,
  raxa: (r) => ({ ...r, credits: Math.floor(r.credits * 1.2) }),
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function getBuildings(profile) {
  const raw = profile?.buildingsJson;

  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return {
      knowledge_core: Number(raw.knowledge_core ?? 1),
      trade_hub: Number(raw.trade_hub ?? 1),
      power_reactor: Number(raw.power_reactor ?? 1),
      security_layer: Number(raw.security_layer ?? 1),
    };
  }

  return {
    knowledge_core: 1,
    trade_hub: 1,
    power_reactor: 1,
    security_layer: 1,
  };
}

function canUpgrade(buildings, target) {
  const phase = parseInt(process.env.CURRENT_PHASE || "1", 10);

  const phaseCaps = {
    1: { max_building: 2 },
    2: { max_building: 3 },
    3: { max_building: 4 },
    4: { max_building: 5 },
  };

  const cap = phaseCaps[phase]?.max_building || 2;
  const levels = Object.values(buildings);
  const minLevel = Math.min(...levels);
  const current = buildings[target] || 1;

  if (current >= 5) {
    return { allowed: false, reason: "Already at maximum level (L5)." };
  }

  if (current >= cap) {
    return {
      allowed: false,
      reason: `Phase ${phase} cap: max building level is L${cap}.`,
    };
  }

  if (current >= minLevel + 1) {
    const lagging = Object.entries(buildings)
      .filter(([k, v]) => v === minLevel && k !== target)
      .map(([k]) => k.replace(/_/g, " "))
      .join(", ");

    return {
      allowed: false,
      reason: `HQ gating active. Upgrade: **${lagging}** (L${minLevel}) first.`,
    };
  }

  return { allowed: true, reason: null };
}

function getMissionNarrative(type, outcome) {
  const N = {
    recon: {
      success: "Your Node navigated the outer signal fields. Data recovered intact.",
      failure: "The recon sweep hit interference. Partial data lost.",
    },
    trade_run: {
      success: "Your Node navigated the fractured trade lanes. Cargo secured. Credits extracted.",
      failure: "The trade lane was compromised. Hostile Nodes traced your signal.",
    },
    archive_dive: {
      success: "Deep archive stacks accessed. Encrypted records extracted.",
      failure: "The archive sequence corrupted mid-dive. Partial loss sustained.",
    },
    stabilize_node: {
      success: "The fractured Node has been stabilized. Systems nominal.",
      failure: "Stabilization failed. The Node rejected your signal.",
    },
    black_market: {
      success: "Transaction complete. No trace. Credits secured.",
      failure: "The black market run went sideways. Hostile Nodes detected. Your signal was traced.",
    },
    deep_scan: {
      success: "Scan complete. The Nexus gave up its secrets — this time.",
      failure: "The deep scan triggered a counter-sweep. Exposure sustained.",
    },
  };

  return N[type]?.[outcome] || "Mission resolved.";
}

function buildNextActions(remainingPower, missionCost) {
  const lines = [];

  if (remainingPower >= missionCost) {
    lines.push(`> 🔋 You have **${remainingPower} Power** remaining — run another mission`);
  } else {
    lines.push(`> 🔋 Low Power. \`/claim\` or wait for passive regen (+1 every 30min)`);
  }

  lines.push("> 📊 `/status` — check your full Citadel");
  return lines.join("\n");
}

// ─── /mission ────────────────────────────────────────────────────────────────

async function handleMission(interaction) {
  await interaction.deferReply();

  const discordId = interaction.user.id;
  const username = interaction.user.username;
  const discordTag = interaction.user.tag ?? interaction.user.username;

  const missionType = interaction.options.getString("type");
  const mission = MISSIONS[missionType];

  if (!mission) {
    return interaction.editReply("Unknown mission type.");
  }

  const { user, profile } = await getResolvedAscensionActor({
    discordId,
    username,
    discordTag,
  });

  if (!profile) {
    return interaction.editReply("Your Node is not initialized. Use `/start` first.");
  }

  // ── Lock check ─────────────────────────────────────────────────────────
  const lockState = checkLocked(profile);
  if (lockState.locked) {
    return interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor(0xef4444)
          .setTitle("🔒  ACCOUNT LOCKED")
          .setDescription(
            `Your account has been locked by an admin.\n\n**Reason:** ${lockState.reason}\n\nContact support in this server if you believe this is an error.`
          ),
      ],
    });
  }

  // ── Power check ────────────────────────────────────────────────────────
  if (profile.power < mission.power) {
    return interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor(0xef4444)
          .setTitle("⚡  INSUFFICIENT POWER")
          .setDescription(
            `**${mission.label}** requires **${mission.power} Power**.\n` +
              `Your Node has **${profile.power} / ${profile.maxPower} Power**.\n\n` +
              "`/claim` to restore Power, or wait for passive regen (+1 every 30min)."
          ),
      ],
    });
  }

  // ── Intel catch-up ─────────────────────────────────────────────────────
  const catchUp = pie.checkIntelCatchUp({ intel: profile.intel });

  // ── Success roll ───────────────────────────────────────────────────────
  const success = Math.random() < SUCCESS_RATES[mission.risk];

  // ── Calculate rewards ──────────────────────────────────────────────────
  let rewards = { ...BASE_REWARDS[mission.risk] };
  if (catchUp.active) rewards.intel += catchUp.bonus_intel;

  const guardianBonus = GUARDIAN_MISSION_BONUS[profile.guardian];
  if (guardianBonus) rewards = guardianBonus(rewards);

  if (profile.guardian === "nova" && Math.random() < 0.1) {
    rewards.intel += Math.floor(rewards.intel * 0.2);
  }

  if (profile.guardian === "raxa" && Math.random() < 0.1) {
    rewards.credits += Math.floor(rewards.credits * 0.2);
  }

  // ── SUCCESS ────────────────────────────────────────────────────────────
  if (success) {
    const droppedItem = await pie.rollMissionDrop(user.id, missionType, mission.risk);

    const updated = await applyDelta(user.id, {
      power: -mission.power,
      credits: rewards.credits,
      intel: rewards.intel,
      xp: rewards.xp,
      missionsCompleted: 1,
    });

    const embed = new EmbedBuilder()
      .setColor(0x2563eb)
      .setTitle(`${mission.emoji}  MISSION COMPLETE — ${mission.label.toUpperCase()}`)
      .setDescription(getMissionNarrative(missionType, "success"))
      .addFields({
        name: "REWARDS",
        value: [
          `\`+ ${rewards.credits} Credits\`    [Total: ${updated.credits}]`,
          `\`+ ${rewards.intel} Intel\`      [Total: ${updated.intel}]`,
          `\`+ ${rewards.xp} XP\``,
          `\`– ${mission.power} Power\`       [🔋 ${updated.power} / ${updated.maxPower} remaining]`,
        ].join("\n"),
      });

    if (catchUp.active) {
      embed.addFields({
        name: "📡  NEXUS ADJUSTMENT",
        value: `*${catchUp.message}*\n\`+ ${catchUp.bonus_intel} bonus Intel applied\``,
      });
    }

    if (droppedItem) {
      embed.addFields({
        name: "✨  ITEM DISCOVERED",
        value: `**${droppedItem.name}**\n*${droppedItem.flavor}*\nRarity: \`${droppedItem.rarity.toUpperCase()}\``,
      });
    }

    embed.addFields({
      name: "━━━━━━━━━━━━━━━━",
      value: buildNextActions(updated.power, mission.power),
    });

    return interaction.editReply({ embeds: [embed] });
  }

  // ── FAILURE ────────────────────────────────────────────────────────────
  const penalty = FAILURE_PENALTIES[mission.risk] || { credits: 0, xp: 0 };

  const updated = await applyDelta(user.id, {
    power: -mission.power,
    credits: penalty.credits,
    xp: penalty.xp,
  });

  return interaction.editReply({
    embeds: [
      new EmbedBuilder()
        .setColor(0xef4444)
        .setTitle("⚠️  MISSION FAILED — SIGNAL COMPROMISED")
        .setDescription(getMissionNarrative(missionType, "failure"))
        .addFields(
          {
            name: "RESULT",
            value: [
              penalty.credits
                ? `\`– ${Math.abs(penalty.credits)} Credits\`  [Total: ${updated.credits}]`
                : "",
              penalty.xp ? `\`– ${Math.abs(penalty.xp)} XP\`` : "",
              `\`– ${mission.power} Power\`         [🔋 ${updated.power} / ${updated.maxPower} remaining]`,
            ]
              .filter(Boolean)
              .join("\n"),
          },
          {
            name: "━━━━━━━━━━━━━━━━",
            value:
              "> Your **Security Layer** absorbed some damage.\n> Upgrade it to reduce future exposure: `/build security_layer`",
          }
        ),
    ],
  });
}

// ─── /build ──────────────────────────────────────────────────────────────────

async function handleBuild(interaction) {
  await interaction.deferReply();

  const discordId = interaction.user.id;
  const username = interaction.user.username;
  const discordTag = interaction.user.tag ?? interaction.user.username;
  const building = interaction.options.getString("building");

  const { user, profile } = await getResolvedAscensionActor({
    discordId,
    username,
    discordTag,
  });

  if (!profile) {
    return interaction.editReply("Your Node is not initialized. Use `/start` first.");
  }

  // ── Lock check ─────────────────────────────────────────────────────────
  const lockState = checkLocked(profile);
  if (lockState.locked) {
    return interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor(0xef4444)
          .setTitle("🔒  ACCOUNT LOCKED")
          .setDescription(
            `Your account has been locked by an admin.\n\n**Reason:** ${lockState.reason}\n\nContact support in this server if you believe this is an error.`
          ),
      ],
    });
  }

  const buildings = getBuildings(profile);
  const currentLevel = buildings[building] || 1;
  const newLevel = currentLevel + 1;

  // ── HQ Gating ──────────────────────────────────────────────────────────
  const gate = canUpgrade(buildings, building);
  if (!gate.allowed) {
    return interaction.editReply(`🔒 **HQ Gate Active**\n${gate.reason}`);
  }

  // ── Cost calculation ───────────────────────────────────────────────────
  const BASE_COSTS = {
    knowledge_core: { credits: 50, intel: 20 },
    trade_hub: { credits: 50, intel: 20 },
    power_reactor: { credits: 60, intel: 15 },
    security_layer: { credits: 40, intel: 25 },
  };

  const base = BASE_COSTS[building] || { credits: 50, intel: 20 };

  let cost = {
    credits: Math.round(base.credits * Math.pow(1.8, currentLevel - 1)),
    intel: Math.round(base.intel * Math.pow(1.8, currentLevel - 1)),
  };

  if (profile.guardian === "tarin") {
    cost.credits = Math.floor(cost.credits * 0.9);
    cost.intel = Math.floor(cost.intel * 0.9);
  }

  if (profile.credits < cost.credits || profile.intel < cost.intel) {
    return interaction.editReply(
      `**Insufficient resources.**\n` +
        `Required: \`${cost.credits} Credits\` + \`${cost.intel} Intel\`\n` +
        `Available: \`${profile.credits} Credits\` + \`${profile.intel} Intel\``
    );
  }

  const xpGain = 15;
  const nodeScoreGain = 3;
  const nextBuildings = { ...buildings, [building]: newLevel };
  const nextMaxPower = 10 + (nextBuildings.power_reactor - 1) * 2;

  const updated = await applyDelta(user.id, {
    credits: -cost.credits,
    intel: -cost.intel,
    xp: xpGain,
    nodeScore: nodeScoreGain,
    buildingsJson: nextBuildings,
  });

  const upgradeMsg = pie.getUpgradeMessage(building, newLevel);

  const embed = new EmbedBuilder()
    .setColor(0x0a0f2c)
    .setTitle(`🏛️  ${upgradeMsg.headline} — LEVEL ${newLevel}`)
    .setDescription(`*${upgradeMsg.narrative}*`)
    .addFields(
      {
        name: "COST",
        value: [
          `\`– ${cost.credits} Credits\`    [Total: ${updated.credits}]`,
          `\`– ${cost.intel} Intel\`      [Total: ${updated.intel}]`,
          `\`+ ${xpGain} XP\``,
          `\`+ ${nodeScoreGain} Node Score\`   [Current: ${updated.nodeScore}]`,
        ].join("\n"),
      },
      {
        name: "✅  UPGRADE EFFECT",
        value:
          building === "power_reactor"
            ? `${upgradeMsg.system_line}\nNew max power: **${nextMaxPower}**`
            : upgradeMsg.system_line,
      }
    );

  if (profile.guardian === "tarin") {
    embed.setFooter({
      text: "🐘 Tarin efficiency bonus applied — 10% cost reduction.",
    });
  }

  return interaction.editReply({ embeds: [embed] });
}

module.exports = { handleMission, handleBuild };