const { SlashCommandBuilder } = require('@discordjs/builders');
const { db, primaries, sequelize } = require("../database.js");
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('Removes a user from the database.')
        .setDefaultPermission(false)
        .addUserOption(option => 
            option.setName('target')
                .setDescription('User to remove to database.')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('priority')
                .setDescription('The priority of the character to remove.')
                .setRequired(true)
                .addChoice('Primary', 'primary')
                .addChoice('Secondary', 'secondary')),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
        const priority = interaction.options.getString('priority');
        const row = new MessageActionRow()
        const menu = new MessageSelectMenu()
                .setCustomId('character-select')
                .setPlaceholder('Nothing selected')
        row.addComponents([menu])
        try {
            const result = await sequelize.transaction(async (t) => {
                // find the id of the target's discordID in the database
                const entry = await primaries.findAll({
                    where: {
                        discordId: target.id
                    }
                }, { transaction: t });

            // if the target is in the database and the priority is primary more then twice
            if (entry.length > 1 && priority == priority) {
                for (const element of entry) {
                    menu.addOptions([
                        {
                            label: element.name,
                            description: element.id.toString(),
                            value: element.id.toString(),
                        },
                    ]);
                };
                await interaction.deferReply();
                const message = await interaction.editReply({ content: `The target has more than one ${priority}. Please specify which one you want to remove.`, components: [row], fetchReply: true });
                const collector = message.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 15000 });

                collector.on('collect', async i => {
                    if (i.user.id === interaction.user.id) {
                        const selected = i.values;
                        const res = await sequelize.transaction(async (t) => {
                            const ent = await primaries.destroy({
                                where: { id: selected, }
                            }, { transaction: t });

                            const element = entry.find(el => selected == el.id.toString());
                            if (element) {
                                await interaction.followUp({ content: `Removed ${element.name} from the database.` });
                                console.log(`User ${interaction.user.tag} removed character ${element.name} from the database.`);
                            };
                        });
                    } else {
                        i.reply({ content: 'This select menu is not for you!', ephemeral: true });
                    };
                });
                collector.on('end', async collected => {
                    menu.setDisabled(true);
                });
            } else if (entry.length == 0 && priority == priority) {
                await interaction.deferReply();
                await interaction.editReply({ content: `The target has no ${priority} characters in the database!` });
            } else if (entry.length < 2 && priority == priority) {
                const res = await sequelize.transaction(async (t) => {
                const ent = await primaries.destroy({
                    where: { id: entry[0].id, }
                }, { transaction: t });

                await interaction.editReply({ content: `Removed ` + entry[0].name + ` from the database.` });
                console.log(`User ${interaction.user.tag} removed character ${entry[0].name} from the database.`);
            });
        }
        });
        } catch (err) {
            console.log(err);
            if (interaction.replied || interaction.deferred) {
                await interaction.editReply('Something went wrong. Any changes that would have been made have been rolled back.');
            } else {
                await interaction.reply('Something went wrong. Any changes that would have been made have been rolled back.');
            }
            
        };
	},
};
