const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { host, dialect, logging, storage } = require("./config.json");


db = {};

const sequelize = new Sequelize("database", "user", "password", {
    host: host,
    dialect: dialect,
    logging: logging,
    storage: storage,
});

const primaries = require("./models/primaries.js")(sequelize);

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

module.exports = { db, sequelize, primaries };