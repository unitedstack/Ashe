'use strict';

const Service = require('egg').Service;

class JobService extends Service {
  async list(query) {
    const { app } = this;
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

  let result = await app.model.Job.findAndCount(obj);

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
  }

  async create(body) {
    const { app } = this; 

    let job = JSON.parse(JSON.stringify(body));
    job.location = job.location.join(',');
    if (body.url) {
      body.url = encodeURI(body.url);
    }
  
    return await app.model.Job.create(job);
  }

  async update(jobId, body) {
    const { app } = this;
    let job = await app.model.Job.find({where: {id: jobId}});

    if (!job) {
      return Promise.reject({statusCode: 404, errors: [{message: 'Not Found'}]});
    }
    if (body.location) {
      body.location = job.location.join(',');
    }
  
    Object.assign(job, body);
    job = await job.save();
    return job;
  }

  async updateField(jobId, field, value) {
    const { app } = this;
    const fields = ['title', 'description', 'requirement', 'preferred', 'status', 'role', 'type', 'location'];
    if (fields.indexOf(field) < 0) {
      return Promise.reject({statusCode: 400, errors: [{message: '错误的请求参数'}]});
    }
  
    let job = await app.model.Job.findOne({where: {id: jobId}});
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
  }

  async delete(jobId) {
    const { app } = this;
    return app.model.Job.destroy({
      where: {id: jobId}
    });
  }
}

module.exports = JobService;