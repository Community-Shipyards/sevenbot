// Run this file to deploy commands in the development guild: '../config'
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { CLIENT_ID, DEV_GUILD_ID, TOKEN } = require('../config/config.js');

async function deployDev() {
    if (CLIENT_ID === '') {
        console.log('ERROR: Client ID unavailable. Please provide a valid client ID in ./config/config.js');
        process.exit();
    }

    if (DEV_GUILD_ID === '') {
        console.log('ERROR: No guild ID provided. Please provide a valid guild ID in ./config/config.js');
        process.exit();
    }

    const commands = [];

    var currentDir = __dirname.split('/');
    currentDir.pop();
    currentDir = currentDir.join('/');

    const slashCommandDir = fs.readdirSync(currentDir + '/interactions/slash_commands/');
    for (const slashCommandPath of slashCommandDir) {
        const commandFiles = fs.readdirSync(currentDir + '/interactions/slash_commands/' + slashCommandPath).filter((x) => x.endsWith('.command.js'));

        for (var commandFile of commandFiles) {
            const command = require(path.join(currentDir, '/interactions/slash_commands/' + slashCommandPath + '/' + `${commandFile}`));
            commands.push(command.data.toJSON());
        }
    }

    const rest = new REST({ version: '10' }).setToken(TOKEN);

    rest.put(Routes.applicationGuildCommands(CLIENT_ID, DEV_GUILD_ID), { body: commands })
        .then(() => console.log('Successfully registered dev application commands.'))
        .catch(console.error);
}

deployDev();
