/**
 * ============================================================
 * CITADEL ASCENSION — /status Handler
 * Full Citadel dashboard with rotating flavor lines.
 * ============================================================
 */

const { EmbedBuilder } = require('discord.js');
const db = require('./player-service');

// ─── DISPLAY MAPS ─────────────────────────────────────────────────────────────

const GUARDIAN_DISPLAY = {
  nova:  { emoji: '🦉', name: 'Nova',  color: 0x60A5FA },
  tarin: { emoji: '🐘', name: 'Tarin', color: 0x4ADE80 },
  raxa:  { emoji: '🐅', name: 'Raxa',  color: 0xF59E0B },
};

const STAGE_EMOJI  = { 1: '⬛', 2: '🟦', 3: '🟪', 4: '🟧', 5: '🟨' };

const RANK_DISPLAY = {
  initiate:  { label: 'Initiate',  emoji: '▪️' },
  operator:  { label: 'Operator',  emoji: '🔵' },
  builder:   { label: 'Builder',   emoji: '🟢' },
  architect: { label: 'Architect', emoji: '🟣' },
  warden:    { label: 'Warden',    emoji: '🟠' },
  sentinel:  { label: 'Sentinel',  emoji: '🟡' },
};

// ─── FLAVOR LINES ─────────────────────────────────────────────────────────────

const FLAVOR_LINES = [
  '*The Nexus hums. Something is watching.*',
  '*Three dormant Nodes pulsed in your direction. Coincidence is rare here.*',
  '*The signal is stronger today. Your Citadel is being noticed.*',
  '*Patterns form in the static. The archive stirs.*',
  '*Your Node is not the only one rebuilding. Be ready.*',
  '*The Cascade left echoes. Some of them are still running.*',
  '*A broadcast loops nearby. Its origin is unclear.*',
  '*The Nexus remembers everything. Even what you haven\'t done yet.*',
];

function getFlavorLine() {
  return FLAVOR_LINES[Math.floor(Math.random() * FLAVOR_LINES.length)];
}

// ─── DISPLAY HELPERS ─────────────────────────────────────────────────────────

function powerBar(current, max) {
  const filled = Math.round((current / max) * 10);
  return '█'.repeat(filled) + '░'.repeat(10 - filled);
}

function xpBar(xp, next) {
  if (!next) return '██████████ MAX';
  const filled = Math.round(Math.min(xp / next, 1) * 10);
  return '█'.repeat(filled) + '░'.repeat(10 - filled);
}

function buildingLine(name, level, outputLabel) {
  return `\`${'▮'.repeat(level)}${'▯'.repeat(5 - level)}\` L${level}  ${name}  —  ${outputLabel}`;
}

function stageProgress(nodeScore, stage) {
  const next = db.getNextStage(stage);
  if (!next) return { pct: 100, label: 'ASCENDED' };
  const prev  = db.EVOLUTION_STAGES.find(s => s.stage === stage);
  const base  = prev?.node_score_required || 0;
  const pct   = Math.min(Math.round(((nodeScore - base) / (next.node_score_required - base)) * 100), 100);
  return { pct, label: next.name, next };
}

// ─── /status ─────────────────────────────────────────────────────────────────

async function handleStatus(interaction) {
  await interaction.deferReply();

  const userId = interaction.user.id;
  const player = await db.getPlayer(userId);

  if (!player) {
    return interaction.editReply('Your Node is not initialized. Use `/start` to begin.');
  }

  const guardian   = GUARDIAN_DISPLAY[player.guardian] || GUARDIAN_DISPLAY.nova;
  const rankInfo   = RANK_DISPLAY[player.rank]         || RANK_DISPLAY.initiate;
  const stageName  = db.getStageName(player.stage);
  const nextRankXP = db.xpToNextRank(player.xp);
  const progress   = stageProgress(player.node_score, player.stage);

  const embed = new EmbedBuilder()
    .setColor(guardian.color)
    .setTitle(`🏛️  CITADEL STATUS — ${interaction.user.username.toUpperCase()}`)
    .setDescription(getFlavorLine())
    .addFields(
      {
        name:  '── IDENTITY ────────────────────────',
        value: [
          `Stage:     ${STAGE_EMOJI[player.stage]} **${stageName}**`,
          `Rank:      ${rankInfo.emoji} **${rankInfo.label}**`,
          `Guardian:  ${guardian.emoji} **${guardian.name}**`,
        ].join('\n'),
      },
      {
        name:  '── RESOURCES ───────────────────────',
        value: [
          `🔋 Power      \`${powerBar(player.power, player.max_power)}\` ${player.power} / ${player.max_power}`,
          `💰 Credits    \`${player.credits}\``,
          `🧠 Intel      \`${player.intel}\``,
        ].join('\n'),
      },
      {
        name:  '── BUILDINGS ───────────────────────',
        value: [
          buildingLine('Knowledge Core', player.buildings.knowledge_core, `+${5 * player.buildings.knowledge_core} Intel/mission`),
          buildingLine('Trade Hub',      player.buildings.trade_hub,      `+${10 * player.buildings.trade_hub} Credits/claim`),
          buildingLine('Power Reactor',  player.buildings.power_reactor,  `${10 + (player.buildings.power_reactor - 1) * 2} max Power`),
          buildingLine('Security Layer', player.buildings.security_layer, `${player.buildings.security_layer * 10}% risk reduction`),
        ].join('\n'),
      },
      {
        name:  '── PROGRESSION ─────────────────────',
        value: [
          nextRankXP
            ? `XP:          \`${xpBar(player.xp, nextRankXP)}\` ${player.xp} / ${nextRankXP}`
            : `XP:          \`██████████\` MAX RANK`,
          `Node Score:  **${player.node_score}**  →  next stage: *${progress.label}* (${progress.pct}%)`,
          `Sessions:    **${player.session_count}** claims completed`,
        ].join('\n'),
      },
      {
        name:  '━━━━━━━━━━━━━━━━',
        value: buildNextActionPrompt(player),
      }
    )
    .setFooter({ text: 'Citadel Ascension  |  Node online' });

  return interaction.editReply({ embeds: [embed] });
}

// ─── SMART NEXT ACTION PROMPT ─────────────────────────────────────────────────

function buildNextActionPrompt(player) {
  const lines = [];

  if (player.power >= 2) {
    lines.push(`> 🔋 You have **${player.power} Power** — run a mission: \`/mission recon\``);
  }

  const cooldown = db.checkClaimCooldown(player);
  if (!cooldown.onCooldown && player.power < 5) {
    lines.push('> ⚡ \`/claim\` is available — restore your Power now');
  } else if (cooldown.onCooldown) {
    lines.push(`> ⏳ Next claim in \`${db.formatCooldown(cooldown.remainingMs)}\``);
  }

  if (player.intel < 20) {
    lines.push('> 🧠 Intel low — try \`/mission archive_dive\` for Intel-heavy rewards');
  }

  const suggestion = getSuggestedUpgrade(player);
  if (suggestion) {
    lines.push(`> 🏗️  You can afford: \`/build ${suggestion}\``);
  }

  const progress = stageProgress(player.node_score, player.stage);
  if (progress.pct >= 75 && progress.pct < 100) {
    lines.push(`> 🏛️  **${progress.pct}%** to *${progress.label}* — you\'re close`);
  }

  return lines.length > 0 ? lines.join('\n') : '> Keep building. The Nexus is watching.';
}

function getSuggestedUpgrade(player) {
  const BASE_COSTS = {
    knowledge_core: { credits: 50, intel: 20 },
    trade_hub:      { credits: 50, intel: 20 },
    power_reactor:  { credits: 60, intel: 15 },
    security_layer: { credits: 40, intel: 25 },
  };
  for (const [key, base] of Object.entries(BASE_COSTS)) {
    const level = player.buildings[key] || 1;
    if (level >= 5) continue;
    const cost = {
      credits: Math.round(base.credits * Math.pow(1.8, level - 1)),
      intel:   Math.round(base.intel   * Math.pow(1.8, level - 1)),
    };
    if (player.credits >= cost.credits && player.intel >= cost.intel) return key;
  }
  return null;
}

module.exports = { handleStatus };