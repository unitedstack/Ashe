const { join } = require('path');
const defaultConfig = require('../../config/config.default');
module.exports = app=>{
  const config={};
  config.keys='tfcloud',
  config.static={
    prefix: '/static/',
    dir:join(app.baseDir, 'client/static'),
    // support lazy load
    dynamic: true,
    preload: false,
    buffer: false,
    maxFiles: 1000,
  };
  config.cluster={
    listen:{
      port:3000,
    }
  };
  config.view={
    root: [
      join(app.baseDir, 'client/views'),
    ].join(','),
    defaultViewEngine: 'ejs',
    defaultExtension: '.ejs',
    mapping: { '.ejs': 'ejs' }
  };
  //middleware
  config.middleware=['errorHandler','checkCaptcha'];
  // only takes effect on URL prefix with '/api'
  config.errorHandler={
    match: /(.*\/api\/.*)/,
  };
  config.checkCaptcha={
    match:'/apply/api/*'
  };
  Object.assign(config,defaultConfig);
  return config;
};
