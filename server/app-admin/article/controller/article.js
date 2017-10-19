'use strict';

const tools = require('tools');
const models = require('server/models').sequelize.models;
const articleModel = models.article;

const handleTagForArticle = function*(article, tagsString) {
  let tagsNew = JSON.parse(tagsString);
  let tagsOld = JSON.parse(article.tags);
  if (tools._.difference(tagsOld, tagsNew).length || tools._.difference(tagsNew, tagsOld).length) {
    yield models.article_tag.destroy({where: {articleId: article.id}, force: true});
    yield [
      models.article_tag.bulkCreate(tagsNew.map(tag => {
        return {
          articleId: article.id,
          tag: tag,
          category: article.category
        };
      })),
      article.update({'tags': tagsString})
    ];
  }
};


const create = async function (body, author) {
  body.authorName = author.nickname;
  body.authorId = author.id;
  if (body.url) {
    body.url = encodeURI(body.url);
  }

  let article = await articleModel.create(body);
  let tags = [];
  if (body.tags) {
    tags = JSON.parse(body.tags);
  } else {
    body.tags = JSON.stringify([]);
  }

  if (!body.url) {
    article.url = article.id;
    await article.save();
  }

  await models.article_tag.bulkCreate(tags.map(tag => {
    return {
      articleId: article.id,
      tag: tag,
      category: article.category
    };
  }));
  return article;
};

const get = async function (id) {
  let article = await articleModel.findById(id);
  article.url = decodeURI(article.url);
  return article;
};

const list = async function (query) {
  //query.status:
  //query.tags:"['hello']"
  //query.month:2017-02
  //query.page
  //query.limit
  //query.category
  //query.search

  let obj = {where: {}, attributes: {exclude: ['content']}};
  if (query.search) {
    obj.where.title = {
      $like: '%' + decodeURI(query.search) + '%'
    };
  }

  if (query.tags) {
    query.tags = JSON.parse(query.tags);
    obj.include = [
      {
        model: models.article_tag,
        where: {tag: {$in: query.tags}}
      }
    ];
  }

  query.limit = obj.limit = parseInt(query.limit) || 10;
  query.page = parseInt(query.page) > 0 ? parseInt(query.page) : 1;
  obj.offset = (query.page - 1) * query.limit;

  if (query.month) {
    obj.where.createdAt = {};
    obj.where.createdAt.$gt = new Date(query.month);
    let yearAndMonth = query.month.split('-');
    if ('12' === yearAndMonth[1]) {
      yearAndMonth[0]++;
      yearAndMonth[1] = ['01'];
    } else if ('09' === yearAndMonth[1] || '10' === yearAndMonth[1] || '11' === yearAndMonth[1]) {
      yearAndMonth[1]++;
    } else {
      yearAndMonth[1] = '0' + (++yearAndMonth[1]);
    }
    obj.where.createdAt.$lt = new Date(yearAndMonth.join('-'));
  }

  if (query.status) {
    if ('top' === query.status) {
      obj.where.top = true;
    } else {
      obj.where.status = query.status;
    }
  }

  if (query.category) {
    obj.where.category = query.category;
  }
  obj.order = [
    ['createdAt', 'DESC']
  ];

  let result = await articleModel.findAndCount(obj);
  return {
    articles: result.rows,
    count: result.count,
    page: query.page,
    limit: query.limit,
    prev: query.page > 1 ? query.page - 1 : null,
    next: result.count > query.page * query.limit ? query.page + 1 : null
  };
};

const update = async function (articleId, body) {
  let article = await articleModel.find({where: {id: articleId}});
  if (body.tags) {
    await handleTagForArticle(article, body.tags);
  }
  if (!article) {
    return Promise.reject({statusCode: 404, errors: [{message: '文章不存在'}]});
  }
  if (body.url) {
    body.url = encodeURI(body.url);
  }
  delete body.status;
  Object.assign(article, body);
  article = await article.save();
  return article;
};

const updateField = async (articleId, field, value) => {
  const fields = ['title', 'introduction', 'content', 'tags', 'url', 'cover', 'time'];
  if (fields.indexOf(field) < 0) {
    return Promise.reject({statusCode: 400, errors: [{message: '错误的请求参数'}]});
  }

  let article = await articleModel.findOne({where: {id: articleId}});
  if (!article) {
    return Promise.reject({statusCode: 404, errors: [{message: '文章不存在'}]});
  }
  if ('tags' === field) {
    await handleTagForArticle(article, value);
  } else if ('url' === field) {
    let update = {};
    update[field] = encodeURI(value);
    article = await article.update(update);
  } else {
    let update = {};
    update[field] = value;
    article = await article.update(update);
  }
  return article;
};


const listTag = () => {
  return models.article_tag.count({
    attributes: ['category', 'tag'],
    group: ['category', 'tag']
  });
};

const setLevel = (articleId, level) => {
  level = parseInt(level);
  if (articleId && level >= 0 && level <= 9) {
    return articleModel.update({level}, {where: {id: articleId}});
  }
};


const setTop = (articleId, top) => {
  return articleModel.update({top}, {where: {id: articleId}});
};

const setStatus = async (articleId, status) => {
  let statuses = ['public', 'private', 'trash', 'draft'];
  let article = await articleModel.findOne({where: {id: articleId}});
  if (!article) {
    return Promise.reject({status: 404, message: '文章不存在'});
  }
  if (statuses.indexOf(status) < 0) {
    return Promise.reject({status: 400, message: '参数错误'});
  }
  return await article.update({status});
};


module.exports = {
  create, get, list, update, updateField, listTag,
  setLevel, setTop, setStatus
};
