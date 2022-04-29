const { SlashCommandBuilder } = require('@discordjs/builders');
const { db, primaries, sequelize } = require("../database.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('find')
		.setDescription('Returns info about the inputted data.')
        .setDefaultPermission(false)
        .addStringOption(option =>
            option.setName('value')
                .setDescription('The value to search for in the database.')
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
        const x = !include_deleted
        try {
            const result = await sequelize.transaction(async (t) => {
                const entry = await primaries.findAll({
                    attributes: [''],
                    paranoid: x,
                }, { transaction: t });
                console.log(entry)
                console.log(entry.filter(user => user == value))
                console.log(value)
            });
        } catch (err) {
            console.log(err);
            await interaction.reply('Something went wrong. Any changes that would have been made have been rolled back.');
        }
	},
};