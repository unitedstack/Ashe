'use strict';

const Controller = require('egg').Controller;

class JobController extends Controller {
  async list() {
    const { ctx, service } = this;
    ctx.body = await service.admin.job.list(ctx.query);
  }

  async create() {
    const { ctx, service } = this;
    ctx.body = {job: await service.admin.job.create(ctx.request.body, ctx.session.admin_user)};

  }

  async update() {
    const { ctx, service } = this;
    ctx.body = {job: await service.admin.job.update(ctx.params.id, ctx.request.body)};

  }

  async updateField() {
    const { ctx, service } = this;
    let {id, field} = ctx.params, body = ctx.request.body;
    if (!body.hasOwnProperty(field)) {
      ctx.status = 400;
      ctx.body = {statusCode: 400, errors: [{message: '错误的请求参数'}]};
    } else {
      ctx.body = {job: await service.admin.job.updateField(id, field, body[field])};
    }
  }

  async delete() {
    const { ctx, service } = this;
    await service.admin.job.delete(ctx.params.id);
    ctx.status = 204;
  }
}
module.exports = JobController;