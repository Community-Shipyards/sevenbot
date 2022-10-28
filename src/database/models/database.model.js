const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return databases.init(sequelize, DataTypes);
}
class databases extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return sequelize.define('databases', {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: true,
                primaryKey: true
            }
        }, {
            tableName: 'databases',
            timestamps: true
        });
    }
}