'use strict';

module.exports = {
  config: {
    www: true
  },
  model: (mysql, DataTypes) => {
    return mysql.define('c_company', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      location: {
        type: DataTypes.TEXT
      },
      enable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      logo: {
        type: DataTypes.STRING
      }
    }, {
      paranoid: false,
      charset: 'utf8',
      freezeTableName: true,
      tableName: 'c_company',
      classMethods: {
        associate: function (models) {
          models.c_company.belongsToMany(models.c_user, {
            through: {
              model: models.c_company_user
            }
          });
        }
      }
    });
  }
};
