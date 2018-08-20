'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;
const hash = async (originalPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(originalPassword, saltRounds, (err, hash) => (err ? reject(err) : resolve(hash)));
  });

};

const compare = async (originalPassword, hashPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(originalPassword, hashPassword, (err, same) => (err ? reject(err) : resolve(same)));
  });
};

module.exports = {
  password: {
    hash, compare
  }
};