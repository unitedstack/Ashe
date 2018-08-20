'use strict';

module.exports = app => {
  const { STRING, BOOLEAN } = app.Sequelize;
  const Account_Server = app.model.define('account_server',{
    serviceName: { 
      type: STRING,
      allowNull: false
    },
    enable: {
      type: BOOLEAN,
      allowNull: false
    },
    role: {
      type: STRING,
      allowNull: false
    }
  }, {
    createdAt:'createdAt',
    updatedAt:'updatedAt',
    paranoid: false,
    charset: 'utf8',
    freezeTableName: true,
    tableName: 'account_service'
  });

  return Account_Server;
};

