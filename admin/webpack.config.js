/**
 * @Author: PengJiyuan
 *
 * webpack config
 * development and production mode
 */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CompressionPlugin = require("compression-webpack-plugin");
const os = require('os');
const menifestConfig = require('./manifest.json');
const pkg = require('../package.json');

let entry = {};
fs.readdirSync('./applications')
  .filter(function(m) {
    return fs.statSync(path.join('./applications', m)).isDirectory();
  })
  .forEach(function(m) {
    entry[m] = ['babel-polyfill', './applications/' + m + '/index.jsx'];
  });

module.exports = (env) => {

  let webpackConfig = {

    context: __dirname,

    entry: entry,

    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[chunkhash:6].[name].min.js',
      publicPath: '/client/dist'
    },

    module: {
      rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: process.env.NODE_ENV !== 'production'
            }
          }
        ]
      }, {
        test: /\.less|css$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: env && env.production
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
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, 
        loader: 'url-loader?limit=50000&name=[path][name].[ext]'
      }]
    },

    plugins: [
      new ExtractTextPlugin({
        filename: '[chunkhash:6].[name].min.css',
        allChunks: true
      }),
      new webpack.optimize.UglifyJsPlugin({
        parallel: {
          cache: true,
          workers: os.cpus().length
        }
      }),
      new webpack.DllReferencePlugin({
        context: path.join(__dirname),
        manifest: menifestConfig
      }),
      new webpack.BannerPlugin({
        banner: `Ashe v${pkg.version}\nPowered by UNITEDSTACK Inc.`
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ],

    resolve: {
      extensions: ['.jsx', '.js', 'json'],
      modules: [
        path.resolve(__dirname, '../'),
        'node_modules'
      ],
      alias: {
        'react': 'node_modules/react',
        'react-dom': 'node_modules/react-dom'
      }
    }

  };

  if(env && !env.production) {
    webpackConfig.output.filename = '[name].min.js'
    webpackConfig.devtool = 'cheap-source-map';
    webpackConfig.plugins = [
      new ExtractTextPlugin('[name].min.css'),
      new webpack.LoaderOptionsPlugin({
       debug: true,
       keepAlive: true
     })
    ];
  }

  return webpackConfig;
};