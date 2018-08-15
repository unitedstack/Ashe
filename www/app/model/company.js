'use strict';

module.exports = app => {
  const { STRING, BOOLEAN, UUID, UUIDV4, TEXT } = app.Sequelize;
  const Company = app.model.define('c_company',{
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    name: {
      type: STRING
    },
    phone: {
      type: STRING
    },
    location: {
      type: TEXT
    },
    enable: {
      type: BOOLEAN,
      defaultValue: true
    },
    logo: {
      type: STRING
    }
  }, {
    createdAt:'createdAt',
    updatedAt:'updatedAt',
    paranoid: false,
    charset: 'utf8',
    freezeTableName: true,
    tableName: 'c_company',
    // classMethods: {
    //   associate: function (models) {
    //     models.c_company.belongsToMany(models.c_user, {
    //       through: {
    //         model: models.c_company_user
    //       }
    //     });
    //   }
    // }
  });
  Company.associate=()=> {
    app.model.Company.belongsToMany(app.model.User, {
      through: {
        model: app.model.CompanyUser
      }
    });
  };
  return Company;
};

