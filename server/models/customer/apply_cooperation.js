'use strict';

module.exports = {
  config: {
    www: true
  },
  model: (mysql, DataTypes) => {
    return mysql.define('apply_cooperation', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      nickname: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      company: {
        type: DataTypes.STRING
      },
      location: {
        type: DataTypes.STRING
      },
    }, {
      paranoid: false,
      charset: 'utf8',
      freezeTableName: true,
      tableName: 'apply_cooperation'
    });
  }
};
