const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const driver = {};
// const config = require('../../../config');
// const ctx.app.config.smtp = config('smtp');
// const ctx.app.config.emailTemplate = config('emailTemplate');

const templates = {};
fs.readdirSync(path.join(__dirname, 'templates')).forEach(file => {
  templates[file.split('.')[0]] = fs.readFileSync(path.join(__dirname, 'templates', file), 'utf8');
});
// const transporter = nodemailer.createTransport(ctx.app.config.smtp);
// transporter.sendEmailAsync = (data) => {
//   return new Promise((resolve, reject) => {
//     transporter.sendMail(data, (err, info) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(info);
//       }
//     });
//   });
// };

const Service = require('egg').Service;

class EmailService extends Service{
  sendEmailAsync_1(data){
    const { ctx } = this;
    const transporter = nodemailer.createTransport(ctx.app.config.smtp);
    return new Promise((resolve, reject) => {
      transporter.sendMail(data, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    });
  }
   
    sendEmailAsync (to, subject, text) {
      
    const { ctx } = this;
    return this.sendEmailAsync_1({ to, subject, text, from: ctx.app.config.smtp.auth.user });
  }
  
   sendEmailByTemplateAsync(to, subject, data, templateName) {
    const { ctx } = this;
    if (templateName && templates[templateName] === undefined) {
      throw new Error('模板不存在');
    }
    let content = ejs.render(templates[templateName || 'default'], Object.assign({}, ctx.app.config.emailTemplate, data));
    return this.sendEmailAsync_1({ to, subject, html: content, from: ctx.app.config.smtp.auth.user });
  }
}
module.exports=EmailService;