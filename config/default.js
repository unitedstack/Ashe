module.exports = ({
  keys:'tmoe',
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
