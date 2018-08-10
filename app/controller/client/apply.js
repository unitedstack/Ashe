const Controller = require('egg').Controller;
const tools=require('../../tools');
const config = require('../../../config');
const sendEmail = require('../../drivers').email.sendEmailByTemplateAsync;
const contactEmail = config('emailAddress').contact;
class ApplyController extends Controller{
  async applyTrain(){
    const { ctx }=this;
    console.log(ctx.checkBody);
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
      await ctx.service.client.apply.applyTrain(ctx.request.body);
      ctx.body = {
        statusCode: 200,
        message: '培训申请成功'
      };
      //todo 发送邮件
      const body = ctx.request.body;
      sendEmail(
        contactEmail,
        '【同方有云】有新的培训申请',
        {content: `
        <p>姓名：${body.nickname}</p>
        <p>邮箱：${body.email}</p>
        <p>电话：${body.phone}</p>
        <p>公司：${body.company}</p>
        <p>上课地点：${body.location}</p>
        `}
      );
    }
  }

  async applyCooperation(){
    const { ctx }=this;
    ctx.checkBody('nickname').notEmpty('用户名不能为空');
    ctx.checkBody('phone').notEmpty('电话不能为空');
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
      await ctx.service.applyCooperation(body);
      ctx.body = {
        statusCode: 200,
        message: '合作申请成功'
      };
      //todo 发送邮件
      sendEmail(
        contactEmail,
        '【同方有云】有新的合作申请',
        {content: `
        <p>姓名：${body.nickname}</p>
        <p>电话：${body.phone}</p>
        <p>邮箱：${body.email || ''}</p>
        <p>公司：${body.company || ''}</p>
        <p>公司地点：${body.location || ''}</p>
        `}
      );
    }
  }

  async applyPrivateCloud(){
    const { ctx }=this;
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
    }
  }
}
module.exports=ApplyController;