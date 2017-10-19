'use strict';

const RegExp_USERNAME = /^[a-zA-Z]{1}([a-zA-Z0-9]){4,19}$/;
const RegExp_PHONE = /^1[34578][0-9]\d{8}$/;
const RegExp_EMAIL = /^[a-z0-9][a-z0-9_\-\.]+@([_a-z0-9]+\.)+[a-z]{2,7}$/i;
const RegExp_CODE = /^[0-9]\d{5}$/;
const RegExp_GITURL = /((git@[a-z0-9\-_.]+:)|((http|https)+:\/\/+[a-z0-9\-_.]+\/))+[a-z0-9\-_.]+\/+[a-z0-9\-_.]+\.git$/i;

const tool = {};
tool.RegExp = {
  USERNAME: RegExp_USERNAME,
  PHONE: RegExp_PHONE,
  EMAIL: RegExp_EMAIL,
  CODE: RegExp_CODE,
  GITURL: RegExp_GITURL
};
module.exports = tool;