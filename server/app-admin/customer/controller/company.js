'use strict';

const models = require('server/models').sequelize.models;
const modelCompany = models.c_company;
const modelUser = models.c_user;
const modelCompanyUser = models.c_company_user;
const createCompany = async (company, admin) => {

  let user;
  try {
    user = await modelUser.create(admin);
  } catch (e) {
    return Promise.reject(e.errors);
  }
  let cp = await modelCompany.create(company);

  await modelCompanyUser.create({
    role: 'admin',
    cUserId: user.id,
    cCompanyId: cp.id
  });
};

const updateCompany = async (companyId, company, admin) => {

  let cp = await modelCompany.findById(companyId, {
    include: modelUser, through: {
      model: modelCompanyUser, where: {
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
    let user = await modelUser.findById(cp.c_users[0].id);
    Object.assign(user, admin);
    await user.save();
  }
};

const listCompany = async () => {
  return modelCompany.findAll({
    include: [{
      model: modelUser,
      through: {
        model: models.c_company_user,
        where: {role: 'admin'}
      }
    }]
  });
};
const enable = async (companyId, flag) => {

  let company = await modelCompany.findById(companyId);
  if (!company) {
    return Promise.reject({message: '公司不存在'});
  }
  return company.update({enable: flag});
};

module.exports = {
  listCompany, createCompany, updateCompany, enable
};
