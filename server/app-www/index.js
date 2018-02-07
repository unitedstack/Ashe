'use strict';

const fs = require('fs');
const path = require('path');
const views = require('koa-views');
const KoaRouter = require('koa-router');
const send = require('koa-send');

const router = new KoaRouter();
const themeConfig = require('client/config.json');
const globalLang = require('client/locale/lang.json');
const viewsPath = path.join(__dirname, '../../client/views');
const homeLang = require('client/views/home-views/lang.json');

const staticPage = require('client/.routers.json');


module.exports = (app) => {
  //static page
  router.get(Object.keys(staticPage), async(ctx, next) => {
    let filePath = staticPage[ctx.path][ctx.session.lang || 'zh'];
    let themeDir = path.join(__dirname, '../../client');
    let relativePath = path.relative(themeDir, filePath);
    await send(ctx, relativePath ,{root: themeDir});
  });

  router.use(views(viewsPath, {
    extension: 'ejs'
  }));

  const defaultLang = themeConfig.defaultLang;

  //i18n & user info
  router.use(async (ctx, next) => {
    if (ctx.request.query && ctx.request.query.lang && ctx.session.lang !== ctx.request.query.lang) {
      ctx.session.lang = ctx.request.query.lang;
    }
    if (!ctx.session.lang) {
      ctx.session.lang = defaultLang;
    }
    await next();
  });

  //home page
  router.get('/', async (ctx, next) => {
    const data = Object.assign({
      commonCssFile: `/static/common/style/${ctx.app.FileHash.index}.index.css`,
      commonJsFile: `/static/common/js/${ctx.app.FileHash.g}.g.js`,
    }, globalLang[ctx.session.lang], homeLang[ctx.session.lang],{
      cssFile: `/static/dist/${ctx.app.FileHash.home ? ctx.app.FileHash.home + '.' : ''}home.min.css`,
      jsFile: `/static/dist/${ctx.app.FileHash.home ? ctx.app.FileHash.home + '.' : ''}home.min.js`,
    });
    await ctx.render('home-views/index', data);
  });

  //traversal
  fs.readdirSync(path.join(__dirname)).filter(application => application !== 'index.js').forEach(application => {
    let routes;
    try {
      routes = fs.statSync(path.join(__dirname, application, 'routes'));
    } catch (e) {
      return;
    }
    if (routes.isDirectory()) {
      fs.readdirSync(path.join(__dirname, application, 'routes')).filter(file => file.indexOf('.') !== 0).forEach(file => {
        require(path.join(__dirname, application, 'routes', file))(router, globalLang, viewsPath);
      });
    }
  });

  //404
  const pageLang = require(viewsPath + '/404-views/lang.json');
  router.get('*', async (ctx) => {
    let data = Object.assign({
      commonCssFile: `/static/common/style/${ctx.app.FileHash.index}.index.css`,
      commonJsFile: `/static/common/js/${ctx.app.FileHash.g}.g.js`,
    }, globalLang[ctx.session.lang], pageLang[ctx.session.lang],{
      cssFile: `/static/dist/${ctx.app.FileHash[404]? ctx.app.FileHash[404] + '.' : ''}404.min.css`,
      jsFile: `/static/dist/${ctx.app.FileHash[404] ? ctx.app.FileHash[404] + '.' : ''}404.min.js`,
    });
    ctx.status = 404;
    await ctx.render('404-views/index', data);
  });

  app.use(router.routes(), router.allowedMethods());

};
