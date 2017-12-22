'use strict';

const models = require('server/models').sequelize.models;
const jobModel = models.job;


const create = async function (body) {
  let job = JSON.parse(JSON.stringify(body));
  job.location = job.location.join(',');
  if (body.url) {
    body.url = encodeURI(body.url);
  }

  return await jobModel.create(job);
};

const get = async function (id) {
  let job = await jobModel.findById(id);
  job.location = job.location ? job.location.split(',') : [];
  return job;
};

const list = async function (query) {
  //query.status:
  //query.tags:"['hello']"
  //query.month:2017-02
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

  if (query.limit) {
    query.limit = obj.limit = parseInt(query.limit) || 10;
    query.page = parseInt(query.page) > 0 ? parseInt(query.page) : 1;
    obj.offset = (query.page - 1) * query.limit;
  }

  if (query.status) {
    obj.where.status = query.status;
  }

  obj.order = [
    ['createdAt', 'DESC']
  ];

  let result = await jobModel.findAndCount(obj);

  result.rows.forEach(job => {
    job.location = job.location ? job.location.split(',') : [];
  });
  return {
    jobs: result.rows,
    count: result.count,
    page: query.page,
    limit: query.limit,
    prev: query.page > 1 ? query.page - 1 : null,
    next: result.count > query.page * query.limit ? query.page + 1 : null
  };
};

const update = async function (jobId, body) {
  let job = await jobModel.find({where: {id: jobId}});

  if (!job) {
    return Promise.reject({statusCode: 404, errors: [{message: 'Not Found'}]});
  }
  if (body.location) {
    body.location = job.location.join(',');
  }

  Object.assign(job, body);
  job = await job.save();
  return job;
};

const updateField = async (jobId, field, value) => {
  const fields = ['title', 'description', 'requirement', 'preferred', 'status', 'role', 'type', 'location'];
  if (fields.indexOf(field) < 0) {
    return Promise.reject({statusCode: 400, errors: [{message: '错误的请求参数'}]});
  }

  let job = await jobModel.findOne({where: {id: jobId}});
  if (!job) {
    return Promise.reject({statusCode: 404, errors: [{message: 'Not Found'}]});
  }
  if ('location' === field) {
    let update = {};
    update[field] = location.join(',');
    job = await job.update(update);
  } else {
    let update = {};
    update[field] = value;
    job = await job.update(update);
  }
  return job;
};


const setTop = (jobId, top) => {
  return jobModel.update({top}, {where: {id: jobId}});
};

const setStatus = async (jobId, status) => {
  let statuses = ['public', 'private', 'trash', 'draft'];
  let job = await jobModel.findOne({where: {id: jobId}});
  if (!job) {
    return Promise.reject({status: 404, message: '文章不存在'});
  }
  if (statuses.indexOf(status) < 0) {
    return Promise.reject({status: 400, message: '参数错误'});
  }
  return await job.update({status});
};

const del = (jobId) => {
  return jobModel.destroy({
    where: {id: jobId}
  });
};

module.exports = {
  create, get, list, update, updateField,
  setTop, setStatus, del
};
