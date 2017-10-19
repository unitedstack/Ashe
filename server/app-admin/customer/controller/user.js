'use strict';

const models = require('server/models');

const userModel = models.c_user;


const enable = async (id, flag) => {

  let user = await userModel.findById(id);
  if (!user) {
    return Promise.reject({statusCode: 404, errors: [{message: '账户不存在'}]});
  }
  return user.update({enable: flag});
};

const list = async () => {
  return userModel.findAll({
    include: [{model: models.c_company}]
  });
};

module.exports = {enable, list};
