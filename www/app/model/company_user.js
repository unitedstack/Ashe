'use strict';

module.exports = app => {
  const { STRING, BOOLEAN } = app.Sequelize;
  const Company_User = app.model.define('c_company_user',{
    role: {
      type: STRING,
      allowNull: false
    },
    status: {
      type: BOOLEAN,
      defaultValue: true
    }
  }, {
    createdAt:'createdAt',
    updatedAt:'updatedAt',
    paranoid: false,
    charset: 'utf8',
    freezeTableName: true,
    tableName: 'c_company_user'
  });
  return Company_User;
};
