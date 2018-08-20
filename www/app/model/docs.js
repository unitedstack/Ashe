'use strict';

module.exports = {
  config: {
    www: true
  },
  model: (mysql, DataTypes) => {
    return mysql.define('docs', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      repository: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      projectName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      introduction: {
        type: DataTypes.TEXT
      },
      branch: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'master'
      },
      name: {
        type: DataTypes.STRING
      },
      logo: {
        type: DataTypes.TEXT
      },
      pdf: {
        type: DataTypes.STRING
      },
      version: {
        type: DataTypes.STRING
      },
      authorization: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      status: {
        type: DataTypes.STRING
      },
      url: {
        type: DataTypes.STRING,
        unique: true
      },
      directory: {
        type: DataTypes.STRING
      }
    }, {
      paranoid: false,
      charset: 'utf8',
      freezeTableName: true,
      tableName: 'docs'
    });
  }
};
