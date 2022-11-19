const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { db, primaries, sequelize } = require('../../../database/database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Displays information on user.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('User to check. Defaults to self if undefined.')
                .setRequired(false))
        .setDMPermission(false),

    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Character Name')
            .setURL('https://example.org/')
            .setDescription('Primary Character')
            .setAuthor({ name: 'Owned by user', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
            .addFields(
                { name: 'Faction', value: 'placeholder' },
                { name: 'Status', value: 'placeholder' },
                { name: 'Priority', value: 'placeholder' },
            )
            .setFooter({ text: 'Made by Jitter#0001', iconURL: 'https://i.imgur.com/r1xNOHD.jpg' });
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Nothing selected')
                    .addOptions([
                        {
                            label: 'Primary Character',
                            description: `Displays information on the user's primary character, if they have one.`,
                            value: 'first_option',
                        },
                        {
                            label: 'Other Info',
                            description: 'Displays other info on the user.',
                            value: 'second_option',
                        },
                    ]),
            );
        await interaction.reply({ embeds: [embed], content: 'placeholder', components: [row] });
    }
};