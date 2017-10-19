'use strict';

module.exports = {
  config: {
    www: true
  },
  model: (mysql, DataTypes) =>{
    return mysql.define('article_tag', {
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tag: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      paranoid: false,
      charset: 'utf8',
      freezeTableName: true,
      tableName: 'article_tag',
    });
  }
};
