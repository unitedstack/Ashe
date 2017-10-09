/*
 * @Author: PengJiyuan
 */

var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var config = require('../config.json');
var entry = {};

function fsExistsSync(path) {
  try{
    fs.accessSync(path,fs.F_OK);
  } catch(e){
    return false;
  }
  return true;
}

!(function deep(dir) {
  fs.readdirSync(dir)
    .filter(function(m) {
      return fs.statSync(path.join(dir, m)).isDirectory() && m !== config.file.styleFolder && m !== config.file.assetsFolder;
    })
    .forEach(function(m) {
      var currentFile = path.join(dir, m, 'index.js');
      var splitHolder = path.join(dir, m).split('-views');
      var prefix = splitHolder[0].split('views/')[1];
      var name = splitHolder[1];
      if(fsExistsSync(currentFile)) {
        if(name) {
          entry[prefix + name.replace(/\//g, '_')] = currentFile;
        } else {
          entry[prefix] = currentFile;
        }
      }
      deep(path.join(dir, m));
    });
})(path.join(__dirname, '../views'));

var webpackConfig = {

  context: __dirname,

  entry: entry,

  output: {
    path: path.resolve(__dirname, '../static/dist'),
    filename: '[chunkhash:6].[name].min.js'
  },

  // only show valid/invalid and errors
  // deal with verbose output
  stats: {
    assets: true,
    colors: true,
    warnings: true,
    errors: true,
    errorDetails: true,
    entrypoints: true,
    version: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    children: false
  },

  module: {
    rules: [{
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function() {
              return [autoprefixer];
            }
          }
        }, {
          loader: 'less-loader'
        }]
      })
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function() {
              return [autoprefixer];
            }
          }
        }]
      })
    }, {
      test: /\.(woff|svg|eot|ttf)\??.*$/,
      loader: 'url-loader?limit=1000&name=./fonts/[chunkhash:8].icon.[ext]'
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: 'url-loader?limit=2000&name=./img/[chunkhash:8].[name].[ext]'
    }]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[chunkhash:6].[name].min.css',
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]

};

module.exports = webpackConfig;