'use strict';

module.exports = app => {
  const { STRING, BOOLEAN, UUID, UUIDV4 } = app.Sequelize;
  const User = app.model.define('c_user',{
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
        type: STRING,
        allowNull: false
      },
      email: {
        type: STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: STRING
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
      tableName: 'c_user',
      // classMethods: {
      //   associate: function (models) {
      //     models.c_user.belongsToMany(models.c_company, {
      //       through: {
      //         model: models.c_company_user
      //       }
      //     });
      //     models.c_user.hasMany(models.c_user_meta, {});
      //   }
      // }
    });
    User.associate=()=> {
      app.model.User.belongsToMany(app.model.Company, {
              through: {
                model: app.model.CompanyUser
              }
            });
            app.model.User.hasMany(app.model.UserMeta, {});
    }
    return User;
}

