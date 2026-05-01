/**
 * ============================================================
 * CITADEL ASCENSION — deploy-commands.js
 * Registers all slash commands: player + admin
 * ============================================================
 */

require("dotenv").config();

const { REST, Routes, SlashCommandBuilder } = require("discord.js");

// ─── PLAYER COMMANDS ──────────────────────────────────────────

const playerCommands = [
  new SlashCommandBuilder()
    .setName("start")
    .setDescription("Initialize your Node and choose your Guardian.")
    .toJSON(),

  new SlashCommandBuilder()
    .setName("claim")
    .setDescription("Claim Power restoration and daily resources. (8hr cooldown)")
    .toJSON(),

  new SlashCommandBuilder()
    .setName("mission")
    .setDescription("Run a Nexus mission to earn Credits, Intel, and XP.")
    .addStringOption((o) =>
      o
        .setName("type")
        .setDescription("Mission type.")
        .setRequired(true)
        .addChoices(
          { name: "🔍 Recon — Balanced (Safe)", value: "recon" },
          { name: "💰 Trade Run — High Credits (Safe)", value: "trade_run" },
          { name: "🧠 Archive Dive — High Intel (Medium risk)", value: "archive_dive" },
          { name: "⚡ Stabilize Node — Guaranteed (Safe)", value: "stabilize_node" },
          { name: "🔥 Black Market — High Credits (High risk)", value: "black_market" },
          { name: "📡 Deep Scan — High Intel (High risk)", value: "deep_scan" }
        )
    )
    .toJSON(),

  new SlashCommandBuilder()
    .setName("build")
    .setDescription("Upgrade a Citadel building.")
    .addStringOption((o) =>
      o
        .setName("building")
        .setDescription("Building to upgrade.")
        .setRequired(true)
        .addChoices(
          { name: "🧠 Knowledge Core — Intel generation", value: "knowledge_core" },
          { name: "💰 Trade Hub — Credit generation", value: "trade_hub" },
          { name: "⚡ Power Reactor — Max Power capacity", value: "power_reactor" },
          { name: "🔐 Security Layer — Risk reduction", value: "security_layer" }
        )
    )
    .toJSON(),

  new SlashCommandBuilder()
    .setName("status")
    .setDescription("View your full Citadel status dashboard.")
    .toJSON()
];

// ─── ADMIN COMMANDS ───────────────────────────────────────────

const RESOURCES = [
  { name: "Credits", value: "credits" },
  { name: "Intel", value: "intel" },
  { name: "Power", value: "power" },
  { name: "Node Score", value: "node_score" }
];

const adminCommands = [
  new SlashCommandBuilder()
    .setName("admin_help")
    .setDescription("[ADMIN] View current admin mode, allowed commands, and restrictions.")
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_player_view")
    .setDescription("[ADMIN] View full raw player state.")
    .addUserOption((o) => o.setName("target_user").setDescription("Target player.").setRequired(true))
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_inventory_view")
    .setDescription("[ADMIN] View player inventory summary.")
    .addUserOption((o) => o.setName("target_user").setDescription("Target player.").setRequired(true))
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_add_xp")
    .setDescription("[ADMIN] Add XP to a player.")
    .addUserOption((o) => o.setName("target_user").setDescription("Target player.").setRequired(true))
    .addIntegerOption((o) => o.setName("amount").setDescription("XP amount.").setRequired(true).setMinValue(1))
    .addStringOption((o) => o.setName("reason").setDescription("Reason (required).").setRequired(true))
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_remove_xp")
    .setDescription("[ADMIN] Remove XP from a player.")
    .addUserOption((o) => o.setName("target_user").setDescription("Target player.").setRequired(true))
    .addIntegerOption((o) => o.setName("amount").setDescription("XP amount.").setRequired(true).setMinValue(1))
    .addStringOption((o) => o.setName("reason").setDescription("Reason (required).").setRequired(true))
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_set_xp")
    .setDescription("[ADMIN] Set player XP to exact value.")
    .addUserOption((o) => o.setName("target_user").setDescription("Target player.").setRequired(true))
    .addIntegerOption((o) => o.setName("value").setDescription("XP value.").setRequired(true).setMinValue(0))
    .addStringOption((o) => o.setName("reason").setDescription("Reason (required).").setRequired(true))
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_grant_resource")
    .setDescription("[ADMIN] Grant resources to a player.")
    .addUserOption((o) => o.setName("target_user").setDescription("Target player.").setRequired(true))
    .addStringOption((o) => o.setName("resource_type").setDescription("Resource.").setRequired(true).addChoices(...RESOURCES))
    .addIntegerOption((o) => o.setName("amount").setDescription("Amount.").setRequired(true).setMinValue(1))
    .addStringOption((o) => o.setName("reason").setDescription("Reason (required).").setRequired(true))
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_remove_resource")
    .setDescription("[ADMIN] Remove resources from a player.")
    .addUserOption((o) => o.setName("target_user").setDescription("Target player.").setRequired(true))
    .addStringOption((o) => o.setName("resource_type").setDescription("Resource.").setRequired(true).addChoices(...RESOURCES))
    .addIntegerOption((o) => o.setName("amount").setDescription("Amount.").setRequired(true).setMinValue(1))
    .addStringOption((o) => o.setName("reason").setDescription("Reason (required).").setRequired(true))
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_set_resource")
    .setDescription("[ADMIN] Set a player resource to exact value.")
    .addUserOption((o) => o.setName("target_user").setDescription("Target player.").setRequired(true))
    .addStringOption((o) => o.setName("resource_type").setDescription("Resource.").setRequired(true).addChoices(...RESOURCES))
    .addIntegerOption((o) => o.setName("value").setDescription("Value.").setRequired(true).setMinValue(0))
    .addStringOption((o) => o.setName("reason").setDescription("Reason (required).").setRequired(true))
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_reset_player")
    .setDescription("[ADMIN] Reset a player to starter state.")
    .addUserOption((o) => o.setName("target_user").setDescription("Target player.").setRequired(true))
    .addStringOption((o) => o.setName("confirm").setDescription("Type exactly: RESET").setRequired(true))
    .addStringOption((o) => o.setName("reason").setDescription("Reason (required).").setRequired(true))
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_delete_player")
    .setDescription("[ADMIN] Delete a player from the DB.")
    .addUserOption((o) => o.setName("target_user").setDescription("Target player.").setRequired(true))
    .addStringOption((o) => o.setName("confirm_phrase").setDescription("Type exactly: DELETE_PLAYER").setRequired(true))
    .addStringOption((o) => o.setName("reason").setDescription("Reason (required).").setRequired(true))
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_reset_all")
    .setDescription("[ADMIN] ⚠️ Reset ALL players. Requires env flag.")
    .addStringOption((o) => o.setName("confirm_phrase").setDescription("Type exactly: RESET_ALL_PLAYERS").setRequired(true))
    .addStringOption((o) => o.setName("reason").setDescription("Reason (required).").setRequired(true))
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_recalc_player")
    .setDescription("[ADMIN] Recalculate player derived state.")
    .addUserOption((o) => o.setName("target_user").setDescription("Target player.").setRequired(true))
    .addStringOption((o) => o.setName("reason").setDescription("Reason (required).").setRequired(true))
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_lock_player")
    .setDescription("[ADMIN] Lock a player account — blocks all gameplay.")
    .addUserOption((o) => o.setName("target_user").setDescription("Target player.").setRequired(true))
    .addStringOption((o) => o.setName("reason").setDescription("Reason (required).").setRequired(true))
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_unlock_player")
    .setDescription("[ADMIN] Unlock a previously locked player account.")
    .addUserOption((o) => o.setName("target_user").setDescription("Target player.").setRequired(true))
    .addStringOption((o) => o.setName("reason").setDescription("Reason (required).").setRequired(true))
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_restore_player")
    .setDescription("[ADMIN] Restore player from most recent pre-reset/delete snapshot.")
    .addUserOption((o) => o.setName("target_user").setDescription("Target player.").setRequired(true))
    .addStringOption((o) => o.setName("reason").setDescription("Reason (required).").setRequired(true))
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_award_all")
    .setDescription("[ADMIN] Award XP from prize pool to ALL active players.")
    .addIntegerOption((o) => o.setName("amount_each").setDescription("XP per player.").setRequired(true).setMinValue(1))
    .addStringOption((o) => o.setName("reason").setDescription("Reason (required).").setRequired(true))
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_award_top")
    .setDescription("[ADMIN] Award XP from prize pool to top N players by Node Score.")
    .addIntegerOption((o) => o.setName("top_n").setDescription("Number of top players.").setRequired(true).setMinValue(1).setMaxValue(100))
    .addIntegerOption((o) => o.setName("amount_each").setDescription("XP per player.").setRequired(true).setMinValue(1))
    .addStringOption((o) => o.setName("reason").setDescription("Reason (required).").setRequired(true))
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_prize_pool_view")
    .setDescription("[ADMIN] View prize pool balance.")
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_prize_pool_add")
    .setDescription("[ADMIN] Add XP to prize pool.")
    .addIntegerOption((o) => o.setName("amount").setDescription("XP to add.").setRequired(true).setMinValue(1))
    .addStringOption((o) => o.setName("source_note").setDescription("Source of the XP.").setRequired(true))
    .addStringOption((o) => o.setName("reason").setDescription("Reason (required).").setRequired(true))
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_prize_pool_award")
    .setDescription("[ADMIN] Award XP from pool to a player.")
    .addUserOption((o) => o.setName("target_user").setDescription("Target player.").setRequired(true))
    .addIntegerOption((o) => o.setName("amount").setDescription("XP to award.").setRequired(true).setMinValue(1))
    .addStringOption((o) => o.setName("reason").setDescription("Reason (required).").setRequired(true))
    .toJSON(),

  new SlashCommandBuilder()
    .setName("admin_prize_pool_remove")
    .setDescription("[ADMIN] Remove XP from prize pool.")
    .addIntegerOption((o) => o.setName("amount").setDescription("XP to remove.").setRequired(true).setMinValue(1))
    .addStringOption((o) => o.setName("reason").setDescription("Reason (required).").setRequired(true))
    .toJSON()
];

// ─── REGISTER ─────────────────────────────────────────────────

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    const all = [...playerCommands, ...adminCommands];
    console.log(`Registering ${playerCommands.length} player + ${adminCommands.length} admin commands...`);

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: all }
    );

    console.log("✅ All commands registered.");
  } catch (err) {
    console.error("Failed to register commands:", err);
  }
})();