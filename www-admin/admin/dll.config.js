/**
 * @Author: PengJiyuan
 * 
 * Generate dll file
 * development and production mode
 */

const path = require("path");
const webpack = require("webpack");

module.exports = (env) => {

  let config = {

    resolve: {
      extensions: [".js", ".jsx"]
    },

    entry: {
      ustack: [
        'react',
        'react-dom'
      ]
    },

    output: {
      path: path.join(__dirname, 'dist/dll'),
      filename: "dll_[name]_[hash:8].js",
      library: "[name]_[hash]"
    },

    plugins: [
      new webpack.DllPlugin({
        path: path.join(__dirname, "manifest.json"),
        name: "[name]_[hash]"
      }),
      new webpack.optimize.UglifyJsPlugin({
        mangle: {
          except: ['[name]_[hash]', 'exports', 'require']
        },
        compress: {
          warnings: false
        }
      })
    ]

  };

  if(env && env.production) {
    config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }));
  }

  return config;
};
