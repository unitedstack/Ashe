// 'use strict';

// const Controller = require('egg').Controller;

// class UserController extends Controller {
//   async list() {
//     const { ctx, service } = this;
//     const users = await service.admin.user.list();
//     ctx.body = {
//       statusCode: 200,
//       payload: {
//         users
//       }
//     };
//   }

//   async enable() {
//     const { ctx, service } = this;
//     let enable = !!ctx.request.body.enable;
//     let userId = ctx.params.id;
//     await service.admin.user.enable(userId, enable);
//     ctx.body = {
//       statusCode: 200,
//       message: `用户${enable ? '启用' : '禁用'}成功`
//     };
//   }
// }

// module.exports = UserController;