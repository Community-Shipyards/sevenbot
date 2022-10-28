const { EmbedBuilder } = require('discord.js');
const { BOT_NAME, PREFIX } = require('../../../config/config.js');

module.exports = {
    name: "help",
    description: "Help command",
    execute(message, args) {
        var legacyCommands = message.client.legacyCommands; // Fetches Legacy commands

        const helpEmbed = new EmbedBuilder()
            .setTitle(`${BOT_NAME}'s Legacy Commands`) // Bot name
            .setColor('#000') // Hex code [three characters can be used if sets of two exist; #bbaaee could be #bae]

        legacyCommands.forEach(cmd => {
            helpEmbed.addField(
                `**${PREFIX}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ''}**`,
                `${cmd.description}`
            )
        });
        message.channel.send({
            embeds: [helpEmbed]
        })

    }
};