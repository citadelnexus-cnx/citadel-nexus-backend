/**
 * ============================================================
 * CITADEL ASCENSION — /claim Handler
 * Power restore, resources, momentum events, Guardian bonuses.
 * ============================================================
 */

const { EmbedBuilder } = require('discord.js');
const db  = require('./player-service');
const pie = require('../loot/pie-service');

// ─── CLAIM CONFIG ─────────────────────────────────────────────────────────────

const BASE_CLAIM = { power: 5, credits: 20, xp: 10 };

const GUARDIAN_CLAIM_BONUS = {
  nova:  (r) => r,
  tarin: (r) => ({ ...r, credits: Math.floor(r.credits * 1.10), intel_passive: 5 }),
  raxa:  (r) => r,
};

// ─── /claim ───────────────────────────────────────────────────────────────────

async function handleClaim(interaction) {
  await interaction.deferReply();

  const userId = interaction.user.id;
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
  const cooldown = db.checkClaimCooldown(player);
  if (cooldown.onCooldown) {
    return interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor(0xEF4444)
          .setTitle('⚡  POWER SYSTEMS RECHARGING')
          .setDescription(
            'Your Node is still cycling through the last power restoration.\n\n' +
            `**Next claim in:** \`${db.formatCooldown(cooldown.remainingMs)}\`\n\n` +
            '*Passive regen: +1 Power every 30 minutes.*\n\n' +
            '> `/mission` or `/status` while you wait.'
          )
      ]
    });
  }

  // ── Build rewards ──────────────────────────────────────────────────────
  let rewards = { ...BASE_CLAIM };
  const guardianBonus = GUARDIAN_CLAIM_BONUS[player.guardian];
  if (guardianBonus) rewards = guardianBonus(rewards);

  // ── Session + momentum ─────────────────────────────────────────────────
  const newSessionCount = player.session_count + 1;
  const momentum = pie.checkMomentumEvent(newSessionCount);

  if (momentum.active) {
    if (momentum.event.bonus.intel)      rewards.intel      = (rewards.intel || 0) + momentum.event.bonus.intel;
    if (momentum.event.bonus.credits)    rewards.credits   += momentum.event.bonus.credits;
    if (momentum.event.bonus.xp)         rewards.xp        += momentum.event.bonus.xp;
    if (momentum.event.bonus.node_score) rewards.node_score = momentum.event.bonus.node_score || 0;
  }

  // ── Apply to DB ────────────────────────────────────────────────────────
  const { player: updated, evolved } = await db.applyDelta(userId, {
    power:         rewards.power,
    credits:       rewards.credits,
    intel:         rewards.intel || 0,
    xp:            rewards.xp,
    node_score:    rewards.node_score || 0,
    session_count: 1,
    last_claim:    new Date(),
  });

  // ── Build embed ────────────────────────────────────────────────────────
  const embed = new EmbedBuilder()
    .setColor(0x2563EB)
    .setTitle('⚡  POWER RESTORED — NODE ONLINE')
    .setDescription('*Your Node pulses back to life. The Nexus responds.*')
    .addFields({
      name: 'RESOURCES GAINED',
      value: [
        `\`+ ${rewards.power} Power\`      [🔋 ${updated.power} / ${updated.max_power}]`,
        `\`+ ${rewards.credits} Credits\`   [Total: ${updated.credits}]`,
        rewards.intel ? `\`+ ${rewards.intel} Intel\`     [Total: ${updated.intel}]` : null,
        `\`+ ${rewards.xp} XP\`          [${updated.xp} / ${db.xpToNextRank(updated.xp) || '—'} to next rank]`,
      ].filter(Boolean).join('\n'),
    });

  if (player.guardian === 'tarin' && rewards.intel_passive) {
    embed.addFields({
      name:  '🐘  TARIN STABILITY',
      value: `*Passive generation holding steady.*\n\`+ ${rewards.intel_passive} Intel (passive)\``,
    });
  }

  if (momentum.active) {
    embed.addFields({
      name:  `🌊  ${momentum.event.name.toUpperCase()} — SESSION BONUS`,
      value: `*${momentum.event.narrative}*`,
    });
  }

  if (evolved) {
    embed.setColor(0xD4A017);
    embed.addFields({
      name:  `🏛️  CITADEL EVOLVING — STAGE ${updated.stage}`,
      value: `*Your Node awakens. The Nexus takes notice.*\n**${db.getStageName(updated.stage)}** unlocked.`,
    });
  }

  const nextStage = db.getNextStage(updated.stage);
  embed.addFields({
    name:  '━━━━━━━━━━━━━━━━',
    value: [
      `> 🔋 You have **${updated.power} Power** — run a mission`,
      `> ➤  \`/mission recon\``,
      `> ➤  \`/status\` — full Citadel view`,
      nextStage ? `> 📈 Node Score: **${updated.node_score}** / ${nextStage.node_score_required} → *${nextStage.name}*` : '',
    ].filter(Boolean).join('\n'),
  });

  embed.setFooter({ text: `Next claim in 8 hours  |  Session #${newSessionCount}` });

  return interaction.editReply({ embeds: [embed] });
}

module.exports = { handleClaim };