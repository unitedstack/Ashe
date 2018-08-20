const Service = require('egg').Service;

class AuthService extends Service {
  async findOne(where) {
    return this.app.model.Account.findOne({
      where,
      attributes: { exclude: ['createdAt', 'updatedAt']},
      raw: true
    });
  }
}

module.exports = AuthService;