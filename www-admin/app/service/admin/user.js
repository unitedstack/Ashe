'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async list() {
    const { app } = this;
    return app.model.User.findAll({
      include: [{model: app.model.User}]
    });
  }

  async enable(id, flag) {
    const { app } = this;
    let user = await app.model.User.findById(id);
    if (!user) {
      return Promise.reject({statusCode: 404, errors: [{message: '账户不存在'}]});
    }
    return user.update({enable: flag});
  }
}
module.exports = UserService;