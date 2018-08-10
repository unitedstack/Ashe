'use strict';

const Controller = require('egg').Controller;
const tools = require('../../tools');

class AccountController extends Controller {
  async showList() {
    const { ctx,service } = this;
    let accounts = await service.admin.account.findAll();
    ctx.body = {
      statusCode: 200,
      payload: {
        accounts
      }
    };
  }

  async create() {
    const { ctx,service } = this;
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
      await service.admin.account.create({
        password, nickname, email, phone
      });
    } catch (e) {
      console.log(e);
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
  }

  async update() {
    const { ctx, service } = this;
    await service.admin.account.update(ctx.params.id, ctx.request.body);
    try {
      
    } catch (error) {
      console.log('--------update---------' + error);
    }
    ctx.body = {
      statusCode: 200,
      message: '账户更新成功'
    };

  }

  async enable() {
    const { ctx, service } = this;
    let enable = !!ctx.request.body.enable;
    let accountId = ctx.params.id;
    await service.admin.account.enable(accountId, enable);
    if (ctx.session.admin_user.id === accountId) {
      delete ctx.session.admin_user;
    }
    try {
      
    } catch (error) {
      console.log('--------enable---------' + error);
    }
    ctx.body = {
      statusCode: 200,
      message: `账户${enable ? '启用' : '禁用'}成功`
    };
  }
}

module.exports = AccountController;