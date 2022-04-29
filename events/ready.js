module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        async function balls() {
            const guild = client.guilds.cache.get("961877383667925042");
            console.log(guild);
            const commands = guild.commands;
            if (!commands) return;
            await commands.fetch();

            const command = commands.cache.find((c) => c.name === "find");
            const commandID = command?.id;
            console.log(commandID);
        }
        balls();
        const guild = client.guilds.cache.get("961877383667925042");
        const commands = ['966826608650489956', '966826608650489959', '966826608650489957', '968619057303674980']
        for (const cId of commands) {
            guild.commands.permissions.set({ guild: '961877383667925042', command: cId,
            permissions: [
            {
                id: '966824564485156924',
                type: 'ROLE',
                permission: true 
            },
            {   

                id: '966820532270039072',
                type: 'ROLE',
                permission: true
            },
            {
                id: '961884657606078504',
                type: 'ROLE',
                permission: true
            },
            {
                id: '961883511797710848',
                type: 'ROLE',
                permission: true
            },
            {
                id: '297523991365812225',
                type: 'USER',
                permission: true
            }
            ]})
    .then(console.log)
    .catch(console.error);
    }
    },
};
