const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { db, primaries, sequelize } = require('../../../database/database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modify')
        .setDescription('modify slash command')
        .setDMPermission(false),

    async execute(interaction) {
        interaction.reply({ content: "modify works!", ephemeral: false });
    }
};