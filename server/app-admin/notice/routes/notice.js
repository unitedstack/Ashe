'use strict';

const controller = require('../controller/notice');
module.exports = (router) => {

  router.get('/api/notice', async (ctx, next) => {
    ctx.body = await controller.list(ctx.query);
  });

  router.get('/api/notice/:id', async (ctx, next) => {
    let notice = await controller.get(ctx.params.id);
    ctx.body = {notice};
  });

  router.post('/api/notice', async (ctx, next) => {
    ctx.body = {article: await controller.create(ctx.request.body, ctx.session.admin_user)};
  });

  router.put('/api/notice/:id', async (ctx, next) => {
    ctx.body = {article: await controller.update(ctx.params.id, ctx.request.body)};
  });

  router.delete('/api/notice/:id', async (ctx, next) => {
    await controller.del(ctx.params.id);
    ctx.status = 204;
  });

};
