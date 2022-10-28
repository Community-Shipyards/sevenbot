const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return secondary_characters.init(sequelize, DataTypes);
}
class secondary_characters extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return sequelize.define('secondary_characters', {
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
            }
        }, {
            tableName: 'Secondary Characters',
            timestamps: false
        });
    }
}