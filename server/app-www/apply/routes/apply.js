'use strict';

const controller = require('../controller/apply');
const tools = require('tools');

module.exports = async (router, globalLang, viewsPath) => {
  router.post('/apply/api/train', async (ctx, next) => {
    ctx.checkBody('nickname').notEmpty('用户名不能为空');
    ctx.checkBody('phone').notEmpty('电话不能为空');
    ctx.checkBody('email').notEmpty('邮箱不能为空');
    ctx.checkBody('company').notEmpty('公司不能为空');
    ctx.checkBody('location').notEmpty('上课地点不能为空');
    if (ctx.errors) {
      ctx.status = 400;
      ctx.body = {
        statusCode: 400,
        errors: ctx.errors.map(err => {
          let r = {};
          tools._.forEach(err, (value, key) => {
            r.message = value;
            r.location = key;
          });
          return r;
        })
      };
    } else {
      await controller.applyTrain(ctx.request.body);
      ctx.body = {
        statusCode: 200,
        message: '培训申请成功'
      };
      //todo 发送邮件
    }

  });
  router.post('/apply/api/private-cloud', async (ctx, next) => {
    ctx.checkBody('nickname').notEmpty('用户名不能为空');
    ctx.checkBody('phone').notEmpty('电话不能为空');
    ctx.checkBody('email').notEmpty('邮箱不能为空');
    ctx.checkBody('company').notEmpty('公司不能为空');
    if (ctx.errors) {
      ctx.status = 400;
      ctx.body = {
        statusCode: 400,
        errors: ctx.errors.map(err => {
          let r = {};
          tools._.forEach(err, (value, key) => {
            r.message = value;
            r.location = key;
          });
          return r;
        })
      };
    } else {
      let body = ctx.request.body;
      body.evaluation = JSON.stringify(body.evaluation);
      await controller.applyCloud(body);
      ctx.body = {
        statusCode: 200,
        message: '托管云申请成功'
      };
      //todo 发送邮件
    }
  });
};
