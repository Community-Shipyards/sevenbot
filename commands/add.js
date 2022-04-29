const { SlashCommandBuilder } = require('@discordjs/builders');
const { db, primaries, sequelize } = require("../database.js");
const { MessageEmbed } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Adds a user to the database.')
        .setDefaultPermission(false)
        .addUserOption(option => 
            option.setName('target')
                .setDescription('User to add to database.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the character to add to the database.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('faction')
                .setDescription('The faction the character belongs to.')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('sheet')
                .setDescription('The link of the character sheet of the user.')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('priority')
                .setDescription('Whether to add the entry as a primary or secondary.')
                .setRequired(true)
                .addChoice('Primary', 'primary')
                .addChoice('Secondary', 'secondary'))
        .addStringOption(option =>
            option.setName('status')
            .setDescription('The status of the character. Defaults to alive if undefined.')),
	async execute(interaction) {
        
        const target = interaction.options.getUser('target');
        const name = interaction.options.getString('name');
        const faction = interaction.options.getString('faction');
        const priority = interaction.options.getString('priority');
        const sheet = interaction.options.getString('sheet');
        var status = interaction.options.getString('status');
        if (status == undefined) {
            status = 'alive';
        };
        try {
            const result = await sequelize.transaction(async (t) => {
                const entry = await primaries.create({
                    discordId: target.id,
                    name: name,
                    faction: faction,
                    status: status,
                    priority: priority,
                    sheet: sheet
                }, { transaction: t });
                const embed = new MessageEmbed()
                    .setColor('#A3BE8C')
                    .setTitle('Entry Added')
                    .setDescription(name)
                    .setAuthor({ name: `Added by ${interaction.user.tag}`, url: interaction.user.avatarURL() })
                    .addFields(
                        { name: 'Faction', value: faction },
                        { name: 'Priority', value: priority },
                        { name: 'Status', value: status },
                    )
                    .setFooter({ text: 'Made by Jitter#0001', iconURL: 'https://i.imgur.com/r1xNOHD.jpg'});
                await interaction.reply({ embeds: [embed] });
            });
        } catch (err) {
            console.log(err);
            await interaction.reply('Something went wrong. Any changes that would have been made have been rolled back.');
        };
	},
};