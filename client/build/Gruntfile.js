/**
 * @Author: PengJiyuan
 * @Description: Grunt config
 */

const fs = require('fs');
const path = require('path');
const assetsFolder = 'client/static/assets';
const getPages = require('./getPages.js');
const ejs = require('ejs');
const mkdirp = require('mkdirp');
require('colors');
const buildConfig = require('./webpack.config.js');
const devConfig = require('./dev.webpack.config.js');
/**
 *
 * Generate static html (en / zh)
 *
 */
const renderEjs = function(lang, done) {
  const distDir = path.join(__dirname, `../static/html/${lang}`);
  getPages().then(pages => {
    const length = Object.keys(pages).length;
    let flag = 0;
    Object.keys(pages).forEach(function(key) {
      let page = pages[key];
      ejs.renderFile(page.file, page[`lang${lang}`], {}, function(err, html) {
        let distFileName = path.join(distDir, page.page) + '.html';
        mkdirp(distFileName.slice(0, -11), function(err) {
          if(err) {
            console.log(err);
          } else {
            fs.writeFile(distFileName, html, function(err) {
              console.log('SUCCESS'.green, lang, key);
              flag ++;
              if(flag === length) {
                done();
              }
            });         
          }
        });
      });
    });
  });
};

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('../../package.json'),

    banner: '/*!\n' +
      ' * Ashe v<%= pkg.version %>\n' +
      ' * Powered by UNITEDSTACK Inc.\n' +
      ' */\n',

    clean: {
      assets: [assetsFolder],
      fonts: 'client/static/iconfonts/fonts',
      html: 'client/static/html'
    },

    webpack: {
      build: buildConfig,
      dev: devConfig
    },

    // generate icon fonts
    webfont: {
      icons: {
        src: 'client/static/iconfonts/svgs/**/*.svg',
        dest: 'client/static/iconfonts/fonts',
        options: {
          stylesheet: 'less',
          relativeFontPath: '../fonts',
          destHtml: 'client/static/iconfonts/html'
        }
      }
    },

    copy: {
      assets: {
        // views/**/assets
        expand: true,
        cwd: 'client/views',
        src: '**/assets/**',
        dest: assetsFolder,
        filter: 'isFile',
        rename: function(dest, matchedSrcPath, options) {
          return path.join(dest, matchedSrcPath.replace('/assets', ''));
        }
      },
      common: {
        // common assets
        expand: true,
        cwd: 'client/static/common/assets',
        src: '*',
        dest: assetsFolder
      },
      fonts: {
        // icon fonts
        expand: true,
        cwd: 'client/static/iconfonts/fonts',
        src: '*',
        dest: 'client/static/common/style'
      }
    },

    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      files: {
        src: ['client/static/dist/*']
      }
    }

  });

  grunt.file.setBase('../../');
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies'
  });
  require('time-grunt')(grunt);

  // iconfonts
  grunt.registerTask('font', ['clean:fonts', 'webfont', 'copy:fonts']);

  // copy assets to static/assets
  grunt.registerTask('copy_assets', 'Copy assets to /static/assets', ['clean:assets', 'copy:assets', 'copy:common']);

  // render ejs file to html
  grunt.registerTask('ejs2html', 'Generate html by render ejs file', function(lang) {
    const done = this.async();
    renderEjs(lang, done);
  });

  // i18n html file
  grunt.registerTask('html', 'Generate i18n html', ['clean:html', 'ejs2html:zh', 'ejs2html:en']);

};
