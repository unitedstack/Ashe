'use strict';
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('article_tag', {
    category: {
      type: STRING,
      allowNull: false
    },
    tag: {
      type: STRING,
      allowNull: false
    }
  }, {
    paranoid: false,
    charset: 'utf8',
    freezeTableName: true,
    tableName: 'article_tag',
  });

  return User;
};

      

