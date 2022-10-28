const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { db, primaries, sequelize } = require('../../../database/database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('user slash command')
        .setDMPermission(false),

    async execute(interaction) {
        interaction.reply({ content: "user works!", ephemeral: false });
    }
};