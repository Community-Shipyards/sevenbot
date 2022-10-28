const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { db, primaries, sequelize } = require('../../../database/database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Adds a user to the database.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('User to add to database.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The character\'s name.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('faction')
                .setDescription('The faction the character belongs to.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('sheet')
                .setDescription('The link of the character sheet of the user. ie: Google doc')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('priority')
                .setDescription('Whether to add the entry as a primary or secondary.')
                .addChoices(
                    { name: 'Primary', value: 'primary' },
                    { name: 'Secondary', value: 'secondary' }
                )
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('status')
                .setDescription('The status of the character. Default is alive.')
        ),
    async execute(interaction) {

        const target = interaction.options.getUser('target');
        const name = interaction.options.getString('name');
        const faction = interaction.options.getString('faction');
        const priority = interaction.options.getString('priority');
        const sheet = interaction.options.getString('sheet');
        const status = interaction.options.getString('status') || 'alive';

        // if (status == undefined) status = 'alive';

        console.log(status);

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

                const embed = new EmbedBuilder()
                    .setColor('#A3BE8C')
                    .setTitle('Entry Added')
                    .setDescription(name)
                    .setAuthor({ name: `Added by ${interaction.user.tag}`, url: interaction.user.displayAvatarURL({ dynamic: true, size: 512 }) })
                    .addFields(
                        { name: 'Faction', value: faction },
                        { name: 'Priority', value: priority },
                        { name: 'Status', value: status },
                    )
                    .setFooter({ text: 'Made by Jitter#0001', iconURL: 'https://i.imgur.com/r1xNOHD.jpg' });
                await interaction.reply({ embeds: [embed] });
            });
        } catch (err) {
            console.log(err);
            await interaction.reply('Something went wrong. Any changes that would have been made have been rolled back.');
        };
    }
};