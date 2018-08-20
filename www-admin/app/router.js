const staticPage = require('../../www/client/.routers.json');
const path = require('path');
const themeConfig = require('../../www/client/config.json');
const urls = themeConfig.articleUrl;
const fs = require('fs');
// const path = require('path');
const frontendApps = fs.readdirSync('admin/applications').filter(file => file.indexOf('.') === -1);
let firstApp;
const routesRegExp = frontendApps.map(name => {
  if (!firstApp && name !== 'login') {
    firstApp = '/admin/'+name;
  }
  return new RegExp(`(^\/admin\/${name}$)|(^\/admin\/${name}\/(.*))`);
});

module.exports = app=>{
  const { router,controller }= app;

  /**
   * admin
   */
  // view 
  router.get('/admin',controller.admin.index.render);
  router.get(routesRegExp,controller.admin.index.renderByRegExp);

  // account
  router.get('/admin/api/account',controller.admin.account.showList);
  router.post('/admin/api/account',controller.admin.account.create);
  router.put('/admin/api/account/:id',controller.admin.account.update);
  router.put('/admin/api/account/:id/enable',controller.admin.account.enable);

  // auth
  router.post('/admin/login',controller.admin.auth.login);
  router.all('/admin/logout',controller.admin.auth.all);

  // apply
  router.get('/admin/api/apply/train',controller.admin.apply.listTrainApply);
  router.get('/admin/api/apply/private-cloud',controller.admin.apply.listCloudApply);

  //article
  router.get('/admin/api/article',controller.admin.article.list);
  router.get('/admin/api/article/:id',controller.admin.article.get);
  router.post('/admin/api/article',controller.admin.article.create);
  router.put('/admin/api/article/:id',controller.admin.article.update);
  router.put('/admin/api/article/:id/:field/:value',controller.admin.article.set);
  router.put('/admin/api/article/:id/:field',controller.admin.article.updateField);
  router.put('/api/article-tag',controller.admin.article.listTag);
  // job
  router.get('/admin/api/job',controller.admin.job.list);
  router.post('/admin/api/job',controller.admin.job.create);
  router.put('/admin/api/job/:id',controller.admin.job.update);
  router.put('/admin/api/job/:id/:field',controller.admin.job.updateField);
  router.delete('/admin/api/job/:id',controller.admin.job.delete);

  // tool
  router.get('/admin/tool/captcha',controller.admin.tool.tool);
}