/**
 * ============================================================
 * CITADEL ASCENSION — Admin Handler
 * Founder-only command parsing, permission checks, responses.
 * ============================================================
 */

const { EmbedBuilder } = require("discord.js");
const svc = require("./admin-service");

const FOUNDER_IDS = (process.env.FOUNDER_IDS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

function isFounder(userId) {
  return FOUNDER_IDS.includes(userId);
}

function deny(interaction) {
  return interaction.reply({
    content: "🔒 Unauthorized.",
    flags: 64
  });
}

function successEmbed(title, fields) {
  return new EmbedBuilder()
    .setColor(0x2563eb)
    .setTitle(`🛡️ ${title}`)
    .addFields(fields)
    .setFooter({ text: `Citadel Admin | ${new Date().toISOString()}` });
}

function destructiveEmbed(title, fields) {
  return new EmbedBuilder()
    .setColor(0xef4444)
    .setTitle(`⚠️ ${title}`)
    .addFields(fields)
    .setFooter({ text: "Citadel Admin | Logged permanently" });
}

function boolText(value) {
  return value ? "true" : "false";
}

function phaseCapText(phaseCaps, phase) {
  const row = phaseCaps[String(phase)] || phaseCaps[phase];
  if (!row) return "Unknown";
  return `Stage cap ${row.stage} | Building cap ${row.building}`;
}

// ─── ADMIN HELP ───────────────────────────────────────────────

async function adminHelp(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const status = svc.getAdminModeStatus();

  const embed = new EmbedBuilder()
    .setColor(0x1d4ed8)
    .setTitle("🛡️ ADMIN MODE — ASCENSION OPS")
    .setDescription(
      "Current admin operating mode and restrictions for this Ascension build."
    )
    .addFields(
      {
        name: "Mode",
        value: [
          `ADMIN_MODE: \`${status.adminMode}\``,
          `CURRENT_PHASE: \`${status.currentPhase}\``,
          `Phase Cap: \`${phaseCapText(status.phaseCaps, status.currentPhase)}\``,
          `STRICT_ECONOMY: \`${boolText(status.strictEconomy)}\``,
          `ALLOW_GLOBAL_RESET: \`${boolText(status.allowGlobalReset)}\``
        ].join("\n")
      },
      {
        name: "Allowed Now",
        value: [
          "`/admin_help`",
          "`/admin_player_view`",
          "`/admin_inventory_view`",
          "`/admin_prize_pool_view`",
          "`/admin_prize_pool_add`",
          "`/admin_prize_pool_award`",
          "`/admin_prize_pool_remove`",
          "`/admin_recalc_player`",
          "`/admin_lock_player`",
          "`/admin_unlock_player`",
          "`/admin_restore_player`",
          "`/admin_award_all`",
          "`/admin_award_top`"
        ].join("\n")
      },
      {
        name: "Restricted / Conditional",
        value: [
          status.strictEconomy
            ? "Direct XP/resource mutation is blocked by `STRICT_ECONOMY=true`."
            : "Direct XP/resource mutation is allowed.",
          status.adminMode !== "dev"
            ? "Destructive commands are blocked outside `dev` mode."
            : "Destructive commands are allowed in `dev` mode.",
          status.allowGlobalReset
            ? "`/admin_reset_all` is enabled."
            : "`/admin_reset_all` is disabled by env flag."
        ].join("\n")
      },
      {
        name: "Direct Mutation Commands",
        value: [
          "`/admin_add_xp`",
          "`/admin_remove_xp`",
          "`/admin_set_xp`",
          "`/admin_grant_resource`",
          "`/admin_remove_resource`",
          "`/admin_set_resource`"
        ].join("\n")
      },
      {
        name: "Destructive Commands",
        value: [
          "`/admin_reset_player`",
          "`/admin_delete_player`",
          "`/admin_reset_all`"
        ].join("\n")
      },
      {
        name: "Operator Reminder",
        value:
          "Ascension is intentionally capped around Phase 1–2. Keep rewards lightweight, prefer prize-pool distribution outside dev mode, and avoid destructive admin actions unless you are intentionally testing recovery paths."
      }
    )
    .setFooter({ text: "Citadel Admin | Lightweight ops surface" });

  return interaction.editReply({ embeds: [embed] });
}

// ─── A. INSPECTION ────────────────────────────────────────────

async function adminPlayerView(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const target = interaction.options.getUser("target_user");
  const player = await svc.getPlayerView(target.id);

  if (!player) {
    return interaction.editReply({
      content: `No player record found for ${target.username}.`
    });
  }

  const b = player.buildings;
  return interaction.editReply({
    embeds: [
      successEmbed(`PLAYER VIEW — ${player.username || target.username}`, [
        {
          name: "Identity",
          value: `Guardian: **${player.guardian}** | Stage: **${player.stage}** | Rank: **${player.rank}**`,
          inline: false
        },
        {
          name: "Progression",
          value: `XP: **${player.xp}** | Node Score: **${player.node_score}** | Sessions: **${player.session_count}**`,
          inline: false
        },
        {
          name: "Resources",
          value: `Power: **${player.power}/${player.max_power}** | Credits: **${player.credits}** | Intel: **${player.intel}**`,
          inline: false
        },
        {
          name: "Buildings",
          value: `Knowledge Core: L${b.knowledge_core} | Trade Hub: L${b.trade_hub} | Power Reactor: L${b.power_reactor} | Security: L${b.security_layer}`,
          inline: false
        },
        {
          name: "Timestamps",
          value: `Last Claim: ${player.last_claim || "Never"}\nCreated: ${player.created_at}`,
          inline: false
        }
      ])
    ]
  });
}

async function adminInventoryView(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const target = interaction.options.getUser("target_user");
  const inv = await svc.getInventoryView(target.id);

  if (!inv) {
    return interaction.editReply({
      content: `No inventory found for ${target.username}.`
    });
  }

  const rs = inv.rarity_summary || {};

  return interaction.editReply({
    embeds: [
      successEmbed(`INVENTORY — ${target.username}`, [
        {
          name: "Item Counts",
          value:
            `Relics: ${inv.relic_count ?? 0} | ` +
            `Artifacts: ${inv.artifact_count ?? 0} | ` +
            `Cosmetics: ${inv.cosmetic_count ?? 0} | ` +
            `Collectibles: ${inv.collectible_count ?? 0} | ` +
            `Titles: ${inv.title_count ?? 0}`,
          inline: false
        },
        {
          name: "Equipped",
          value: `Relics equipped: ${inv.equipped_relics ?? 0}`,
          inline: false
        },
        {
          name: "Rarity Summary",
          value:
            `Common: ${rs.common ?? 0} | ` +
            `Uncommon: ${rs.uncommon ?? 0} | ` +
            `Rare: ${rs.rare ?? 0} | ` +
            `Epic: ${rs.epic ?? 0} | ` +
            `Legendary: ${rs.legendary ?? 0}`,
          inline: false
        },
        {
          name: "Total Items",
          value: `${inv.total_items ?? 0}`,
          inline: false
        }
      ])
    ]
  });
}

// ─── B. XP CONTROL ───────────────────────────────────────────

async function adminAddXP(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const target = interaction.options.getUser("target_user");
  const amount = interaction.options.getInteger("amount");
  const reason = interaction.options.getString("reason");

  try {
    const result = await svc.addXP(
      interaction.user.id,
      interaction.user.username,
      target.id,
      amount,
      reason
    );

    return interaction.editReply({
      embeds: [
        successEmbed("XP ADDED", [
          { name: "Target", value: target.username, inline: true },
          { name: "Amount", value: `+${amount} XP`, inline: true },
          { name: "Before", value: `${result.before} XP`, inline: true },
          { name: "After", value: `${result.after} XP`, inline: true },
          { name: "Rank", value: result.rank, inline: true },
          { name: "Reason", value: reason, inline: false },
          { name: "Logged", value: "✅ Yes", inline: true }
        ])
      ]
    });
  } catch (err) {
    return interaction.editReply({ content: `❌ ${err.message}` });
  }
}

async function adminRemoveXP(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const target = interaction.options.getUser("target_user");
  const amount = interaction.options.getInteger("amount");
  const reason = interaction.options.getString("reason");

  try {
    const result = await svc.removeXP(
      interaction.user.id,
      interaction.user.username,
      target.id,
      amount,
      reason
    );

    return interaction.editReply({
      embeds: [
        successEmbed("XP REMOVED", [
          { name: "Target", value: target.username, inline: true },
          { name: "Amount", value: `-${amount} XP`, inline: true },
          { name: "Before", value: `${result.before} XP`, inline: true },
          { name: "After", value: `${result.after} XP`, inline: true },
          { name: "Rank", value: result.rank, inline: true },
          { name: "Reason", value: reason, inline: false },
          { name: "Logged", value: "✅ Yes", inline: true }
        ])
      ]
    });
  } catch (err) {
    return interaction.editReply({ content: `❌ ${err.message}` });
  }
}

async function adminSetXP(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const target = interaction.options.getUser("target_user");
  const value = interaction.options.getInteger("value");
  const reason = interaction.options.getString("reason");

  try {
    const result = await svc.setXP(
      interaction.user.id,
      interaction.user.username,
      target.id,
      value,
      reason
    );

    return interaction.editReply({
      embeds: [
        successEmbed("XP SET", [
          { name: "Target", value: target.username, inline: true },
          { name: "Before", value: `${result.before} XP`, inline: true },
          { name: "After", value: `${result.after} XP`, inline: true },
          { name: "Rank", value: result.rank, inline: true },
          { name: "Reason", value: reason, inline: false },
          { name: "Logged", value: "✅ Yes", inline: true }
        ])
      ]
    });
  } catch (err) {
    return interaction.editReply({ content: `❌ ${err.message}` });
  }
}

// ─── C. RESOURCE CONTROL ─────────────────────────────────────

async function adminGrantResource(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const target = interaction.options.getUser("target_user");
  const resource = interaction.options.getString("resource_type");
  const amount = interaction.options.getInteger("amount");
  const reason = interaction.options.getString("reason");

  try {
    const result = await svc.grantResource(
      interaction.user.id,
      interaction.user.username,
      target.id,
      resource,
      amount,
      reason
    );

    return interaction.editReply({
      embeds: [
        successEmbed("RESOURCE GRANTED", [
          { name: "Target", value: target.username, inline: true },
          { name: "Resource", value: resource, inline: true },
          { name: "Amount", value: `+${amount}`, inline: true },
          { name: "Before", value: `${result.before}`, inline: true },
          { name: "After", value: `${result.after}`, inline: true },
          { name: "Reason", value: reason, inline: false },
          { name: "Logged", value: "✅ Yes", inline: true }
        ])
      ]
    });
  } catch (err) {
    return interaction.editReply({ content: `❌ ${err.message}` });
  }
}

async function adminRemoveResource(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const target = interaction.options.getUser("target_user");
  const resource = interaction.options.getString("resource_type");
  const amount = interaction.options.getInteger("amount");
  const reason = interaction.options.getString("reason");

  try {
    const result = await svc.removeResource(
      interaction.user.id,
      interaction.user.username,
      target.id,
      resource,
      amount,
      reason
    );

    return interaction.editReply({
      embeds: [
        successEmbed("RESOURCE REMOVED", [
          { name: "Target", value: target.username, inline: true },
          { name: "Resource", value: resource, inline: true },
          { name: "Amount", value: `-${amount}`, inline: true },
          { name: "Before", value: `${result.before}`, inline: true },
          { name: "After", value: `${result.after}`, inline: true },
          { name: "Reason", value: reason, inline: false },
          { name: "Logged", value: "✅ Yes", inline: true }
        ])
      ]
    });
  } catch (err) {
    return interaction.editReply({ content: `❌ ${err.message}` });
  }
}

async function adminSetResource(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const target = interaction.options.getUser("target_user");
  const resource = interaction.options.getString("resource_type");
  const value = interaction.options.getInteger("value");
  const reason = interaction.options.getString("reason");

  try {
    const result = await svc.setResource(
      interaction.user.id,
      interaction.user.username,
      target.id,
      resource,
      value,
      reason
    );

    return interaction.editReply({
      embeds: [
        successEmbed("RESOURCE SET", [
          { name: "Target", value: target.username, inline: true },
          { name: "Resource", value: resource, inline: true },
          { name: "Before", value: `${result.before}`, inline: true },
          { name: "After", value: `${result.after}`, inline: true },
          { name: "Reason", value: reason, inline: false },
          { name: "Logged", value: "✅ Yes", inline: true }
        ])
      ]
    });
  } catch (err) {
    return interaction.editReply({ content: `❌ ${err.message}` });
  }
}

// ─── D. PLAYER STATE CONTROL ─────────────────────────────────

async function adminResetPlayer(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const target = interaction.options.getUser("target_user");
  const confirm = interaction.options.getString("confirm");
  const reason = interaction.options.getString("reason");

  if (confirm !== "RESET") {
    return interaction.editReply({
      content: "❌ Confirmation failed. Type exactly: `RESET`"
    });
  }

  try {
    const result = await svc.resetPlayer(
      interaction.user.id,
      interaction.user.username,
      target.id,
      reason
    );

    return interaction.editReply({
      embeds: [
        destructiveEmbed("PLAYER RESET COMPLETE", [
          { name: "Target", value: result.username || target.username, inline: true },
          { name: "Guardian", value: `${result.guardian} (preserved)`, inline: true },
          { name: "State", value: "Reset to starter values", inline: false },
          { name: "Snapshot", value: "✅ Pre-reset state archived", inline: false },
          { name: "Reason", value: reason, inline: false },
          { name: "Logged", value: "✅ Yes", inline: true }
        ])
      ]
    });
  } catch (err) {
    return interaction.editReply({ content: `❌ ${err.message}` });
  }
}

async function adminDeletePlayer(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const target = interaction.options.getUser("target_user");
  const confirmPhrase = interaction.options.getString("confirm_phrase");
  const reason = interaction.options.getString("reason");

  if (confirmPhrase !== "DELETE_PLAYER") {
    return interaction.editReply({
      content: "❌ Confirmation failed. Type exactly: `DELETE_PLAYER`"
    });
  }

  try {
    const result = await svc.deletePlayer(
      interaction.user.id,
      interaction.user.username,
      target.id,
      reason
    );

    return interaction.editReply({
      embeds: [
        destructiveEmbed("PLAYER DELETED", [
          { name: "Target", value: result.username || target.username, inline: true },
          { name: "Status", value: "Record removed from DB", inline: false },
          { name: "Snapshot", value: "✅ Pre-delete state archived", inline: false },
          { name: "Reason", value: reason, inline: false },
          { name: "Logged", value: "✅ Yes", inline: true }
        ])
      ]
    });
  } catch (err) {
    return interaction.editReply({ content: `❌ ${err.message}` });
  }
}

async function adminResetAll(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const confirmPhrase = interaction.options.getString("confirm_phrase");
  const reason = interaction.options.getString("reason");

  if (confirmPhrase !== "RESET_ALL_PLAYERS") {
    return interaction.editReply({
      content: "❌ Confirmation failed. Type exactly: `RESET_ALL_PLAYERS`"
    });
  }

  try {
    const result = await svc.resetAll(
      interaction.user.id,
      interaction.user.username,
      reason
    );

    return interaction.editReply({
      embeds: [
        destructiveEmbed("BULK RESET COMPLETE", [
          { name: "Players Reset", value: `${result.count}`, inline: true },
          { name: "Snapshots", value: "✅ All pre-reset states archived", inline: false },
          { name: "Reason", value: reason, inline: false },
          { name: "Logged", value: "✅ Yes", inline: true }
        ])
      ]
    });
  } catch (err) {
    return interaction.editReply({ content: `❌ ${err.message}` });
  }
}

async function adminRecalcPlayer(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const target = interaction.options.getUser("target_user");
  const reason = interaction.options.getString("reason");

  try {
    const result = await svc.recalcPlayer(
      interaction.user.id,
      interaction.user.username,
      target.id,
      reason
    );

    return interaction.editReply({
      embeds: [
        successEmbed("PLAYER RECALCULATED", [
          { name: "Target", value: target.username, inline: true },
          { name: "Rank Before", value: result.before.rank, inline: true },
          { name: "Rank After", value: result.after.rank, inline: true },
          { name: "Stage After", value: `${result.after.stage}`, inline: true },
          { name: "Max Power", value: `${result.after.max_power}`, inline: true },
          { name: "Reason", value: reason, inline: false },
          { name: "Logged", value: "✅ Yes", inline: true }
        ])
      ]
    });
  } catch (err) {
    return interaction.editReply({ content: `❌ ${err.message}` });
  }
}

// ─── E. PRIZE POOL ────────────────────────────────────────────

async function adminPrizePoolView(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const pool = await svc.prizePoolView();

  return interaction.editReply({
    embeds: [
      successEmbed("PRIZE POOL STATUS", [
        { name: "Available Balance", value: `${pool.total_xp_available} XP`, inline: true },
        { name: "Total Added", value: `${pool.total_xp_added} XP`, inline: true },
        { name: "Total Awarded", value: `${pool.total_xp_awarded} XP`, inline: true },
        { name: "Total Removed", value: `${pool.total_xp_removed} XP`, inline: true },
        { name: "Last Updated", value: pool.updated_at?.toISOString() || "Never", inline: false }
      ])
    ]
  });
}

async function adminPrizePoolAdd(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const amount = interaction.options.getInteger("amount");
  const sourceNote = interaction.options.getString("source_note");
  const reason = interaction.options.getString("reason");

  try {
    const pool = await svc.prizePoolAdd(
      interaction.user.id,
      interaction.user.username,
      amount,
      sourceNote,
      reason
    );

    return interaction.editReply({
      embeds: [
        successEmbed("PRIZE POOL — XP ADDED", [
          { name: "Added", value: `+${amount} XP`, inline: true },
          { name: "New Balance", value: `${pool.total_xp_available} XP`, inline: true },
          { name: "Source", value: sourceNote, inline: false },
          { name: "Reason", value: reason, inline: false },
          { name: "Logged", value: "✅ Yes", inline: true }
        ])
      ]
    });
  } catch (err) {
    return interaction.editReply({ content: `❌ ${err.message}` });
  }
}

async function adminPrizePoolAward(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const target = interaction.options.getUser("target_user");
  const amount = interaction.options.getInteger("amount");
  const reason = interaction.options.getString("reason");

  try {
    const result = await svc.prizePoolAward(
      interaction.user.id,
      interaction.user.username,
      target.id,
      amount,
      reason
    );

    return interaction.editReply({
      embeds: [
        successEmbed("PRIZE POOL — XP AWARDED", [
          { name: "Target", value: target.username, inline: true },
          { name: "XP Awarded", value: `+${amount} XP`, inline: true },
          { name: "Player XP", value: `${result.player_xp_before} → ${result.player_xp_after}`, inline: false },
          { name: "Player Rank", value: result.player_rank, inline: true },
          { name: "Pool Balance", value: `${result.pool_balance} XP remaining`, inline: true },
          { name: "Reason", value: reason, inline: false },
          { name: "Logged", value: "✅ Yes", inline: true }
        ])
      ]
    });
  } catch (err) {
    return interaction.editReply({ content: `❌ ${err.message}` });
  }
}

async function adminPrizePoolRemove(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const amount = interaction.options.getInteger("amount");
  const reason = interaction.options.getString("reason");

  try {
    const pool = await svc.prizePoolRemove(
      interaction.user.id,
      interaction.user.username,
      amount,
      reason
    );

    return interaction.editReply({
      embeds: [
        successEmbed("PRIZE POOL — XP REMOVED", [
          { name: "Removed", value: `-${amount} XP`, inline: true },
          { name: "New Balance", value: `${pool.total_xp_available} XP`, inline: true },
          { name: "Reason", value: reason, inline: false },
          { name: "Logged", value: "✅ Yes", inline: true }
        ])
      ]
    });
  } catch (err) {
    return interaction.editReply({ content: `❌ ${err.message}` });
  }
}

// ─── LOCK / UNLOCK ────────────────────────────────────────────

async function adminLockPlayer(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const target = interaction.options.getUser("target_user");
  const reason = interaction.options.getString("reason");

  try {
    const result = await svc.lockPlayer(
      interaction.user.id,
      interaction.user.username,
      target.id,
      reason
    );

    return interaction.editReply({
      embeds: [
        destructiveEmbed("PLAYER LOCKED", [
          { name: "Target", value: result.username || target.username, inline: true },
          { name: "Status", value: "🔒 Account locked — gameplay blocked", inline: false },
          { name: "Reason", value: reason, inline: false },
          { name: "Logged", value: "✅ Yes", inline: true }
        ])
      ]
    });
  } catch (err) {
    return interaction.editReply({ content: `❌ ${err.message}` });
  }
}

async function adminUnlockPlayer(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const target = interaction.options.getUser("target_user");
  const reason = interaction.options.getString("reason");

  try {
    const result = await svc.unlockPlayer(
      interaction.user.id,
      interaction.user.username,
      target.id,
      reason
    );

    return interaction.editReply({
      embeds: [
        successEmbed("PLAYER UNLOCKED", [
          { name: "Target", value: result.username || target.username, inline: true },
          { name: "Status", value: "🔓 Account unlocked — gameplay restored", inline: false },
          { name: "Reason", value: reason, inline: false },
          { name: "Logged", value: "✅ Yes", inline: true }
        ])
      ]
    });
  } catch (err) {
    return interaction.editReply({ content: `❌ ${err.message}` });
  }
}

// ─── RESTORE ──────────────────────────────────────────────────

async function adminRestorePlayer(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const target = interaction.options.getUser("target_user");
  const reason = interaction.options.getString("reason");

  try {
    const result = await svc.restorePlayer(
      interaction.user.id,
      interaction.user.username,
      target.id,
      reason
    );

    return interaction.editReply({
      embeds: [
        successEmbed("PLAYER RESTORED FROM SNAPSHOT", [
          { name: "Target", value: result.username || target.username, inline: true },
          { name: "Snapshot Type", value: result.snapshot_type, inline: true },
          { name: "Snapshot Date", value: new Date(result.snapshot_date).toISOString(), inline: false },
          { name: "Reason", value: reason, inline: false },
          { name: "Logged", value: "✅ Yes", inline: true }
        ])
      ]
    });
  } catch (err) {
    return interaction.editReply({ content: `❌ ${err.message}` });
  }
}

// ─── BULK AWARD ───────────────────────────────────────────────

async function adminAwardAll(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const amount = interaction.options.getInteger("amount_each");
  const reason = interaction.options.getString("reason");

  try {
    const result = await svc.bulkAwardAll(
      interaction.user.id,
      interaction.user.username,
      amount,
      reason
    );

    return interaction.editReply({
      embeds: [
        successEmbed("BULK AWARD — ALL PLAYERS", [
          { name: "Players Awarded", value: `${result.players_awarded}`, inline: true },
          { name: "XP Each", value: `+${amount}`, inline: true },
          { name: "Total XP Spent", value: `${result.total_xp_spent}`, inline: true },
          { name: "Pool Balance", value: `${result.pool_balance} XP remaining`, inline: true },
          { name: "Reason", value: reason, inline: false },
          { name: "Logged", value: "✅ Yes", inline: true }
        ])
      ]
    });
  } catch (err) {
    return interaction.editReply({ content: `❌ ${err.message}` });
  }
}

async function adminAwardTop(interaction) {
  if (!isFounder(interaction.user.id)) return deny(interaction);
  await interaction.deferReply({ flags: 64 });

  const topN = interaction.options.getInteger("top_n");
  const amount = interaction.options.getInteger("amount_each");
  const reason = interaction.options.getString("reason");

  try {
    const result = await svc.bulkAwardTop(
      interaction.user.id,
      interaction.user.username,
      topN,
      amount,
      reason
    );

    return interaction.editReply({
      embeds: [
        successEmbed(`BULK AWARD — TOP ${topN} PLAYERS`, [
          { name: "Players Awarded", value: `${result.awarded}`, inline: true },
          { name: "Skipped (locked)", value: `${result.skipped}`, inline: true },
          { name: "XP Each", value: `+${amount}`, inline: true },
          { name: "Total XP Spent", value: `${result.total_xp_spent}`, inline: true },
          { name: "Pool Balance", value: `${result.pool_balance} XP remaining`, inline: true },
          { name: "Reason", value: reason, inline: false },
          { name: "Logged", value: "✅ Yes", inline: true }
        ])
      ]
    });
  } catch (err) {
    return interaction.editReply({ content: `❌ ${err.message}` });
  }
}

// ─── ROUTER ───────────────────────────────────────────────────

async function handleAdminCommand(interaction) {
  switch (interaction.commandName) {
    case "admin_help":
      return adminHelp(interaction);
    case "admin_player_view":
      return adminPlayerView(interaction);
    case "admin_inventory_view":
      return adminInventoryView(interaction);
    case "admin_add_xp":
      return adminAddXP(interaction);
    case "admin_remove_xp":
      return adminRemoveXP(interaction);
    case "admin_set_xp":
      return adminSetXP(interaction);
    case "admin_grant_resource":
      return adminGrantResource(interaction);
    case "admin_remove_resource":
      return adminRemoveResource(interaction);
    case "admin_set_resource":
      return adminSetResource(interaction);
    case "admin_reset_player":
      return adminResetPlayer(interaction);
    case "admin_delete_player":
      return adminDeletePlayer(interaction);
    case "admin_reset_all":
      return adminResetAll(interaction);
    case "admin_recalc_player":
      return adminRecalcPlayer(interaction);
    case "admin_lock_player":
      return adminLockPlayer(interaction);
    case "admin_unlock_player":
      return adminUnlockPlayer(interaction);
    case "admin_restore_player":
      return adminRestorePlayer(interaction);
    case "admin_award_all":
      return adminAwardAll(interaction);
    case "admin_award_top":
      return adminAwardTop(interaction);
    case "admin_prize_pool_view":
      return adminPrizePoolView(interaction);
    case "admin_prize_pool_add":
      return adminPrizePoolAdd(interaction);
    case "admin_prize_pool_award":
      return adminPrizePoolAward(interaction);
    case "admin_prize_pool_remove":
      return adminPrizePoolRemove(interaction);
    default:
      return;
  }
}

module.exports = { handleAdminCommand };