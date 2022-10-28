# sevenbot

# notes:
- v13 v14 of Discord.js using the @discordjs-cli/discordjs-cli on NPM # djs g c command_name is a wee bit faster :idkfam: [basically like the angular CLI but for bots; everything's a command]
- config.json -> src/config/config.js # module.exports = faster coding. plus you can have comments :pray:
- Events are in src/index.js

### Example config.js file:

module.exports = {
    PREFIX: '!',
    BOT_NAME: 'SevenBot',
    TOKEN: '',
    CLIENT_ID: '',
    DEV_GUILD_ID: '961877383667925042',
    LOG_CHANNEL: '966831924331040848',
    STATUS: 'idle',
    ACTIVITY: 'discord.gg/perdere',
    TYPE: 'Watching',
    database: {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        storage: 'src/database/bobux.db'
    }
}