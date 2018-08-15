'use strict';
const checkLogin = (ctx, user = 'user') => {
  return ctx.session && ctx.session[user] && ctx.session[user].token;
};

const tool = {};
tool.auth = {
  checkLogin
};
module.exports = tool;