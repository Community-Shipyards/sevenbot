module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        async function guildLookup() {
            const guild = client.guilds.cache.get("961877383667925042");
            console.log(guild);
            const commands = guild.commands;
            if (!commands) return;
            await commands.fetch();

            const command = commands.cache.find((c) => c.name === "modify");
            const commandID = command?.id;
            console.log(commandID);
        }
        guildLookup();
    }
};
