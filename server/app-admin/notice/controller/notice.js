'use strict';

const models = require('server/models').sequelize.models;
const noticeModel = models.notice;

const create = async function (body, author) {
  body.authorName = author.nickname;
  body.authorId = author.id;
  let notice = await noticeModel.create(body);
  return notice;
};

const get = async function (id) {
  let notice = await noticeModel.findById(id);
  return notice;
};

const list = async function (query) {
  //query.status:
  //query.tags:"['hello']"
  //query.page
  //query.limit
  //query.category
  //query.search

  let obj = {where: {}};
  if (query.search) {
    obj.where.title = {
      $like: '%' + decodeURI(query.search) + '%'
    };
  }

  if (query.tags) {
    query.tags = JSON.parse(query.tags);
  }

  query.limit = obj.limit = parseInt(query.limit) || 10;
  query.page = parseInt(query.page) > 0 ? parseInt(query.page) : 1;
  obj.offset = (query.page - 1) * query.limit;

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

  let result = await noticeModel.findAndCount(obj);
  return {
    notice: result.rows,
    count: result.count,
    page: query.page,
    limit: query.limit,
    prev: query.page > 1 ? query.page - 1 : null,
    next: result.count > query.page * query.limit ? query.page + 1 : null
  };
};

const update = async function (noticeId, body) {
  let notice = await noticeModel.find({where: {id: noticeId}});
  if (!notice) {
    return Promise.reject({statusCode: 404, errors: [{message: 'Not Found'}]});
  }
  Object.assign(notice, body);
  await notice.save();
  return notice;
};
const del = (noticeId) => {
  return noticeModel.destroy({
    where: {id: noticeId}
  });
};

module.exports = {create, get, list, update, del};
