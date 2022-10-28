// Deletes guild commands
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { CLIENT_ID, DEV_GUILD_ID, TOKEN } = require('../config/config.js');

async function deleteDev() {
    if (CLIENT_ID === '') {
        console.log('ERROR: Client ID unavailable. Please provide a valid client ID in ./config/config.js');
        process.exit();
    }

    if (DEV_GUILD_ID === '') {
        console.log('ERROR: No guild ID provided. Please provide a valid guild ID in ./config/config.js');
        process.exit();
    }

    const rest = await new REST({ version: '10' }).setToken(TOKEN);

    await rest
        .put(Routes.applicationGuildCommands(CLIENT_ID, DEV_GUILD_ID), { body: [] })
        .then(() => console.log('Successfully deleted dev application commands.'))
        .catch(console.error);
}

deleteDev();
