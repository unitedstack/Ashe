'use strict';
const memClient = require('server/drivers').memcached;
const sms = require('server/drivers').sms;

const expireCode = 10 * 60 * 1000;

const createCode = () => {
  return Math.random() * 900000 | 100000;
};

const savePhoneCode = async (purpose, phone, code) => {
  let value = JSON.stringify({
    code,
    createdAt: new Date().getTime()
  });
  await memClient.set(purpose + phone, value, expireCode);
};

const checkCodeFrequently = async (purpose, phone) => {
  let value = await memClient.get(purpose + phone);
  if (!value) {
    return false;
  }
  try {
    value = JSON.parse(value);
  } catch (e) {
    return false;
  }

  return (new Date().getTime() - value.createdAt) < 60000;
};

const verifyCodeCorrect = async (purpose, phone, code) => {
  let value = await memClient.get(purpose + phone);
  if (!value) {
    return false;
  }
  try {
    value = JSON.parse(value);
  } catch (e) {
    return false;
  }

  return code === value.code;
};

const sendCode = async (phone, message) => {
  return await sms(phone, message);
};

module.exports = {
  memClient,
  phoneCode: {
    send: sendCode,
    create: createCode,
    save: savePhoneCode,
    checkFrequently: checkCodeFrequently,
    verifyCorrect: verifyCodeCorrect
  }
};