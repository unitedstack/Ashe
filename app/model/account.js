'use strict';

module.exports = app => {
  const { STRING, BOOLEAN, UUID, UUIDV4} = app.Sequelize;
  const Account = app.model.define('account',{
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
      },
      username: {
        type: STRING,
        unique: true
      },
      phone: {
        type: STRING
      },
      email: {
        type: STRING,
        unique: true
      },
      password: {
        type: STRING,
        allowNull: false
      },
      nickname: {
        type: STRING
      },
      enable: {
        type: BOOLEAN,
        defaultValue: true,
        allowNull: false
      }
    }, {
      createdAt:'createdAt',
      updatedAt:'updatedAt',
      paranoid: false,
      charset: 'utf8',
      freezeTableName: true,
      tableName: 'account',
      // classMethods: {
      //   associate: function (models) {
      //     models.account.hasMany(models.account_service);
      //   }
      // }
    });
    Account.associate=function () {
      app.model.Account.hasMany(app.model.AccountService);
    }
    // Project.hasMany(User, {as: 'Workers'})
    return Account;
}
