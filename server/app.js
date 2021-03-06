'use strict';
const path = require('path');
const glob = require('glob');

const hashs = {};
const matchDist = glob.sync('*.min.js',{cwd: path.join(__dirname, '../client/static/dist/')});
matchDist.forEach(fileName => {
  let arr = fileName.split('.');
  if (arr.length === 4) {
    hashs[arr[1]] = arr[0];
  } else if (arr.length === 3) {
    hashs[arr[0]] = '';
  }
});
const matchCommonCss = glob.sync('*.index.css', {cwd: path.join(__dirname, '../client/static/common/style/')});
const matchCommonJs = glob.sync('*.g.js', {cwd: path.join(__dirname, '../client/static/common/js/')});
if (matchCommonCss[0]) {
  hashs.index = matchCommonCss[0].split('.')[0];
}
if (matchCommonJs[0]) {
  hashs.g = matchCommonJs[0].split('.')[0];
}

const Koa = require('koa');
const app = new Koa();
const koaOnError = require('koa-onerror');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const mount = require('koa-mount');
const env = process.env.NODE_ENV;
if (env !== 'development') {
  const etag = require('koa-etag');
  const conditional = require('koa-conditional-get');

  app.use(conditional());
  app.use(etag());
}
app.FileHash = hashs;
//static files
const maxAge = env === 'development' ? 1 : 365 * 24 * 60 * 60 * 1000;

app.use(mount('/static', koaStatic(path.resolve(__dirname, '../client/static'), {maxAge})));
app.use(mount('/admin-static/dist', koaStatic(path.resolve(__dirname, '../admin/dist'), {maxAge})));
app.use(mount('/admin-static/assets', koaStatic(path.resolve(__dirname, '../admin/assets'), {maxAge})));
app.use(mount('/wp-content', koaStatic(path.resolve(__dirname, '../static/wp-content'), {maxAge})));

// handle error
koaOnError(app);

app.use(async (ctx, next) => {
  await next();
  if (ctx.customError) {
    ctx.status = ctx.customError.statusCode;
    ctx.body = ctx.customError;
  }
});

//body parser
app.use(bodyParser());

//session
require('server/middlewares/sessionHandler')(app);

// routes definition
require('koa-validate')(app);
require('server/app-admin')(app);
require('server/app-www')(app);

module.exports = app;
