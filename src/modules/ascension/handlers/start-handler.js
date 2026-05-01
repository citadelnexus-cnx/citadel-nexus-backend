/**
 * ============================================================
 * CITADEL ASCENSION — /start Handler
 * Prisma/Supabase-backed start flow
 * Option A identity model:
 *   User.id = platform UUID
 *   AscensionProfile.userId = User.id
 *   AscensionProfile.discordId = Discord user id
 * ============================================================
 */

const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const {
  getResolvedAscensionActor,
  createPlayerProfile,
  getStageName,
} = require("../../../services/ascensionGameplayService");

const GUARDIANS = {
  nova: {
    emoji: "🦉",
    name: "Nova",
    focus: "Intel & Knowledge",
    bonus_1: "+20% Intel from all missions",
    bonus_2: "+10% chance for bonus Intel drop",
    playstyle: "Information broker — data maximizer",
    color: 0x60a5fa,
    intro: "Nova watches from the signal-dark. Where others see noise, she finds pattern.",
  },
  tarin: {
    emoji: "🐘",
    name: "Tarin",
    focus: "Build & Efficiency",
    bonus_1: "–10% all upgrade costs",
    bonus_2: "+10% passive Credit & Intel generation stability",
    playstyle: "Builder — optimizer — long-game specialist",
    color: 0x4ade80,
    intro: "Tarin has rebuilt more Nodes than the Nexus has records for. Slow. Certain. Unstoppable.",
  },
  raxa: {
    emoji: "🐅",
    name: "Raxa",
    focus: "Speed & Risk",
    bonus_1: "+20% Credits from all missions",
    bonus_2: "+10% critical success chance on all missions",
    playstyle: "Aggressive runner — high-risk, high-reward",
    color: 0xf59e0b,
    intro: "Raxa doesn't stabilize Nodes. She burns through them and takes what's valuable.",
  },
};

async function handleStart(interaction) {
  await interaction.deferReply();

  const discordId = interaction.user.id;
  const username = interaction.user.username;
  const discordTag = interaction.user.tag ?? interaction.user.username;

  const { profile } = await getResolvedAscensionActor({
    discordId,
    username,
    discordTag,
  });

  if (profile) {
    const guardian = GUARDIANS[profile.guardian] || GUARDIANS.nova;

    return interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor(0x1a3a6b)
          .setTitle("🏛️  NODE ALREADY ACTIVE")
          .setDescription(
            `Your Node is already online, **${username}**.\n\n` +
              `Guardian: ${guardian.emoji} **${guardian.name}**\n` +
              `Stage: **${getStageName(profile.stage)}**\n\n` +
              "Use `/status` to view your Citadel."
          ),
      ],
    });
  }

  const embed = new EmbedBuilder()
    .setColor(0x0a0f2c)
    .setTitle("🏛️  CITADEL NEXUS — NODE DETECTED")
    .setDescription(
      "```\nA dormant signal stirs in the Nexus.\nYour Node has been located — fractured, silent, waiting.\n```\n" +
        "You are now a **Node Operator**.\n" +
        "Your mission: rebuild what was lost.\n\n" +
        "**Choose your Guardian.** They will shape your Citadel — permanently.\n\n" +
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    )
    .addFields(
      {
        name: `${GUARDIANS.nova.emoji}  Nova — ${GUARDIANS.nova.focus}`,
        value: `*${GUARDIANS.nova.intro}*\n\`${GUARDIANS.nova.bonus_1}\`\n\`${GUARDIANS.nova.bonus_2}\``,
      },
      {
        name: `${GUARDIANS.tarin.emoji}  Tarin — ${GUARDIANS.tarin.focus}`,
        value: `*${GUARDIANS.tarin.intro}*\n\`${GUARDIANS.tarin.bonus_1}\`\n\`${GUARDIANS.tarin.bonus_2}\``,
      },
      {
        name: `${GUARDIANS.raxa.emoji}  Raxa — ${GUARDIANS.raxa.focus}`,
        value: `*${GUARDIANS.raxa.intro}*\n\`${GUARDIANS.raxa.bonus_1}\`\n\`${GUARDIANS.raxa.bonus_2}\``,
      }
    )
    .setFooter({
      text: "Your choice is permanent. Choose the Citadel you want to build.",
    });

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("guardian_nova")
      .setLabel("🦉 Choose Nova")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("guardian_tarin")
      .setLabel("🐘 Choose Tarin")
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId("guardian_raxa")
      .setLabel("🐅 Choose Raxa")
      .setStyle(ButtonStyle.Danger)
  );

  return interaction.editReply({
    embeds: [embed],
    components: [row],
  });
}

async function handleGuardianSelect(interaction) {
  await interaction.deferUpdate();

  const discordId = interaction.user.id;
  const username = interaction.user.username;
  const discordTag = interaction.user.tag ?? interaction.user.username;
  const guardianKey = interaction.customId.replace("guardian_", "");
  const guardian = GUARDIANS[guardianKey];

  if (!guardian) return;

  const { profile } = await getResolvedAscensionActor({
    discordId,
    username,
    discordTag,
  });

  if (profile) {
    return interaction.followUp({
      content: "Your Node is already initialized.",
      flags: 64 ,
    });
  }

  await createPlayerProfile({
    username,
    discordId,
    discordTag,
    guardian: guardianKey,
  });

  const embed = new EmbedBuilder()
    .setColor(guardian.color)
    .setTitle(`${guardian.emoji}  ${guardian.name.toUpperCase()} BONDED — NODE INITIALIZING`)
    .setDescription(
      `*${guardian.intro}*\n\n` +
        "```\nYour Node stirs. The Nexus takes notice.\nCitadel sequence initiated.\n```"
    )
    .addFields(
      {
        name: "GUARDIAN BONDED",
        value: `${guardian.emoji} **${guardian.name}**`,
        inline: true,
      },
      {
        name: "STAGE",
        value: "⬛ Dormant Node",
        inline: true,
      },
      {
        name: "STARTING POWER",
        value: "🔋 5 / 10",
        inline: true,
      },
      {
        name: "YOUR BONUSES",
        value: `\`${guardian.bonus_1}\`\n\`${guardian.bonus_2}\``,
      },
      {
        name: "━━━━━━━━━━━━━━━━",
        value:
          "> Your Citadel begins as a **Dormant Node**.\n" +
          "> Every action you take shapes what it becomes.\n\n" +
          "**Start here:**\n" +
          "> 1️⃣  `/claim` — restore Power and collect starting resources\n" +
          "> 2️⃣  `/mission recon` — run your first extraction\n" +
          "> 3️⃣  `/status` — view your Citadel at any time",
      }
    )
    .setFooter({
      text: "Citadel Ascension  |  Your Citadel awaits.",
    });

  return interaction.editReply({
    embeds: [embed],
    components: [],
  });
}

module.exports = {
  handleStart,
  handleGuardianSelect,
};