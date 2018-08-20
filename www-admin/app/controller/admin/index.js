'use strict';

const Controller = require('egg').Controller;
// const fs = require('fs');
const glob = require('glob');

const template = (data) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="renderer" content="webkit">
  <link href="/static/dist/uskin/${data.uskinCssFile}" rel="stylesheet">
  <link href="/static/dist/${data.mainCssFile}" rel="stylesheet">
  <title>${data.title}</title>
</head>
<body nickname="${data.nickname}">
<div id="container"></div>
<script src="/static/dist/dll/${data.dllJsFile}"></script>
<script src="/static/dist/${data.mainJsFile}"></script>
</body>
</html>
`;
};

const getTemplateObj = (name) => {
  return {
    title: name,
    dllJsFile: glob.sync('dll_ustack_*.js', {
      cwd: 'admin/dist/dll'
    }),
    uskinCssFile: glob.sync('*uskin.min.css', {
      cwd: 'admin/dist/uskin'
    }),
    mainCssFile: glob.sync(`*${name}.min.css`, {
      cwd: 'admin/dist'
    }),
    mainJsFile: glob.sync(`*${name}.min.js`, {
      cwd: 'admin/dist'
    })
  };
};
// const frontendApps = fs.readdirSync('admin/applications').filter(file => file.indexOf('.') === -1);
let firstApp='/admin/blog';
// const routesRegExp = frontendApps.map(name => {
//   if (!firstApp && name !== 'login') {
//     firstApp = '/admin/'+name;
//   }
//   return new RegExp(`(^\/admin\/${name}$)|(^\/admin\/${name}\/(.*))`);
// });
class IndexController extends Controller {
  async render() {
    // console.log('render');
    const { ctx } = this;
    if (ctx.session && ctx.session.admin_user && ctx.session.admin_user.token) {
      ctx.redirect('/admin/blog');
    } else {
      ctx.redirect('/admin/login');
    }
  }

  async renderByRegExp() {
    const { ctx } = this;
    let name = ctx.path.split('/')[2];
    let hasLogin = ctx.session && ctx.session.admin_user && ctx.session.admin_user.token;
    if (hasLogin) {
      if (name !== 'login') {
        const obj = getTemplateObj(name);
        // console.log('----------template-------\n' + obj);
        obj.nickname = ctx.session.admin_user.nickname || ctx.session.admin_user.username || ctx.session.admin_user.email;
        ctx.body = template(obj);
      } else {
        if (ctx.query.callback) {
          // console.log('---------callback---------\n' + ctx.query.callback);
          ctx.redirect(encodeURI(ctx.query.callback));
        } else {
          // console.log('---------first--------\n' + firstApp);
          ctx.redirect(firstApp);
        }
      }

    } else {
      // console.log('----------name-----------\n' + name);
      if (name === 'login') {
        const obj = getTemplateObj(name);
        obj.nickname = '';
        ctx.body = template(obj);
      } else {
        // console.log('----------11-----------\n' + ctx.originalUrl);
        ctx.redirect(
          encodeURI(ctx.protocol + '://' + ctx.host + ctx.originalUrl));
      }
    }
  }
}

module.exports = IndexController;