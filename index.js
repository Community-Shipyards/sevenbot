const { Sequelize } = require("sequelize");
const fs = require("node:fs");
// Require the necessary discord.js classes
const { Client, Collection, Intents } = require("discord.js");
const { token } = require("./config.json");
const db = require("./database.js");


// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const eventFiles = fs
    .readdirSync("./events")
    .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.commands = new Collection();
const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;
    const roles = ['961884657606078504', '961883511797710848', '966820532270039072', '966824564485156924']
    const modCommands = ['966826608650489956', '966826608650489959', '966826608650489957']
    console.log(interaction.member.roles.cache);
    console.log(interaction.member.roles.cache.hasAny(roles))
    console.log([...interaction.member.roles.cache.keys()])
    try {
        if (modCommands.includes(interaction.commandId)) {
            if (interaction.member.roles.cache.hasAny(...roles)) {
                await command.execute(interaction);
            } else {
                await interaction.reply({ content: 'You do not have the required role to use this command.',  ephemeral: true });
            }
        } else {
            await command.execute(interaction);
        }
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
        });
    }
});

// Login to Discord with your client's token
client.login(token);
