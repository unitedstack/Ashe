'use strict';

const fs = require('fs');
const path = require('path');

const mount = require('koa-mount');
const KoaRouter = require('koa-router');
const router = new KoaRouter();

module.exports = (app) => {
  router.use('/api', async (ctx, next) => {
    if (ctx.session.admin_user && ctx.session.admin_user.token) {
      await next();
    } else {
      ctx.status = 403;
      ctx.body = {statusCode: 403, errors: [{message: '授权失败，请登录'}]};
    }
  });

  fs.readdirSync(path.join(__dirname)).filter(application => application !== 'index.js').forEach(application => {
    let routes;
    try {
      routes = fs.statSync(path.join(__dirname, application, 'routes'));
    } catch (e) {
      return;
    }
    if (routes.isDirectory()) {
      fs.readdirSync(path.join(__dirname, application, 'routes')).filter(file => file.indexOf('.') !== 0).forEach(file => {
        require(path.join(__dirname, application, 'routes', file))(router);
      });
    }
  });

  app.use(mount('/admin', router.routes(), router.allowedMethods()));

};
