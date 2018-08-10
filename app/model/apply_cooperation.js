'use strict';

module.exports = app => {
  const { STRING, UUID, UUIDV4 } = app.Sequelize;
  const Apply_Cooperation = app.model.define('apply_coopreation',{
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
      paranoid: false,
      charset: 'utf8',
      freezeTableName: true,
      tableName: 'apply_cooperation'
    });
    return Apply_Cooperation;
}
