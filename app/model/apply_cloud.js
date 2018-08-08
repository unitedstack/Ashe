'use strict';

module.exports = app => {
  const { STRING, UUID, TEXT, UUIDV4} = app.Sequelize;
  const Apply_Cloud = app.model.define('apply_cloud',{
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
      description: {
        type: TEXT
      },
      evaluation: {
        type: TEXT
      }
    }, {
      createdAt:'createdAt',
      updatedAt:'updatedAt',
      paranoid: false,
      charset: 'utf8',
      freezeTableName: true,
      tableName: 'apply_cloud'
    });

    return Apply_Cloud;
}
