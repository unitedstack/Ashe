'use strict';

const models = require('models').sequelize.models;
const noticeModel = models.notice;
const publicStatus = 'public';

const get = async (id) => {
  const notice = await noticeModel.findOne({where: {id, status: publicStatus}});
  if (notice) {
    notice.increment('view_count');
  }
  return notice;
};

const list = async (params) => {
  const obj = {where: {status: publicStatus}};
  if (params.search) {
    obj.where.title = {$like: '%' + decodeURI(params.search) + '%'};
  }

  params.limit = obj.limit = parseInt(params.limit) || 10;
  params.page = parseInt(params.page) > 0 ? parseInt(params.page) : 1;
  obj.offset = (params.page - 1) * params.limit;

  obj.order = [['top', 'DESC'], ['createdAt', 'DESC']];

  //obj.attributes = {exclude: ['content']};

  const result = await noticeModel.findAndCount(obj);
  return {
    notices: result.rows,
    count: result.count,
    page: params.page,
    limit: params.limit,
    prev: params.page > 1 ? params.page - 1 : null,
    next: result.count > params.page * params.limit ? params.page + 1 : null
  };
};


module.exports = {get, list};