const { Sequelize } = require("sequelize");
module.exports = (sequelize) => {
    const logs = sequelize.define("logs",
        {
            discordId: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            log: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            command: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            channelId: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        },
        {
            tableName: "Logs",
            timestamps: true,
            createdAt: true,
            updatedAt: false,
            paranoid: true,
        });
    return logs;
};