'use strict';

module.exports = (mysql, DataTypes) => {
  return mysql.define('apply_cloud', {
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
    description: {
      type: DataTypes.TEXT
    },
    evaluation: {
      type: DataTypes.TEXT
    }
  }, {
    paranoid: false,
    charset: 'utf8',
    freezeTableName: true,
    tableName: 'apply_cloud'
  });

};
