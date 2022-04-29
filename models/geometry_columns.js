const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return geometry_columns.init(sequelize, DataTypes);
}

class geometry_columns extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('geometry_columns', {
    f_table_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    f_geometry_column: {
      type: DataTypes.STRING,
      allowNull: true
    },
    geometry_type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    coord_dimension: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    srid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    geometry_format: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'geometry_columns',
    timestamps: false
  });
  }
}
