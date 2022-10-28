// Deletes global commands
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { CLIENT_ID, DEV_GUILD_ID, TOKEN } = require('../config/config.js');

async function deleteGlobal() {
    if (CLIENT_ID === '') {
        console.log('ERROR: Client ID unavailable. Please provide a valid client ID in ./config/config.js');
        process.exit();
    }

    const rest = new REST({ version: '10' }).setToken(TOKEN);

    rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
        .then(() => console.log('Successfully deleted global application commands.'))
        .catch(console.error);
}

deleteGlobal();
