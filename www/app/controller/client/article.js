'use strict';
const path = require('path');
const globalLang = require('../../../../www/client/locale/lang.json');
const viewsPath = path.join(__dirname, '../../../../www/client/views');
const _ = require('lodash');
const themeConfig = require('../../../../www/client/config.json');
const urls = themeConfig.articleUrl;
const lang = {
  blog: { detail: null, list: null },
  news: { detail: null, list: null }
};
lang.blog.detail = require(path.join(viewsPath, 'blog-views/detail/lang.json'));
lang.blog.list = require(path.join(viewsPath, 'blog-views/list/lang.json'));
lang.news.detail = require(path.join(viewsPath, 'news-views/detail/lang.json'));
lang.news.list = require(path.join(viewsPath, 'news-views/list/lang.json'));

_.forEach(urls, (value, key) => {
  if (value && value.type === 'list') {
    urls[key].params = Object.assign({}, { page: 1 }, urls[key].params);
  } else if (!value || value.type !== 'detail') {
    delete urls[key];
  }
});
const Controller = require('egg').Controller;
class ArticleController extends Controller{
  async articlePage(){
    const { ctx }=this;
    const matched = ctx.matched;
    let re;
    if (Array.isArray(matched)) {
      matched.some(m => m && m.opts && m.opts.end && (re = m.path));
    }
    if (!re || !urls[re]) {
      // return next();
      return;
    }
    const pageConfig = urls[re];
    const params = Object.assign({}, pageConfig.params, ctx.params);

    const tt = {};
    tt[params.category + '_tags'] = await ctx.service.client.article.getTags(params.category);
    tt[params.category + '_tops'] = await ctx.service.client.article.getTops(params.category);
    const commonData = Object.assign(
      tt,
      { category: params.category },
      globalLang[ctx.session.lang],
      {
        commonCssFile: `/static/common/style/${ctx.app.FileHash.index}.index.css`,
        commonJsFile: `/static/common/js/${ctx.app.FileHash.g}.g.js`,
      },
      {
        cssFile: `/static/dist/${ctx.app.FileHash[pageConfig.pageHash]? ctx.app.FileHash[pageConfig.pageHash] + '.' : ''}${pageConfig.pageHash}.min.css`,
        jsFile: `/static/dist/${ctx.app.FileHash[pageConfig.pageHash] ? ctx.app.FileHash[pageConfig.pageHash] + '.' : ''}${pageConfig.pageHash}.min.js`,
      }
    );
    if (pageConfig.type === 'list') {
      let page = parseInt(ctx.query.page);
      params.page = page > 1 ? page : 1;
      params.limit = 10;
      const articles = await ctx.service.client.article.listArticle(params);
      const data = Object.assign(commonData, articles, lang[params.category].list[ctx.session.lang]);
      await ctx.render(params.category + '-views/list/index', data);

    } else if (pageConfig.type === 'detail') {
      let article = await ctx.service.client.article.getArticle(params);
      let prevNext = {};
      if (!article) {
        article = {
          title: '[文章不存在]'
        };
        ctx.status = 404;
      } else {
        let pn = await ctx.service.client.article.getPrevNext(params.category, article.id);
        prevNext.prev_article = pn[0] ? { url: pn[0].url, title: pn[0].title } : null;
        prevNext.next_article = pn[1] ? { url: pn[1].url, title: pn[1].title } : null;
      }

      const data = Object.assign(commonData, prevNext, { article }, lang[params.category].detail[ctx.session.lang]);
      await ctx.render(params.category + '-views/detail/index', data);
    }
  }
}
module.exports=ArticleController;