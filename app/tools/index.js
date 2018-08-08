'use strict';

const fs = require('fs');
const path = require('path');
let tools = {};

fs.readdirSync(__dirname)
  .filter(c => c !== 'index.js')
  .forEach(c => {
    let cloud;
    try {
      cloud = require(path.join(__dirname, c));
    } catch (e) {
      console.log(e.toString());
    }
    if (cloud) {
      Object.assign(tools, cloud);
    }
  });

module.exports = tools;
