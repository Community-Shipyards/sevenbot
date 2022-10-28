const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { db, primaries, sequelize } = require('../../../database/database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),

    async execute(interaction) {
        const ping = `📈 Ping: ${Math.round(interaction.client.ws.ping)}ms`
        return interaction.reply(ping);
    },
};