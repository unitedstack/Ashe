'use strict';

const fs = require('fs');
const glob = require('glob');

const template = (data) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="renderer" content="webkit">
  <link href="/admin-static/dist/${data.mainCssFile}" rel="stylesheet">
  <title>${data.title}</title>
</head>
<body nickname="${data.nickname}">
<div id="container"></div>
<script src="/admin-static/dist/dll/${data.dllJsFile}"></script>
<script src="/admin-static/dist/${data.mainJsFile}"></script>
</body>
</html>
`;
};

const getTemplateObj = (name) => {
  return {
    title: name,
    dllJsFile: glob.sync('dll_ustack_*.js', {
      cwd: 'client/dist/dll'
    }),
    mainCssFile: glob.sync(`*${name}.min.css`, {
      cwd: 'client/dist'
    }),
    mainJsFile: glob.sync(`*${name}.min.js`, {
      cwd: 'client/dist'
    })
  };
};
const frontendApps = fs.readdirSync('client/applications').filter(file => file.indexOf('.') === -1);
let firstApp;
module.exports = (router) => {
  const routesRegExp = frontendApps.map(name => {
    if (!firstApp && name !== 'login') {
      firstApp = name;
    }
    return new RegExp(`(^\/${name}$)|(^\/${name}\/(.*))`);
  });

  router.get('/', function (ctx, next) {
    if (ctx.session && ctx.session.admin_user && ctx.session.admin_user.token) {
      ctx.redirect('/admin/login');
    } else {
      ctx.redirect('/admin/login');
    }
  });
  router.get(routesRegExp, (ctx, next) => {
    let name = ctx.path.split('/')[1];
    let hasLogin = ctx.session && ctx.session.admin_user && ctx.session.admin_user.token;
    if (hasLogin) {
      if (name !== 'login') {
        const obj = getTemplateObj(name);
        obj.nickname = ctx.session.admin_user.nickname || ctx.session.admin_user.username || ctx.session.admin_user.email;
        ctx.body = template(obj);
      } else {
        if (ctx.query.callback) {
          ctx.redirect(encodeURI(ctx.query.callback));
        } else {
          ctx.redirect('/admin/' + firstApp);
        }
      }

    } else {
      if (name === 'login') {
        const obj = getTemplateObj(name);
        obj.nickname = '';
        ctx.body = template(obj);
      } else {
        ctx.redirect('/admin/login?callback=' +
          encodeURI(ctx.protocol + '://' + ctx.host + ctx.originalUrl));
      }
    }
  });
};
