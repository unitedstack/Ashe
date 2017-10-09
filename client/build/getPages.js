'use strict';
const fs = require('fs-async-await');
const path = require('path');
const _ = require('lodash');
const themeConfig = require('../config.json');
const viewsPath = path.join(__dirname, '../views');
const globalLang = require('../locale/lang.json');
const glob = require('glob');

const ignoreFiles = _.map(themeConfig.file, value => value);

async function walkPages(p, rootUrl, indexFile, i18nFile) {
  let obj = {};
  let indexFileNoExtension = path.parse(indexFile).name;

  /**
   * @param ap 绝对路径 '/xxx/xx/themes/blog/page-views'
   * @param url 链接 eg. '/' '/hello' '/about' '/about/company'
   * @param rp 相对于page-views的路径 'index' 'hello/index'
   * @return {Promise.<void>}
   */
  async function walk(ap, url, rp) {
    let files = await fs.readdirAsync(ap);

    if (files.indexOf(indexFile) > -1) {
      obj[url.toLowerCase()] = {
        page: path.join(rp, indexFileNoExtension),
        file: path.join(ap, indexFile)
      };

      if (files.indexOf(i18nFile) > -1) {
        try {
          let pageLang = JSON.parse(await fs.readFileAsync(path.join(ap, i18nFile), 'utf8'));
          Object.keys(pageLang).forEach(key => {
            // css and jsFile
            let cssParse = path.parse(pageLang[key].cssFile);
            let jsParse = path.parse(pageLang[key].jsFile);
            pageLang[key].cssFile = `${cssParse.dir}/` + glob.sync(`*.${cssParse.base}`, {
              cwd: 'client/static/dist'
            });
            pageLang[key].jsFile = `${jsParse.dir}/` + glob.sync(`*.${jsParse.base}`, {
              cwd: 'client/static/dist'
            });
          });
          obj[url.toLowerCase()].langen = Object.assign({}, globalLang.en, pageLang.en);
          obj[url.toLowerCase()].langzh = Object.assign({}, globalLang.zh, pageLang.zh);
        } catch (e) {
          obj[url.toLowerCase()].lang = {};
        }
      } else {
        obj[url.toLowerCase()].lang = {};
      }
    }

    files = _.without.apply(this, [files].concat(ignoreFiles));

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let tmpPath = path.join(ap, file);
      let isDirectory = (await fs.statAsync(tmpPath)).isDirectory();

      if (isDirectory) {
        await walk(tmpPath, path.join(url, file), path.join(rp, file));
      }
    }

  }

  await walk(p, rootUrl, '');

  return obj;
}

module.exports = async (pages) => {
  return await walkPages(path.join(viewsPath, 'page-views'), '/', themeConfig.file.indexFile, themeConfig.file.i18nFile);
};
