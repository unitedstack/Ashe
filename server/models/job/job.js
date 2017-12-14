'use strict';

module.exports = {
  config: {
    www: true
  },
  model: (mysql, DataTypes) => {
    return mysql.define('job', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      requirement: {
        type: DataTypes.TEXT
      },
      preferred: {
        type: DataTypes.TEXT
      },
      location: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      top: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
      paranoid: false,
      charset: 'utf8',
      freezeTableName: true,
      tableName: 'job',
    });

  }
};
