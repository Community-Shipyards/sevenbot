const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return spatial_ref_sys.init(sequelize, DataTypes);
}

class spatial_ref_sys extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return sequelize.define('spatial_ref_sys', {
    srid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true
    },
    auth_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    auth_srid: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    srtext: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'spatial_ref_sys',
    timestamps: false,
    indexes: [
      {
        name: "sqlite_autoindex_spatial_ref_sys_1",
        unique: true,
        fields: [
          { name: "srid" },
        ]
      },
    ]
  });
  }
}
