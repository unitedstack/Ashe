'use strict';

module.exports = {
  config: {
    www: false
  },
  model: (mysql, DataTypes) => {
    return mysql.define('media_tag', {
      tag: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      paranoid: false,
      charset: 'utf8',
      freezeTableName: true,
      tableName: 'media_tag'
    });
  }
};
