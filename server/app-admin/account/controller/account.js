'use strict';

const models = require('server/models').sequelize.models;
const modelAccount = models.account;
const tools = require('tools');
const list = async () => {
  return modelAccount.findAll({
    attributes: {exclude: ['password']}
  });
};
const create = async (opt) => {
  opt.password = await tools.password.hash(opt.password);
  return modelAccount.create(opt);
};
const update = async (id, opt) => {
  let account = await modelAccount.findById(id);
  if (!account) {
    return Promise.reject({statusCode: 404, errors: [{message: '账户不存在'}]});
  }
  delete opt.enable;

  if (opt.password) {
    opt.password = await tools.password.hash(opt.password);
  }

  Object.assign(account, opt);
  return account.save();

};
const enable = async (id, flag) => {

  let account = await modelAccount.findById(id);
  if (!account) {
    return Promise.reject({statusCode: 404, errors: [{message: '账户不存在'}]});
  }
  return account.update({enable: flag});
};

module.exports = {list, update, create, enable};