'use strict';

const models = require('models').sequelize.models;
const articleModel = models.article;
const publicStatus = 'public';

const getArticle = async (params) => {
  const {category, url} = params;
  const article = await articleModel.findOne({where: {url: encodeURI(url), category, status: publicStatus}});
  if (article) {
    article.increment('view_count');
  }
  return article;
};

const listArticle = async (params) => {
  const obj = {where: {status: publicStatus}};
  if (params.search) {
    obj.where.title = {$like: '%' + decodeURI(params.search) + '%'};
  }

  if (params.tag) {
    obj.include = [{model: models.article_tag, where: {tag: params.tag}}];
  }
  if (params.category) {
    obj.where.category = params.category;
  }

  params.limit = obj.limit = parseInt(params.limit) || 10;
  params.page = parseInt(params.page) > 0 ? parseInt(params.page) : 1;
  obj.offset = (params.page - 1) * params.limit;

  obj.order = [['top', 'DESC'], ['createdAt', 'DESC']];

  obj.attributes = {exclude: ['content']};

  const result = await articleModel.findAndCount(obj);
  return {
    articles: result.rows,
    count: result.count,
    page: params.page,
    limit: params.limit,
    prev: params.page > 1 ? params.page - 1 : null,
    next: result.count > params.page * params.limit ? params.page + 1 : null
  };
};

const getTags = (category = 'blog') => {
  return models.article_tag.count({
    where: {category},
    attributes: {exclude: ['id', 'articleId', 'createdAt', 'updatedAt']},
    group: ['tag']
  });
};

const getTops = async (category = 'blog') => {
  return await articleModel.findAll({
    where: {status: publicStatus, category},
    limit: 10,
    attributes: {exclude: ['content']},
    order: [['top', 'DESC'], ['view_count', 'DESC']]
  });

};
const getPrevNext = async (category = 'blog', articleId) => {
  return await Promise.all([
    articleModel.findOne({
      where: {status: publicStatus, category, id: {$lt: articleId}},
      limit: 1,
      attributes: ['url', 'title'],
      order: [['top', 'DESC'], ['createdAt', 'DESC']]
    }),
    articleModel.findOne({
      where: {status: publicStatus, category, id: {$gt: articleId}},
      limit: 1,
      attributes: ['url', 'title'],
      order: [['top', 'DESC'], ['createdAt', 'DESC']]
    })
  ]);
};


module.exports = {getArticle, listArticle, getTags, getTops, getPrevNext};