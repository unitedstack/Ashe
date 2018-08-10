'use strict';
const path = require('path');
const glob = require('glob');

const hashs = {};
const matchDist = glob.sync('*.min.js',{cwd: path.join(__dirname, '../../client/static/dist/')});
matchDist.forEach(fileName => {
  let arr = fileName.split('.');
  if (arr.length === 4) {
    hashs[arr[1]] = arr[0];
  } else if (arr.length === 3) {
    hashs[arr[0]] = '';
  }
});
const matchCommonCss = glob.sync('*.index.css', {cwd: path.join(__dirname, '../../client/static/common/style/')});
const matchCommonJs = glob.sync('*.g.js', {cwd: path.join(__dirname, '../../client/static/common/js/')});
if (matchCommonCss[0]) {
  hashs.index = matchCommonCss[0].split('.')[0];
}
if (matchCommonJs[0]) {
  hashs.g = matchCommonJs[0].split('.')[0];
}
module.exports={
  FileHash:hashs,
};