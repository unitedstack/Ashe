// 'use strict';

// const Controller = require('egg').Controller;
// const tools = require('tools');

// class CompanyController extends Controller {
//   async listCompany() {
//     const { ctx, service } = this;
//     const companies = await service.admin.company.listCompany();
//     ctx.body = {
//       statusCode: 200,
//       payload: {
//         companies
//       }
//     };
//   }

//   async createCompany() {
//     const { ctx, service } = this;
//         //name
//     //location
//     //phone
//     //admin:{nickname,email,phone}
//     let errors = [];
//     let {name, location, phone} = ctx.request.body;

//     if (!name || !name.trim()) {
//       ctx.status = 400;
//       ctx.body = {
//         errors: [{message: '公司名称不能为空'}]
//       };
//       return;
//     }
//     name = name.trim();
//     let admin = ctx.request.body.admin;
//     if (!admin) {
//       errors.push({message: '管理员不能为空'});
//     } else {
//       if (tools.RegExp.PHONE.test(admin.phone)) {
//         errors.push({message: '管理员手机号格式不正确'});
//       }
//       if (tools.RegExp.EMAIL.test(admin.email)) {
//         errors.push({message: '管理员邮箱格式不正确'});
//       }
//     }

//     if (errors.length) {
//       ctx.status = 400;
//       ctx.body = {
//         statusCode: 400,
//         errors
//       };
//       return;
//     }

//     try {
//       await service.admin.company.createCompany({
//         name, location, phone
//       }, admin);
//     } catch (e) {
//       ctx.status = 409;
//       ctx.body = {
//         statusCode: 409,
//         errors: e
//       };
//       return;
//     }

//     ctx.body = {
//       statusCode: 200,
//       message: '公司创建成功'
//     };
//   }

//   async updateCompany() {
//     const { ctx, service } = this;
//     let companyId = ctx.params.companyId;
//     let {name, location, phone, admin} = ctx.request.body;
//     try {
//       await service.admin.company.updateCompany(companyId, {
//         name, location, phone
//       }, admin);
//     } catch (e) {
//       ctx.status = 500;
//       ctx.body = {
//         statusCode: 500,
//         errors: [e]
//       };
//       return;
//     }

//     ctx.body = {
//       statusCode: 200,
//       message: '公司更新成功'
//     };
//   }

//   async enable() {
//     const { ctx, service } = this;
//     let enable = !!ctx.request.body.enable;
//     let companyId = ctx.params.id;
//     try {
//       await service.admin.company.enable(companyId, enable);
//     } catch (e) {
//       ctx.status = 500;
//       ctx.body = {
//         statusCode: 500,
//         errors: [e]
//       };
//       return;
//     }

//     ctx.body = {
//       statusCode: 200,
//       message: `公司${enable ? '启用' : '禁用'}成功`
//     };
//   }
// }
// module.exports = CompanyController;