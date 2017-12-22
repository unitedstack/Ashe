'use strict';

const controller = require('../controller/job');
module.exports = (router) => {

  router.get('/api/job', async (ctx, next) => {
    ctx.body = await controller.list(ctx.query);
  });

  router.post('/api/job', async (ctx, next) => {
    ctx.body = {job: await controller.create(ctx.request.body, ctx.session.admin_user)};
  });

  router.put('/api/job/:id', async (ctx, next) => {
    ctx.body = {job: await controller.update(ctx.params.id, ctx.request.body)};
  });

  router.put('/api/job/:id/:field', async (ctx, next) => {
    let {id, field} = ctx.params, body = ctx.request.body;
    if (!body.hasOwnProperty(field)) {
      ctx.status = 400;
      ctx.body = {statusCode: 400, errors: [{message: '错误的请求参数'}]};
    } else {
      ctx.body = {job: await controller.updateField(id, field, body[field])};
    }
  });

  router.delete('/api/job/:id', async (ctx, next) => {
    await controller.del(ctx.params.id);
    ctx.status = 204;
  });

};
