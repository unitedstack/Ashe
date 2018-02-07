'use strict';

module.exports = (mysql, DataTypes) => {
  return mysql.define('notice', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '标题'
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
      comment: '内容'
    },
    tags: {
      type: DataTypes.STRING,
      comment: '标签'
    },
    status: {
      type: DataTypes.ENUM('public', 'private', 'trash', 'draft'),
      allowNull: false,
      comment: '状态：草稿，已发布，私密，回收站'
    },
    top: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    view_count: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      comment: '浏览量'
    }
  }, {
    paranoid: false,
    charset: 'utf8',
    freezeTableName: true,
    tableName: 'notice',
    indexes: [
      {
        unique: true,
        fields: ['url']
      }
    ]
  });
};
