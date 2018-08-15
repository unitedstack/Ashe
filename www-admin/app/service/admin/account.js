'use strict';
const Service = require('egg').Service;
const tools = require('../../tools');

class AccountService extends Service {
  async findAll() {
    return this.app.model.Account.findAll({
      attributes: {exclude: ['password']}
    });
  }

  async create(opt) {
    opt.password = await tools.password.hash(opt.password);
    return this.app.model.Account.create(opt);
  }

  async update(id, opt) {
    let account = await this.app.model.Account.findById(id);
    if (!account) {
      return Promise.reject({statusCode: 404, errors: [{message: '账户不存在'}]});
    }
    delete opt.enable;
  
    if (opt.password) {
      opt.password = await tools.password.hash(opt.password);
    }
  
    Object.assign(account, opt);
    return account.save();
  }

  async enable(id, flag) {
    let account = await this.app.model.Account.findById(id);
    if (!account) {
      return Promise.reject({statusCode: 404, errors: [{message: '账户不存在'}]});
    }
    return account.update({enable: flag});
  }
}

module.exports = AccountService;