'use strict';

module.exports = {
  config: {
    www: true
  },
  model: (mysql, DataTypes) => {
    return mysql.define('article', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '大类：blog,news,...'
      },
      term: {
        type: DataTypes.STRING,
        comment: 'blog的小类.'
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '标题'
      },
      introduction: {
        type: DataTypes.TEXT,
        comment: '导语'
      },
      content: {
        type: DataTypes.TEXT('long'),
        comment: '内容'
      },
      tags: {
        type: DataTypes.STRING,
        comment: '标签'
      },
      cover: {
        type: DataTypes.STRING,
        comment: '封面图片链接'
      },
      status: {
        type: DataTypes.ENUM('public', 'private', 'trash', 'draft'),
        allowNull: false,
        comment: '状态：草稿，已发布，私密，回收站'
      },
      url: {
        type: DataTypes.STRING,
        comment: '固定链接'
      },
      time: {
        type: DataTypes.STRING
      },
      authorId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      authorName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
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
      },
      comment_count: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
        comment: '评论量'
      },
      comment_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      }
    }, {
      paranoid: false,
      charset: 'utf8',
      freezeTableName: true,
      tableName: 'article',
      classMethods: {
        associate: function (models) {
          models.article.hasMany(models.article_tag);
        }
      },
      indexes: [
        {
          unique: true,
          fields: ['url', 'category']
        }
      ]
    });
  }
};
