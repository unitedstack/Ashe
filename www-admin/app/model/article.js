'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN, BIGINT, TEXT, ENUM, UUID, UUIDV4 } = app.Sequelize;
  const Article = app.model.define('article', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    category: {
      type: STRING,
      allowNull: false,
      comment: '大类：blog,news,...'
    },
    term: {
      type: STRING,
      comment: 'blog的小类.'
    },
    title: {
      type: TEXT,
      allowNull: false,
      comment: '标题'
    },
    introduction: {
      type: TEXT,
      comment: '导语'
    },
    content: {
      type: TEXT('long'),
      comment: '内容'
    },
    tags: {
      type: STRING,
      comment: '标签'
    },
    cover: {
      type: STRING,
      comment: '封面图片链接'
    },
    status: {
      type: ENUM('public', 'private', 'trash', 'draft'),
      allowNull: false,
      comment: '状态：草稿，已发布，私密，回收站'
    },
    url: {
      type: STRING,
      comment: '固定链接'
    },
    time: {
      type: STRING
    },
    authorId: {
      type: UUID,
      allowNull: false,
    },
    authorName: {
      type: STRING,
      allowNull: false
    },
    level: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    top: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    view_count: {
      type: BIGINT,
      allowNull: false,
      defaultValue: 0,
      comment: '浏览量'
    },
    comment_count: {
      type: BIGINT,
      allowNull: false,
      defaultValue: 0,
      comment: '评论量'
    },
    comment_status: {
      type: BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    paranoid: false,
    charset: 'utf8',
    freezeTableName: true,
    tableName: 'article',
    // classMethods: {
    //   associate: function (models) {
    //     models.article.hasMany(models.article_tag);
    //   }
    // },
    indexes: [
      {
        unique: true,
        fields: ['url', 'category']
      }
    ]
  });
  Article.associate = () => {
    app.model.Article.hasMany(app.model.ArticleTag);
  };
  return Article;
};
