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
  },
  // middleware: [ 'checkCaptcha' ],
  // checkCaptcha:{

  // }
  env: process.env.NODE_ENV || 'development',
  log: {
    'accessLogPath': '/var/log/halo/access.log',
    'errorLogPath': '/var/log/halo/error.log',
    'debug': false,          // true | false
    'format': 'combined',    // 'combined' | 'common' | 'dev' | 'short' | 'tiny'
    'printAccessLog': true   // true | false
  },
  hl95: {
    host: 'http://q.hl95.com:8061/',
    username: '',
    password: '',
    epid: 0
  },
  image_upload: {
    local: {
      prefix: '/wp-content/upload/', // '/'或'/static/'或...
      upload_path: join(__dirname, '../static/wp-content/upload')
    }
  },
  docs: {
    repoPath: join(__dirname, '../static/repo'),
    buildPath: join(__dirname, '../static/book'),
    pdfPath: join(__dirname, '../static/pdf')
  },
  sessionEngine: {
    'type': 'Memcached',        // 'Redis' | 'Memcached' | 'Session' (do not use it in production)
    'remotes': ['10.0.217.111:11211'],
    'secret': 'uso_www',
    'cookie_name': 'ustack_www'
  },
  port: 5555,
  // mysql: {
  //   host: '127.0.0.1',
  //   port: 3306,
  //   user: 'root',
  //   password: '1234',
  //   database: 'ashe'
  // },
  smtp: {
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
      user: '',
      pass: ''
    }
  },
  emailTemplate: {
    logoUrl: 'https://www.tfcloud.com/static/assets/logo1.png',
    homeUrl: 'https://www.tfcloud.com',
    corporationName: 'TFCloud Inc. - www.tfcloud.com'
  },
  emailAddress: {
    contact: 'contact@unitedstack.com'
  }
});
