'use strict';

const fs = require('fs');
const path = require('path');

let driver = {};

fs.readdirSync(__dirname)
  .filter(c => {
    return fs.statSync(path.join(__dirname, c)).isDirectory();
  })
  .forEach(c => {
    let cloud;
    try {
      cloud = require(__dirname + '/' + c);
    } catch (e) {
      console.log(e.toString());
    }
    if (cloud) {
      Object.assign(driver, cloud);
    }
  });

module.exports = driver;
