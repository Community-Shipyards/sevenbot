const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Op } = require('sequelize');
const { db, primaries, sequelize } = require('../../../database/database');
const { table } = require('table');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('find')
        .setDescription('Returns info about the inputted data.')
        .addStringOption(option =>
            option.setName('column')
                .setDescription('The column to search in.')
                .setRequired(true)
                .addChoices(
                    { name: 'id', value: 'id' },
                    { name: 'discordId', value: 'discordId' },
                    { name: 'name', value: 'name' },
                    { name: 'faction', value: 'faction' },
                    { name: 'status', value: 'status' },
                    { name: 'priority', value: 'priority' },
                    { name: 'sheet', value: 'sheet' },
                    { name: 'attendance', value: 'attendance' },
                )
        )
        .addStringOption(option =>
            option.setName('value')
                .setDescription('The value to search for in the selected column.')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('strict')
                .setDescription('Whether to search for exact matches or not.')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('include_deleted')
                .setDescription('Whether to include deleted entries or not.')
                .setRequired(true))
        .setDMPermission(false),

    async execute(interaction) {
        const value = interaction.options.getString('value');
        const strict = interaction.options.getBoolean('strict');
        const include_deleted = interaction.options.getBoolean('include_deleted');
        const column = interaction.options.getString('column');
        const searchValue = strict ? { [Op.eq]: value } : { [Op.substring]: value };
        const x = !include_deleted
        try {
            const result = await sequelize.transaction(async (t) => {
                const entry = await primaries.findAll({
                    where: {
                        [column]: searchValue
                    },
                    paranoid: x,
                }, { transaction: t });
                console.log(entry);
                // format entry as array of arrays
                const formatted = entry.map(e => [e.id, e.discordId, e.name, e.faction, e.status, e.priority, e.sheet, e.attendance]);

                // console.log(formatted)
                // console.table(formatted);
                if (!formatted.length) return interaction.reply('No results found');

                interaction.reply(`Found ${entry.length} entries.\`\`\`${table(formatted)}\`\`\``);
            });
        } catch (err) {
            console.log(err);
            await interaction.reply('Something went wrong. Any changes that would have been made have been rolled back.');
        }
    }
};