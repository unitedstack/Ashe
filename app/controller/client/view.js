const Controller = require('egg').Controller;
const globalLang = require('../../../client/locale/lang.json');
const homeLang = require('../../../client/views/home-views/lang.json');
const themeConfig = require('../../../client/config.json');
const staticPage = require('../../../client/.routers.json');
const path = require('path');
const viewsPath = path.join(__dirname, '../../../client/views');
const pageLang = require(viewsPath + '/404-views/lang.json');
const send=require('koa-send');
class ViewController extends Controller {
  /**
   * 首页
   */
  async index() {
    const { ctx } = this;
    const defaultLang = themeConfig.defaultLang;
    if (ctx.request.query && ctx.request.query.lang && ctx.session.lang !== ctx.request.query.lang) {
      ctx.session.lang = ctx.request.query.lang;
    }
    if (!ctx.session.lang) {
      ctx.session.lang = defaultLang;
    }
    let articles = await Promise.all([
      ctx.service.client.article.listArticle({category: 'news', limit: 5}),
      ctx.service.client.article.listArticle({category: 'blog', limit: 5})
    ]);
    // console.log(`---------${JSON.stringify(homeLang['en'])}--------`);
    const data = Object.assign({
      commonCssFile: `/static/common/style/${ctx.app.FileHash.index}.index.css`,
      commonJsFile: `/static/common/js/${ctx.app.FileHash.g}.g.js`,
      home_news: articles[0].articles,
      home_blog: articles[1].articles
    }, globalLang[ctx.session.lang], homeLang[ctx.session.lang],{
      cssFile: `/static/dist/${ctx.app.FileHash.home ? ctx.app.FileHash.home + '.' : ''}home.min.css`,
      jsFile: `/static/dist/${ctx.app.FileHash.home ? ctx.app.FileHash.home + '.' : ''}home.min.js`,
    });
    await ctx.render('home-views/index',data);
  }


  /**
   * 出错页
   */
  async errorPage(){
    const { ctx }=this;
    const defaultLang = themeConfig.defaultLang;
    if (ctx.request.query && ctx.request.query.lang && ctx.session.lang !== ctx.request.query.lang) {
      ctx.session.lang = ctx.request.query.lang;
    }
    if (!ctx.session.lang) {
      ctx.session.lang = defaultLang;
    }
    let data = Object.assign({
      commonCssFile: `/static/common/style/${ctx.app.FileHash.index}.index.css`,
      commonJsFile: `/static/common/js/${ctx.app.FileHash.g}.g.js`,
    }, globalLang[ctx.session.lang], pageLang[ctx.session.lang],{
      cssFile: `/static/dist/${ctx.app.FileHash[404]? ctx.app.FileHash[404] + '.' : ''}404.min.css`,
      jsFile: `/static/dist/${ctx.app.FileHash[404] ? ctx.app.FileHash[404] + '.' : ''}404.min.js`,
    });
    ctx.status = 404;
    await ctx.render('404-views/index', data);
  }

  /**
   * 静态页
   */
  async staticPage(){
    const { ctx }=this;
    let filePath = staticPage[ctx.path][ctx.session.lang || 'zh'];
    // const staticPath=filePath.substring(filePath.indexOf('/static'));
    let themeDir = path.join(__dirname, '../../../client/');
    // console.log(themeDir);    
    let relativePath = path.relative(themeDir, filePath);
    // console.log(relativePath);
    await send(ctx, relativePath ,{root: themeDir})
    // await ctx.redirect(staticPath);
  }
}

module.exports = ViewController;