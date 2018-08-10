'use strict';

const Service = require('egg').Service;

class CompanyService extends Service {
  async listCompany() {
    const { app } = this;
    return app.model.Company.findAll({
      include: [{
        model: app.model.User,
        through: {
          model: app.model.Company_User,
          where: {role: 'admin'}
        }
      }]
    });
  }

  async createCompany(company, admin) {
    const { app } = this;
    let user;
    try {
      user = await app.model.User.create(admin);
    } catch (e) {
      return Promise.reject(e.errors);
    }
    let cp = await app.model.Company.create(company);
  
    await app.model.Company_User.create({
      role: 'admin',
      cUserId: user.id,
      cCompanyId: cp.id
    });
  }

  async updateCompany(companyId, company, admin) {
    const {  app } = this;
    let cp = await app.model.Company.findById(companyId, {
      include: app.model.User, through: {
        model: app.model.Company_User, where: {
          role: 'admin'
        }
      }
    });
    if (!cp) {
      return Promise.reject({message: '公司不存在'});
    }
    Object.assign(cp, company);
    await cp.save();
  
    if (cp.c_users[0]) {
      let user = await app.model.User.findById(cp.c_users[0].id);
      Object.assign(user, admin);
      await user.save();
    }
  }

  async enable(companyId, flag) {
    const { app } = this;
    let company = await app.model.Company.findById(companyId);
    if (!company) {
      return Promise.reject({message: '公司不存在'});
    }
    return company.update({enable: flag});
  }
}

module.exports = CompanyService;