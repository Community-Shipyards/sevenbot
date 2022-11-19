const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { database } = require('../config/config');

db = {};

const sequelize = new Sequelize("database", "user", "password", {
    host: database.host,
    dialect: database.dialect,
    logging: database.logging,
    storage: database.storage,
});

const primaries = require("./models/primaries.model.js")(sequelize);
const logs = require("./models/logs.model.js")(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

async function authenticate() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
authenticate();

// sync all models
async function sync() {
    try {
        await sequelize.sync();
        console.log("Database synced successfully.");
    } catch (error) {
        console.error("Unable to sync database:", error);
    }
}
sync();



sequelize.sync();

module.exports = { db, sequelize, primaries, logs };