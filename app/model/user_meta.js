'use strict';

module.exports = app => {
  const { STRING, UUID, UUIDV4 } = app.Sequelize;
  const User_Meta = app.model.define('c_user_meta',{
    user_id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    field: {
      type: STRING,
      allowNull: false
    },
    value: {
      type: STRING
    }
  }, {
    paranoid: false,
    charset: 'utf8',
    freezeTableName: true,
    tableName: 'c_user_meta'
  });
  return User_Meta;
};
