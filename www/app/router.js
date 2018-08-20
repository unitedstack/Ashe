const staticPage = require('../../www/client/.routers.json');
const path = require('path');
const themeConfig = require('../../www/client/config.json');
const urls = themeConfig.articleUrl;
const fs = require('fs');
// const path = require('path');

module.exports = app=>{
  const { router,controller }= app;
  //static pages
  router.get(Object.keys(staticPage),controller.client.view.staticPage);

  /**
   * 首页
   */
  router.get('/',controller.client.view.index); 

  /**
   * apply
   */
  router.post('/apply/api/train',controller.client.apply.applyTrain);
  router.post('/apply/api/cooperation',controller.client.apply.applyCooperation);
  router.post('/apply/api/private-cloud',controller.client.apply.applyPrivateCloud);

  /**
   * article
   */
  router.get(Object.keys(urls),controller.client.article.articlePage);

  /**
   * job
   */
  router.get('/api/job',controller.client.job.listJobs);

  /**
   * tool
   */
  router.get('/api/tool/captcha', controller.client.tool.chap);


  router.get('*',controller.client.view.errorPage);
}