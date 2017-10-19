'use strict';
const ctrl = require('../controller/media');

module.exports = (router) => {
  router.get('/api/media', async (ctx, next) => {

    let query = ctx.query;
    query.limit = parseInt(query.limit) || 10;
    ctx.body = await ctrl.list(ctx.query);
  });

  ctrl.middlewareCreate(router, '/api/media');

  router.put('/api/media/tags', async (ctx, next) => {
    await ctrl.bulkAddTags(ctx);
    ctx.body = 'SUCCESS';
  });

  router.put('/api/media/:id', async (ctx, next) => {
    ctx.body = {media: await ctrl.update(ctx)};
  });

  router.delete('/api/media/:id', async (ctx, next) => {
    await ctrl.del(ctx);
    ctx.body = 'SUCCESS';
  });

  router.get('/api/media-tag', async (ctx, next) => {
    ctx.body = await ctrl.listTag(ctx);
  });
};
