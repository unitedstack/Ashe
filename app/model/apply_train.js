'use strict';

module.exports = app => {
  const { STRING, UUID,UUIDV4 } = app.Sequelize;
  const Apply_Train = app.model.define('apply_train',{
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    nickname: {
      type: STRING
    },
    email: {
      type: STRING
    },
    phone: {
      type: STRING
    },
    company: {
      type: STRING
    },
    location: {
      type: STRING
    },
  }, {
    createdAt:'createdAt',
    updatedAt:'updatedAt',
    paranoid: false,
    charset: 'utf8',
    freezeTableName: true,
    tableName: 'apply_train'
  });
  return Apply_Train;
};
