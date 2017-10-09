/*
 * @Author: PengJiyuan
 */
const config = require('./webpack.config.js');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');

config.devtool = 'cheap-source-map';
config.output.filename = '[name].min.js';

config.module.rules[0] = {
  test: /\.less$/,
  use: ExtractTextPlugin.extract({
    use: [{
      loader: 'css-loader'
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
};

config.plugins = [
  new ExtractTextPlugin({
    filename: '[name].min.css'
  }),
  new webpack.LoaderOptionsPlugin({
    debug: true
  })
];

module.exports = config;