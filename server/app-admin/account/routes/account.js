'use strict';
const tools = require('tools');
const controller = require('../controller/account');
module.exports = (router) => {
  router.get('/api/account', async (ctx, next) => {
    let accounts = await controller.list();
    ctx.body = {
      statusCode: 200,
      payload: {
        accounts
      }
    };
  });

  router.post('/api/account', async (ctx, next) => {
    let {email, phone, nickname, password} = ctx.request.body;
    let errors = [];
    if (!tools.RegExp.PHONE.test(phone)) {
      errors.push({
        message: '手机号格式不正确', location: 'phone'
      });
    }
    if (!tools.RegExp.EMAIL.test(email)) {
      errors.push({
        message: 'Email格式不正确', location: 'email'
      });
    }
    if (!password) {
      errors.push({
        message: '密码不能为空', location: 'password'
      });
    }

    if (errors.length) {
      ctx.status = 400;
      ctx.body = {statusCode: 400, errors};
      return;
    }
    if (nickname) {
      nickname = nickname.trim();
    }
    try {
      await controller.create({
        password, nickname, email, phone
      });
    } catch (e) {
      ctx.status = 500;
      ctx.body = {
        statusCode: 500,
        errors: e.errors
      };
    }
    ctx.body = {
      statusCode: 200,
      message: '企业客户创建成功'
    };

  });

  router.put('/api/account/:id', async (ctx, next) => {
    await controller.update(ctx.params.id, ctx.request.body);
    ctx.body = {
      statusCode: 200,
      message: '账户更新成功'
    };
  });

  router.put('/api/account/:id/enable', async (ctx, next) => {
    let enable = !!ctx.request.body.enable;
    let accountId = ctx.params.id;
    await controller.enable(accountId, enable);
    if (ctx.session.admin_user.id === accountId) {
      delete ctx.session.admin_user;
    }
    ctx.body = {
      statusCode: 200,
      message: `账户${enable ? '启用' : '禁用'}成功`
    };

  });
};
