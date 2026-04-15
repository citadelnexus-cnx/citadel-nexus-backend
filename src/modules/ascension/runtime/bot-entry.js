/**
 * ============================================================
 * CITADEL ASCENSION — Bot Entry Point
 * Current integrated backend version
 * Uses player-service from handlers folder for now
 * ============================================================
 */

require('dotenv').config();

const { Client, GatewayIntentBits, Events } = require('discord.js');
const db = require('../handlers/player-service');

const { handleStart, handleGuardianSelect } = require('../handlers/start-handler');
const { handleClaim } = require('../handlers/claim-handler');
const { handleMission, handleBuild } = require('../handlers/mission-handler');
const { handleStatus } = require('../handlers/status-handler');
const { handleAdminCommand } = require('../admin/admin-handler');

// ─── ADMIN COMMAND LIST ───────────────────────────────────────────────────────

const ADMIN_COMMANDS = new Set([
  'admin_player_view',
  'admin_inventory_view',
  'admin_add_xp',
  'admin_remove_xp',
  'admin_set_xp',
  'admin_grant_resource',
  'admin_remove_resource',
  'admin_set_resource',
  'admin_reset_player',
  'admin_delete_player',
  'admin_reset_all',
  'admin_recalc_player',
  'admin_lock_player',
  'admin_unlock_player',
  'admin_restore_player',
  'admin_award_all',
  'admin_award_top',
  'admin_prize_pool_view',
  'admin_prize_pool_add',
  'admin_prize_pool_award',
  'admin_prize_pool_remove',
]);

// ─── CLIENT ───────────────────────────────────────────────────────────────────

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once(Events.ClientReady, async () => {
  try {
    console.log(`✅ Citadel Ascension online as ${client.user.tag}`);
    await db.connect(process.env.MONGO_URI);
    console.log('✅ Database connected');
    console.log(`✅ Phase ${process.env.CURRENT_PHASE || 1} caps active`);
  } catch (error) {
    console.error('❌ Startup failure:', error);
  }
});

// ─── INTERACTION ROUTER ───────────────────────────────────────────────────────

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const cmd = interaction.commandName;

    if (!ADMIN_COMMANDS.has(cmd)) {
      console.log(`[CMD] /${cmd} | user:${interaction.user.id} | ${new Date().toISOString()}`);
    } else {
      console.log(`[ADMIN] /${cmd} | admin:${interaction.user.id} | ${new Date().toISOString()}`);
    }

    try {
      if (ADMIN_COMMANDS.has(cmd)) {
        return await handleAdminCommand(interaction);
      }

      switch (cmd) {
        case 'start':
          return await handleStart(interaction);
        case 'claim':
          return await handleClaim(interaction);
        case 'mission':
          return await handleMission(interaction);
        case 'build':
          return await handleBuild(interaction);
        case 'status':
          return await handleStatus(interaction);
        default:
          return interaction.reply({
            content: 'Unknown command.',
            ephemeral: true,
          });
      }
    } catch (err) {
      console.error(`[ERR] /${cmd}:`, err);

      const msg = {
        content: '⚠️ The Nexus encountered an error. Try again.',
        ephemeral: true,
      };

      if (interaction.deferred || interaction.replied) {
        return interaction.followUp(msg);
      }

      return interaction.reply(msg);
    }
  }

  if (interaction.isButton()) {
    try {
      if (interaction.customId.startsWith('guardian_')) {
        return await handleGuardianSelect(interaction);
      }
    } catch (err) {
      console.error('[ERR] Button interaction:', err);

      if (interaction.deferred || interaction.replied) {
        return interaction.followUp({
          content: '⚠️ Something went wrong.',
          ephemeral: true,
        });
      }

      return interaction.reply({
        content: '⚠️ Something went wrong.',
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.BOT_TOKEN);