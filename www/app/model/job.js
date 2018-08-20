'use strict';

module.exports = app => {
  const { STRING, BOOLEAN, UUID, UUIDV4, TEXT } = app.Sequelize;
  const Job = app.model.define('job',{
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    title: {
      type: STRING,
      allowNull: false
    },
    description: {
      type: TEXT
    },
    requirement: {
      type: TEXT
    },
    preferred: {
      type: TEXT
    },
    location: {
      type: STRING,
    },
    role: {
      type: STRING,
      allowNull: false
    },
    type: {
      type: STRING,
      allowNull: false
    },
    status: {
      type: STRING,
      allowNull: false
    },
    top: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    createdAt:'createdAt',
    updatedAt:'updatedAt',
    paranoid: false,
    charset: 'utf8',
    freezeTableName: true,
    tableName: 'job',
  });
  return Job;
};

