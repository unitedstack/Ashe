'use strict';
const session = require('koa-session-minimal');

const memStore = require('server/drivers').memcached;
const config = require('config');
const sessionEngine = config('sessionEngine');

module.exports = (app) => {

  app.use(session({
    key: 'ustack.com',
    cookie: {
      httpOnly: true,
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000
    },
    secret: sessionEngine.secret,
    resave: false,
    saveUninitialized: true,
    store: memStore
  }));

  app.use(async (ctx, next) => {
    if (!ctx.session) {
      await next(new Error('Memcached 服务不可用'));
    } else {
      await next();
    }
  });
  return app;
};
