'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async list() {
    const { ctx, service } = this;
    ctx.body = await this.service.admin.article.list(this.ctx.query);
  }

  async get() {
    const { ctx, service } = this;
    let article = await service.admin.article.get(ctx.params.id);
    ctx.body = {article};
  }

  async create() {
    const {ctx, service, app} = this;
    ctx.body = {article: await service.admin.article.create(ctx.request.body, ctx.session.admin_user)};
  }

  async update() {
    const { ctx, service } = this;
    ctx.body = {article: await service.admin.article.update(ctx.params.id, ctx.request.body)};
  }

  async set() {
    const { ctx, service } = this;
    let id = ctx.params.id;
    let field = ctx.params.field;
    let value = ctx.params.value;
    switch (field){
      case 'status':
        await service.admin.article.setStatus(id, value);
        break;
      case 'top':
        await service.admin.article.setTop(id, 'true' === value);
        break;
      case 'level':
        await service.admin.article.setLevel(id, value);
        break;
      default:
        break;
    }
    ctx.body = 'SUCCESS';
  }

  async updateField() {
    const { ctx, service } = this;
    let {id, field} = ctx.params, body = ctx.request.body;
    if (!body.hasOwnProperty(field)) {
      ctx.status = 400;
      ctx.body = {statusCode: 400, errors: [{message: '错误的请求参数'}]};
    } else {
      ctx.body = {article: await service.admin.article.updateField(id, field, body[field])};
    }
  }

  async listTag() {
    const { ctx, service } = this;
    ctx.body = await service.admin.article.listTag();
  }
}

module.exports = ArticleController;