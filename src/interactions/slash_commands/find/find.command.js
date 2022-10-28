const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { db, primaries, sequelize } = require('../../../database/database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('find')
        .setDescription('find slash command')
        .setDMPermission(false),

    async execute(interaction) {
        interaction.reply({ content: "find works!", ephemeral: false });
    }
};