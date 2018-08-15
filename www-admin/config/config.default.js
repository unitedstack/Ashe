const { join } = require('path');
const defaultConfig = require('../../config/config.default');
module.exports = app=>{
  const config={};
  config.keys='tfcloud',
  config.static={
    prefix: '/static/',
    dir:join(app.baseDir, 'admin'),
    // support lazy load
    dynamic: true,
    preload: false,
    buffer: false,
    maxFiles: 1000,
  };
  config.cluster={
    listen:{
      port:3001,
    }
  };
  config.view={
    root: [
      join(app.baseDir, '../www/client/views'),
    ].join(','),
    defaultViewEngine: 'ejs',
    defaultExtension: '.ejs',
    mapping: { '.ejs': 'ejs' }
  };
  //middleware
  config.middleware=['errorHandler'];
  // only takes effect on URL prefix with '/api'
  config.errorHandler={
    match: /(^admin\/api\/.*)/,
  };
  // config.checkCaptcha={
  //   match:'/apply/api/*'
  // };
  Object.assign(config,defaultConfig);
  return config;
};
