const { join }= require('path');
module.exports = app=>({
  keys:'tmoe',
  static:{
    prefix: '/static/',
    dir:[join(app.baseDir, 'client/static'),join(app.baseDir, 'admin')],
    // support lazy load
    dynamic: true,
    preload: false,
    buffer: false,
    maxFiles: 1000,
  },
  cluster:{
    listen:{
      port:3000,
    }
  },
  view:{
    root: [
      join(app.baseDir, 'client/views'),
    ].join(','),
    defaultViewEngine: 'ejs',
    defaultExtension: '.ejs',
    mapping: { '.ejs': 'ejs' }
  },
  sequelize:{
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'ashe',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '1234',
  },
  security:{
    csrf:{
      enable:false
    }
  }
  // middleware: [ 'checkCaptcha' ],
  // checkCaptcha:{

  // }

});
