'use strict';

module.exports = {
  config: {
    www: true
  },
  model: (mysql, DataTypes) => {
    return mysql.define('c_user', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING
      },
      nickname: {
        type: DataTypes.STRING
      },
      enable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      }
    }, {
      paranoid: false,
      charset: 'utf8',
      freezeTableName: true,
      tableName: 'c_user',
      classMethods: {
        associate: function (models) {
          models.c_user.belongsToMany(models.c_company, {
            through: {
              model: models.c_company_user
            }
          });
          models.c_user.hasMany(models.c_user_meta, {});
        }
      }
    });
  }
};
