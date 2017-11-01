const readline = require('readline');
const mysql = require('mysql');
const uuid = require('uuid');
const hashPassword = require('../server/tools/password.js').password.hash;
const config = require('../config');
const mysqlConfig = config('mysql');

const mkAccount = async (username, password) => {
  let pass = await hashPassword(password);
  username = 'test_' + username;
  let connection = mysql.createConnection(mysqlConfig);
  connection.connect();
  connection.query(`select * from account where username = "${username}"`, (errQuery, reQuery) => {
    if (errQuery) {
      console.error(errQuery);
    }else {
      if(reQuery.length){
        console.log(`${username} 已存在，重置密码`);
        connection.query(`update account set password = "${pass}", enable = 1 where username = "${username}"`, (errReset, rsReset) => {
          if(!errReset){
            console.log(`${username} 密码重置成功`);
          }else{
            console.error(errReset);
          }
        });
      } else { 
        connection.query(`insert into account (id,username,phone,email,password,nickname,enable,createdAt,updatedAt) values ("${uuid.v4()}","${username}",13600001111,"test@ustack.com","${pass}","${username}",1,"2001-11-11","2011-11-11");`, function (errInsert, rsInsert ) {
          if(!errInsert){
            console.log(`${username} 创建成功`);
          }else{
            console.error(errInsert);
          }
        });
      }
    }
    connection.end();
  });
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let username = '';
let password = '';
console.log('We are creating an account for admin!\n');
rl.question('Your username?\n', (user) => {
  username = user;
  console.log(`username:${username}`);
  rl.question('Your password?\n', pass => {
    password = pass;
    rl.close();
  });
});

rl.on('close', ()=>{
  mkAccount(username, password);
});





