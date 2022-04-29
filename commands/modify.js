const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('modify')
		.setDescription('Modifies a data entry in the database.')
        .setDefaultPermission(false)
        .addStringOption(option =>
            option.setName('column')
                .setDescription('The column data to modify in the database.')
                .setRequired(true)
                .addChoice('Discord ID', 'discord_id')
                .addChoice('Character Name', 'character_name')
                .addChoice('Faction', 'faction')
                .addChoice('Status', 'status')
                .addChoice('Priority', 'priority')
                .addChoice('Character Sheet', 'character_sheet')
                .addChoice('Attendance', 'attendance'))
        .addStringOption(option => 
            option.setName('value')
                .setDescription('Data to write to table.')
                .setRequired(true))
        .addUserOption(option => 
            option.setName('target')
                .setDescription('User entry to modify in the database. If unknown, use id option instead.'))
        .addIntegerOption(option =>
            option.setName('id')
                .setDescription('Row number to modify. Leave blank unless target is not specified.')),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};