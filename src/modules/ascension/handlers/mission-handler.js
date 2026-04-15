/**
 * ============================================================
 * CITADEL ASCENSION — /mission + /build Handlers
 * All v2.3.1 fixes: PIE drop wired, HQ gating, DB live.
 * ============================================================
 */

const { EmbedBuilder } = require('discord.js');
const pie = require('../loot/pie-service');
const db  = require('./player-service');

// ─── MISSION CONFIG ───────────────────────────────────────────────────────────

const MISSIONS = {
  recon:          { power: 2, risk: 'safe',   label: 'Recon',          emoji: '🔍' },
  trade_run:      { power: 2, risk: 'safe',   label: 'Trade Run',      emoji: '💰' },
  archive_dive:   { power: 3, risk: 'medium', label: 'Archive Dive',   emoji: '🧠' },
  stabilize_node: { power: 2, risk: 'safe',   label: 'Stabilize Node', emoji: '⚡' },
  black_market:   { power: 3, risk: 'high',   label: 'Black Market',   emoji: '🔥' },
  deep_scan:      { power: 3, risk: 'high',   label: 'Deep Scan',      emoji: '📡' },
};

const BASE_REWARDS = {
  safe:   { credits: 30, intel: 15, xp: 25 },
  medium: { credits: 50, intel: 25, xp: 40 },
  high:   { credits: 90, intel: 45, xp: 70 },
};

const FAILURE_PENALTIES = {
  medium: { credits: -10, xp: 0   },
  high:   { credits: -25, xp: -15 },
};

const SUCCESS_RATES = { safe: 1.0, medium: 0.80, high: 0.50 };

const GUARDIAN_MISSION_BONUS = {
  nova:  (r) => ({ ...r, intel:   Math.floor(r.intel   * 1.20) }),
  tarin: (r) => r,
  raxa:  (r) => ({ ...r, credits: Math.floor(r.credits * 1.20) }),
};

// ─── /mission ────────────────────────────────────────────────────────────────

async function handleMission(interaction) {
  await interaction.deferReply();

  const userId      = interaction.user.id;
  const missionType = interaction.options.getString('type');
  const mission     = MISSIONS[missionType];

  if (!mission) {
    return interaction.editReply('Unknown mission type.');
  }

  const player = await db.getPlayer(userId);
  if (!player) {
    return interaction.editReply('Your Node is not initialized. Use `/start` first.');
  }

  // ── Lock check ─────────────────────────────────────────────────────────
  const lockState = db.checkLocked(player);
  if (lockState.locked) {
    return interaction.editReply({
      embeds: [new EmbedBuilder().setColor(0xEF4444).setTitle('🔒  ACCOUNT LOCKED')
        .setDescription(`Your account has been locked by an admin.\n\n**Reason:** ${lockState.reason}\n\nContact support in this server if you believe this is an error.`)]
    });
  }

  // ── Power check ────────────────────────────────────────────────────────
  if (player.power < mission.power) {
    return interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor(0xEF4444)
          .setTitle('⚡  INSUFFICIENT POWER')
          .setDescription(
            `**${mission.label}** requires **${mission.power} Power**.\n` +
            `Your Node has **${player.power} / ${player.max_power} Power**.\n\n` +
            `\`/claim\` to restore Power, or wait for passive regen (+1 every 30min).`
          )
      ]
    });
  }

  // ── Intel catch-up ─────────────────────────────────────────────────────
  const catchUp = pie.checkIntelCatchUp({ intel: player.intel });

  // ── Success roll ───────────────────────────────────────────────────────
  const success = Math.random() < SUCCESS_RATES[mission.risk];

  // ── Calculate rewards ──────────────────────────────────────────────────
  let rewards = { ...BASE_REWARDS[mission.risk] };
  if (catchUp.active) rewards.intel += catchUp.bonus_intel;

  const guardianBonus = GUARDIAN_MISSION_BONUS[player.guardian];
  if (guardianBonus) rewards = guardianBonus(rewards);

  // Nova hidden Intel bonus
  if (player.guardian === 'nova'  && Math.random() < 0.10) rewards.intel   += Math.floor(rewards.intel   * 0.20);
  // Raxa critical success bonus
  if (player.guardian === 'raxa'  && Math.random() < 0.10) rewards.credits += Math.floor(rewards.credits * 0.20);

  // ── SUCCESS ────────────────────────────────────────────────────────────
  if (success) {
    const droppedItem = await pie.rollMissionDrop(userId, missionType, mission.risk);

    await db.applyDelta(userId, {
      power:   -mission.power,
      credits:  rewards.credits,
      intel:    rewards.intel,
      xp:       rewards.xp,
    });

    const updated = await db.getPlayer(userId);

    const embed = new EmbedBuilder()
      .setColor(0x2563EB)
      .setTitle(`${mission.emoji}  MISSION COMPLETE — ${mission.label.toUpperCase()}`)
      .setDescription(getMissionNarrative(missionType, 'success'))
      .addFields({
        name:  'REWARDS',
        value: [
          `\`+ ${rewards.credits} Credits\`    [Total: ${updated.credits}]`,
          `\`+ ${rewards.intel} Intel\`      [Total: ${updated.intel}]`,
          `\`+ ${rewards.xp} XP\``,
          `\`– ${mission.power} Power\`       [🔋 ${updated.power} / ${updated.max_power} remaining]`,
        ].join('\n'),
      });

    if (catchUp.active) {
      embed.addFields({
        name:  '📡  NEXUS ADJUSTMENT',
        value: `*${catchUp.message}*\n\`+ ${catchUp.bonus_intel} bonus Intel applied\``,
      });
    }

    if (droppedItem) {
      embed.addFields({
        name:  '✨  ITEM DISCOVERED',
        value: `**${droppedItem.name}**\n*${droppedItem.flavor}*\nRarity: \`${droppedItem.rarity.toUpperCase()}\``,
      });
    }

    embed.addFields({
      name:  '━━━━━━━━━━━━━━━━',
      value: buildNextActions(updated.power, mission.power),
    });

    return interaction.editReply({ embeds: [embed] });
  }

  // ── FAILURE ────────────────────────────────────────────────────────────
  const penalty = FAILURE_PENALTIES[mission.risk] || { credits: 0, xp: 0 };

  await db.applyDelta(userId, {
    power:   -mission.power,
    credits:  penalty.credits,
    xp:       penalty.xp,
  });

  const updated = await db.getPlayer(userId);

  return interaction.editReply({
    embeds: [
      new EmbedBuilder()
        .setColor(0xEF4444)
        .setTitle('⚠️  MISSION FAILED — SIGNAL COMPROMISED')
        .setDescription(getMissionNarrative(missionType, 'failure'))
        .addFields(
          {
            name:  'RESULT',
            value: [
              penalty.credits ? `\`– ${Math.abs(penalty.credits)} Credits\`  [Total: ${updated.credits}]` : '',
              penalty.xp      ? `\`– ${Math.abs(penalty.xp)} XP\`` : '',
              `\`– ${mission.power} Power\`         [🔋 ${updated.power} / ${updated.max_power} remaining]`,
            ].filter(Boolean).join('\n'),
          },
          {
            name:  '━━━━━━━━━━━━━━━━',
            value: '> Your **Security Layer** absorbed some damage.\n> Upgrade it to reduce future exposure: `/build security_layer`',
          }
        )
    ]
  });
}

// ─── /build ──────────────────────────────────────────────────────────────────

async function handleBuild(interaction) {
  await interaction.deferReply();

  const userId   = interaction.user.id;
  const building = interaction.options.getString('building');

  const player = await db.getPlayer(userId);
  if (!player) {
    return interaction.editReply('Your Node is not initialized. Use `/start` first.');
  }

  // ── Lock check ─────────────────────────────────────────────────────────
  const lockState = db.checkLocked(player);
  if (lockState.locked) {
    return interaction.editReply({
      embeds: [new EmbedBuilder().setColor(0xEF4444).setTitle('🔒  ACCOUNT LOCKED')
        .setDescription(`Your account has been locked by an admin.\n\n**Reason:** ${lockState.reason}\n\nContact support in this server if you believe this is an error.`)]
    });
  }

  const currentLevel = player.buildings[building] || 1;
  const newLevel     = currentLevel + 1;

  // ── HQ Gating ──────────────────────────────────────────────────────────
  const gate = db.canUpgrade(player.buildings, building);
  if (!gate.allowed) {
    return interaction.editReply(`🔒 **HQ Gate Active**\n${gate.reason}`);
  }

  // ── Cost calculation ───────────────────────────────────────────────────
  const BASE_COSTS = {
    knowledge_core: { credits: 50, intel: 20 },
    trade_hub:      { credits: 50, intel: 20 },
    power_reactor:  { credits: 60, intel: 15 },
    security_layer: { credits: 40, intel: 25 },
  };

  const base = BASE_COSTS[building] || { credits: 50, intel: 20 };
  let cost = {
    credits: Math.round(base.credits * Math.pow(1.8, currentLevel - 1)),
    intel:   Math.round(base.intel   * Math.pow(1.8, currentLevel - 1)),
  };

  // Tarin efficiency bonus
  if (player.guardian === 'tarin') {
    cost.credits = Math.floor(cost.credits * 0.90);
    cost.intel   = Math.floor(cost.intel   * 0.90);
  }

  if (player.credits < cost.credits || player.intel < cost.intel) {
    return interaction.editReply(
      `**Insufficient resources.**\n` +
      `Required: \`${cost.credits} Credits\` + \`${cost.intel} Intel\`\n` +
      `Available: \`${player.credits} Credits\` + \`${player.intel} Intel\``
    );
  }

  const xpGain        = 15;
  const nodeScoreGain = 3;

  // ── Apply to DB ────────────────────────────────────────────────────────
  await db.applyDelta(userId, {
    credits:    -cost.credits,
    intel:      -cost.intel,
    xp:          xpGain,
    node_score:  nodeScoreGain,
    buildings:  { ...player.buildings, [building]: newLevel },
  });

  const updated = await db.getPlayer(userId);

  // ── Narrative response ─────────────────────────────────────────────────
  const upgradeMsg = pie.getUpgradeMessage(building, newLevel);

  const embed = new EmbedBuilder()
    .setColor(0x0A0F2C)
    .setTitle(`🏛️  ${upgradeMsg.headline} — LEVEL ${newLevel}`)
    .setDescription(`*${upgradeMsg.narrative}*`)
    .addFields(
      {
        name:  'COST',
        value: [
          `\`– ${cost.credits} Credits\`    [Total: ${updated.credits}]`,
          `\`– ${cost.intel} Intel\`      [Total: ${updated.intel}]`,
          `\`+ ${xpGain} XP\``,
          `\`+ ${nodeScoreGain} Node Score\`   [Current: ${updated.node_score}]`,
        ].join('\n'),
      },
      { name: '✅  UPGRADE EFFECT', value: upgradeMsg.system_line }
    );

  if (player.guardian === 'tarin') {
    embed.setFooter({ text: '🐘 Tarin efficiency bonus applied — 10% cost reduction.' });
  }

  return interaction.editReply({ embeds: [embed] });
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function getMissionNarrative(type, outcome) {
  const N = {
    recon:          { success: 'Your Node navigated the outer signal fields. Data recovered intact.', failure: 'The recon sweep hit interference. Partial data lost.' },
    trade_run:      { success: 'Your Node navigated the fractured trade lanes. Cargo secured. Credits extracted.', failure: 'The trade lane was compromised. Hostile Nodes traced your signal.' },
    archive_dive:   { success: 'Deep archive stacks accessed. Encrypted records extracted.', failure: 'The archive sequence corrupted mid-dive. Partial loss sustained.' },
    stabilize_node: { success: 'The fractured Node has been stabilized. Systems nominal.', failure: 'Stabilization failed. The Node rejected your signal.' },
    black_market:   { success: 'Transaction complete. No trace. Credits secured.', failure: 'The black market run went sideways. Hostile Nodes detected. Your signal was traced.' },
    deep_scan:      { success: 'Scan complete. The Nexus gave up its secrets — this time.', failure: 'The deep scan triggered a counter-sweep. Exposure sustained.' },
  };
  return N[type]?.[outcome] || 'Mission resolved.';
}

function buildNextActions(remainingPower, missionCost) {
  const lines = [];
  if (remainingPower >= missionCost) {
    lines.push(`> 🔋 You have **${remainingPower} Power** remaining — run another mission`);
  } else {
    lines.push(`> 🔋 Low Power. \`/claim\` or wait for passive regen (+1 every 30min)`);
  }
  lines.push('> 📊 `/status` — check your full Citadel');
  return lines.join('\n');
}

module.exports = { handleMission, handleBuild };