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
    ctx.commonField = {
      lang: ctx.session.lang,
      logined: !!(ctx.session && ctx.session.user && ctx.session.user.token)
    };
    if (ctx.commonField.logined) {
      ctx.commonField.nickname = ctx.session.user.nickname;
      ctx.commonField.email = ctx.session.user.email;
    } else {
      ctx.commonField.nickname = '';
      ctx.commonField.email = '';
    }
    await next();
  });

  //home page
  const articleCtrl = require('./article/controller/article');
  router.get('/', async (ctx, next) => {
    let articles = await Promise.all([
      articleCtrl.listArticle({category: 'news', limit: 5}),
      articleCtrl.listArticle({category: 'blog', limit: 5})
    ]);
    ctx.commonField.url = ctx.request.path;
    const data = Object.assign({
      commonCssFile: `/static/common/style/${ctx.app.FileHash.index}.index.css`,
      home_news: articles[0].articles,
      home_blog: articles[1].articles
    }, globalLang[ctx.session.lang], homeLang[ctx.session.lang],{
      cssFile: `/static/dist/${ctx.app.FileHash.home ? ctx.app.FileHash.home + '.' : ''}home.min.css`,
      jsFile: `/static/dist/${ctx.app.FileHash.home ? ctx.app.FileHash.home + '.' : ''}home.min.js`,
    }, {commonField: ctx.commonField});
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
    }, globalLang[ctx.session.lang], pageLang[ctx.session.lang],{
      cssFile: `/static/dist/${ctx.app.FileHash[404]? ctx.app.FileHash[404] + '.' : ''}404.min.css`,
      jsFile: `/static/dist/${ctx.app.FileHash[404] ? ctx.app.FileHash[404] + '.' : ''}404.min.js`,
    },{commonField: ctx.commonField});
    ctx.status = 404;
    await ctx.render('404-views/index', data);
  });

  app.use(router.routes(), router.allowedMethods());

};
