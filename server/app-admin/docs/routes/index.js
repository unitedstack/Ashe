'use strict';

const tools = require('tools');
const controller = require('../controller/docs');
module.exports = (router) => {

  router.get('/api/docs', async (ctx, next) => {
    ctx.body = {
      payload: {
        docs: await controller.listDoc()
      }
    };
  });
  //create
  router.post('/api/docs', async (ctx, next) => {
    let {repository, name, version, authorization, url, branch, introduction, logo} = ctx.request.body;
    let errors = [];
    if (!tools.RegExp.GITURL.test(repository)) {
      errors.push({
        message: '非法的仓库链接', location: 'repository'
      });
    }

    if (errors.length) {
      ctx.status = 400;
      ctx.body = {
        statusCode: 400,
        errors
      };
      return;
    }
    let projectName = repository.replace(/(.*\/)*(.+).git$/ig, '$2');
    if (!branch || !branch.trim()) {
      branch = 'master';
    }
    try {
      await controller.createDoc({
        repository,
        projectName,
        name,
        version,
        authorization,
        url,
        branch,
        introduction,
        logo
      });
    } catch (e) {
      ctx.status = 409;
      ctx.body = {
        statusCode: 409,
        errors: e.errors
      };
      return;
    }

    ctx.body = {
      statusCode: 200,
      message: '文档创建成功'
    };
  });

  //update
  router.put('/api/docs/:docsId', async (ctx, next) => {
    let {repository, name, version, authorization, url, branch, introduction, logo} = ctx.request.body;
    let errors = [];
    if (!tools.RegExp.GITURL.test(repository)) {
      errors.push({
        message: '非法的仓库链接', location: 'repository'
      });
    }

    if (errors.length) {
      ctx.status = 400;
      ctx.body = {
        statusCode: 400,
        errors
      };
      return;
    }
    let projectName = repository.replace(/(.*\/)*([^.]+).git$/ig, '$2');
    if (!branch || !branch.trim()) {
      branch = 'master';
    }
    try {
      await controller.updateDoc(
        ctx.params.docsId,
        {repository, projectName, name, version, authorization, url, branch, introduction, logo}
      );
    } catch (e) {
      ctx.status = e.statusCode || 400;
      ctx.body = {
        errors: e.errors
      };
      return;
    }
    ctx.body = {
      message: '文档修改成功'
    };

  });

  //upgrade
  router.put('/api/docs/:docsId/upgrade', async (ctx, next) => {
    try {
      await controller.upgradeDoc(ctx.params.docsId);
    } catch (e) {
      ctx.status = e.statusCode || 400;
      ctx.body = {
        errors: e.errors
      };
      return;
    }
    ctx.body = {
      message: '文档更新成功'
    };
  });

};
