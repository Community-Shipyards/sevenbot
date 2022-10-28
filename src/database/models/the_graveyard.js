const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return the_graveyard.init(sequelize, DataTypes);
}
class the_graveyard extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return sequelize.define('the_graveyard', {
            OGC_FID: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: true,
                primaryKey: true
            },
            Field1: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field2: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field3: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field4: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field5: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field6: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field7: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field8: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field9: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field10: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field11: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field12: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field13: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field14: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field15: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field16: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field17: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field18: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field19: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field20: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field21: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field22: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field23: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field24: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field25: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field26: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field27: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Field28: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }, {
            tableName: 'The Graveyard',
            timestamps: false
        });
    }
}