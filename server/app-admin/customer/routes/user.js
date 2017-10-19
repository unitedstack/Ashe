'use strict';
const controller = require('../controller/user');
module.exports = (router) => {
  //
  router.get('/api/user', async (ctx, next) => {
    const users = await controller.list();
    ctx.body = {
      statusCode: 200,
      payload: {
        users
      }
    };
  });
  //修改用户的状态
  router.put('/api/user/:id/enable', async (ctx, next) => {
    let enable = !!ctx.request.body.enable;
    let userId = ctx.params.id;
    await controller.enable(userId, enable);
    ctx.body = {
      statusCode: 200,
      message: `用户${enable ? '启用' : '禁用'}成功`
    };
  });

};