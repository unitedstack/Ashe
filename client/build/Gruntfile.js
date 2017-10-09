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
const childProcess = require('child_process');
const devConfig = require('./dev.webpack.config.js');
require('colors');
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

    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      files: {
        src: ['client/static/dist/*']
      }
    },

    clean: {
      assets: [assetsFolder],
      dist: 'client/static/dist',
      fonts: 'client/static/iconfonts/fonts',
      html: 'client/static/html'
    },

    webpack: {
      build: require('./webpack.config.js'),
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

    watch: {
      dev: {
        files: [
          'client/views/**/*.@(js|ejs|less|json)',
          'client/components/*.@(ejs|less)',
          'client/static/common/*',
          'client/static/theme/**/*.less'
        ],
        tasks: ['dev', 'html'],
        options: {
          debounceDelay: 250,
          forever: false,
          spawn: false
        }
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

  grunt.registerTask('build', ['copy_assets', 'clean:dist', 'webpack:build', 'html', 'usebanner']);

  /**
   * npm run dev --pages=XXX,XXX
   * make build faster
   * eg. npm run dev --pages=home,page-views/about/compony
   *
   * do not use => arrow function
   * because () => {} will auto bind this.
   * equal to function() {}.bind(this)
   */
  grunt.registerTask('dev', 'for watch mode', function() {
    const pages = process.env.npm_config_pages && process.env.npm_config_pages.split(',');
    let entry = {};
    if(pages && pages.length > 0) {
      try {
        pages.forEach(function(p, i) {
          if(p === 'home') {
            entry['home'] = path.join(__dirname, '../views', 'home-views', 'index.js');
            childProcess.execSync(`rm client/static/dist/*home.min.*`);
          } else {
            var name = p.replace(/\//g, '_').replace('-views', '');
            entry[name] = path.join(__dirname, '../views', pages[i], 'index.js');
            childProcess.execSync(`rm client/static/dist/*${name}.min.*`);
          }
        });
        devConfig.entry = entry;
      } catch(e) {
        console.log(e);
        return;
      }
    } else {
      childProcess.execSync('rm -rf client/static/dist/*');
    }

    grunt.task.run(['webpack:dev']);
  });

};
