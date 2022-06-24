const { SlashCommandBuilder } = require('@discordjs/builders');
const { db, primaries, sequelize } = require("../database.js");
const { Op } = require("sequelize");
const { table } = require('table');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('find')
		.setDescription('Returns info about the inputted data.')
        .setDefaultPermission(false)
        .addStringOption(option =>
            option.setName('column')
                .setDescription('The column to search in.')
                .setRequired(true)
                .addChoice('id', 'id')
                .addChoice('discordId', 'discordId')
                .addChoice('name', 'name')
                .addChoice('faction', 'faction')
                .addChoice('status', 'status')
                .addChoice('priority', 'priority')
                .addChoice('sheet', 'sheet')
                .addChoice('attendance', 'attendance'))
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
                .setRequired(true)),
	async execute(interaction) {
		const value = interaction.options.getString('value');
        const strict = interaction.options.getBoolean('strict');
        const include_deleted = interaction.options.getBoolean('include_deleted');
        const column = interaction.options.getString('column');
        const searchValue = strict ? {[Op.eq]: value} : {[Op.substring]: value};
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
                console.log(formatted)
                console.log(table(formatted));
                interaction.reply(`Found ${entry.length} entries.\`\`\`${table(formatted)}\`\`\``);
            });
        } catch (err) {
            console.log(err);
            await interaction.reply('Something went wrong. Any changes that would have been made have been rolled back.');
        }
	},
};