const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { db, primaries, sequelize } = require('../../../database/database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modify')
        .setDescription('Modifies a data entry in the database.')
        .addStringOption(option =>
            option.setName('column')
                .setDescription('The column data to modify in the database.')
                .setRequired(true)
                .setChoices(
                    { name: 'Discord ID', value: 'discord_id' },
                    { name: 'Character Name', value: 'character_name' },
                    { name: 'Faction', value: 'faction' },
                    { name: 'Status', value: 'status' },
                    { name: 'Priority', value: 'priority' },
                    { name: 'Character Sheet', value: 'character_sheet' },
                    { name: 'Attendance', value: 'attendance' },
                )
        )
        .addStringOption(option =>
            option.setName('value')
                .setDescription('Data to write to table.')
                .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('target')
                .setDescription('User entry to modify in the database. If unknown, use id option instead.')
        )
        .addIntegerOption(option =>
            option.setName('id')
                .setDescription('Row number to modify. Leave blank unless target is not specified.')
        )
        .setDMPermission(false),

    async execute(interaction) {
        interaction.reply({ content: "modify works!", ephemeral: false });
    }
};