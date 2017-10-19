'use strict';
const path = require('path');
const _ = require('lodash');

const controller = require('../controller/article');
const themeConfig = require('client/config.json');
const urls = themeConfig.articleUrl;
_.forEach(urls, (value, key) => {
  if (value && value.type === 'list') {
    urls[key].params = Object.assign({}, {page: 1}, urls[key].params);
  } else if (!value || value.type !== 'detail') {
    delete urls[key];
  }
});
module.exports = (router, globalLang, viewsPath) => {
  const lang = {
    blog: {detail: null, list: null},
    news: {detail: null, list: null}
  };
  lang.blog.detail = require(path.join(viewsPath, 'blog-views/detail/lang.json'));
  lang.blog.list = require(path.join(viewsPath, 'blog-views/list/lang.json'));
  lang.news.detail = require(path.join(viewsPath, 'news-views/detail/lang.json'));
  lang.news.list = require(path.join(viewsPath, 'news-views/list/lang.json'));

  router.get(Object.keys(urls), async (ctx, next) => {
    const matched = ctx.matched;
    let re;
    if (Array.isArray(matched)) {
      matched.some(m => m && m.opts && m.opts.end && ( re = m.path));
    }
    if (!re) {
      return next();
    }
    ctx.commonField.url = ctx.request.path;
    let config = urls[re];
    const params = Object.assign({}, config.params, ctx.params);

    let tt = {};
    tt[params.category + '_tags'] = await controller.getTags(params.category);
    tt[params.category + '_tops'] = await controller.getTops(params.category);
    if (config.type === 'list') {
      let page = parseInt(ctx.query.page);
      params.page = page > 1 ? page : 1;
      params.limit = 10;
      const articles = await controller.listArticle(params);
      const data = Object.assign({category: params.category}, tt, articles, globalLang[ctx.session.lang], lang[params.category].list[ctx.session.lang], {commonField: ctx.commonField});
      await ctx.render(params.category + '-views/list/index', data);

    } else if (config.type === 'detail') {
      let article = await controller.getArticle(params);
      let prevNext = {};
      if (!article) {
        article = {
          title: '[文章不存在]'
        };
        ctx.status = 404;
      } else {
        let pn = await controller.getPrevNext(params.category, article.id);
        prevNext.prev_article = pn[0] ? {url: pn[0].url, title: pn[0].title} : null;
        prevNext.next_article = pn[1] ? {url: pn[1].url, title: pn[1].title} : null;
      }

      const data = Object.assign({category: params.category}, prevNext, tt, {article}, globalLang[ctx.session.lang], lang[params.category].detail[ctx.session.lang], {commonField: ctx.commonField});
      await ctx.render(params.category + '-views/detail/index', data);
    }
  });
};
