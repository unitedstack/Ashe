'use strict';
const path = require('path');
const controller = require('../controller/notice');

module.exports = (router, globalLang, viewsPath) => {
  const lang = {
    detail: require(path.join(viewsPath, 'notice-views/detail/lang.json')),
    list: require(path.join(viewsPath, 'notice-views/list/lang.json'))
  };
  
  router.get('/notice', async ctx => {
    const commonData = Object.assign(
      {},
      globalLang[ctx.session.lang],
      {
        commonCssFile: `/static/common/style/${ctx.app.FileHash.index}.index.css`,
        commonJsFile: `/static/common/js/${ctx.app.FileHash.g}.g.js`,
      },
      {
        cssFile: `/static/dist/${ctx.app.FileHash.notice_list ? ctx.app.FileHash.notice_list + '.' : ''}notice_list.min.css`,
        jsFile: `/static/dist/${ctx.app.FileHash.notice_list ? ctx.app.FileHash.notice_list + '.' : ''}notice_list.min.js`,
      }
    );
    let page = parseInt(ctx.query.page);
    const params = ctx.params;
    params.page = page > 1 ? page : 1;
    params.limit = 10;
    const articles = await controller.list(params);
    const data = Object.assign({}, articles, lang.list[ctx.session.lang], commonData);
    await ctx.render('notice-views/list/index', data);
  });

  router.get('/notice/:id', async ctx => {
    const commonData = Object.assign(
      {},
      globalLang[ctx.session.lang],
      {
        commonCssFile: `/static/common/style/${ctx.app.FileHash.index}.index.css`,
        commonJsFile: `/static/common/js/${ctx.app.FileHash.g}.g.js`,
      },
      {
        cssFile: `/static/dist/${ctx.app.FileHash.notice_detail? ctx.app.FileHash.notice_detail + '.' : ''}notice_detail.min.css`,
        jsFile: `/static/dist/${ctx.app.FileHash.notice_detail ? ctx.app.FileHash.notice_detail + '.' : ''}notice_detail.min.js`,
      }
    );
    let notice = await controller.get(ctx.params.id);
    if (!notice) {
      notice = {title: '[文章不存在]'};
      ctx.status = 404;
    }

    const data = Object.assign({}, { notice }, lang.detail[ctx.session.lang], commonData);
    await ctx.render('notice-views/detail/index', data);
  });
};
