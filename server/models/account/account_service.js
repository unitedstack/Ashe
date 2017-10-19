'use strict';

module.exports = {
  config: {
    www: false
  },
  model: (sequelize, DataTypes) => {
    return sequelize.define('account_service', {
      serviceName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      enable: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      paranoid: false,
      charset: 'utf8',
      freezeTableName: true,
      tableName: 'account_service'
    });
  }
};
