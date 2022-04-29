const { Sequelize } = require("sequelize");
module.exports = (sequelize) => {
    const primaries = sequelize.define("Primaries",
    {
        discordId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        faction: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        priority: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        sheet: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        attendance: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },
    {
        tableName: "Primaries",
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        paranoid: true,
    });
    return primaries;
};
