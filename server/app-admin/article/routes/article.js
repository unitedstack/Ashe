'use strict';

const controller = require('../controller/article');
module.exports = (router) => {

  router.get('/api/article', async (ctx, next) => {
    ctx.body = await controller.list(ctx.query);
  });

  router.get('/api/article/:id', async (ctx, next) => {
    let article = await controller.get(ctx.params.id);
    ctx.body = {article};
  });

  router.post('/api/article', async (ctx, next) => {
    ctx.body = {article: await controller.create(ctx.request.body, ctx.session.admin_user)};
  });

  router.put('/api/article/:id', async (ctx, next) => {
    ctx.body = {article: await controller.update(ctx.params.id, ctx.request.body)};
  });

  router.put('/api/article/:id/:field/:value', async (ctx, next) => {
    let id = ctx.params.id;
    let field = ctx.params.field;
    let value = ctx.params.value;
    switch (field){
      case 'status':
        await controller.setStatus(id, value);
        break;
      case 'top':
        await controller.setTop(id, 'true' === value);
        break;
      case 'level':
        await controller.setLevel(id, value);
        break;
      default:
        break;
    }
    ctx.body = 'SUCCESS';
  });

  router.put('/api/article/:id/:field', async (ctx, next) => {
    let {id, field} = ctx.params, body = ctx.request.body;
    if (!body.hasOwnProperty(field)) {
      ctx.status = 400;
      ctx.body = {statusCode: 400, errors: [{message: '错误的请求参数'}]};
    } else {
      ctx.body = {article: await controller.updateField(id, field, body[field])};
    }
  });

  router.get('/api/article-tag', async (ctx, next) => {
    ctx.body = await controller.listTag();
  });

};
