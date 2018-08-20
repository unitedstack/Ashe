/**
 * @Author: PengJiyuan
 * 
 * build dll and app
 * development and production mode
 */
const webpack = require('webpack');
const dllConfig = require('./dll.config.js');
const statsConfig = {
  assets: true,
  colors: true,
  warnings: false,
  errors: true,
  errorDetails: true,
  entrypoints: true,
  version: true,
  hash: false,
  timings: true,
  chunks: false,
  chunkModules: false,
  children: false
};
const dev = ~process.argv.indexOf('--development');

require('colors');

let dllCompiler = webpack(dllConfig({production: !dev}));

console.log('\n-- Use webpack dll plugin, Aha~ --'.green);
console.log('\n[ Task dll ]'.grey, 'Building dll...\n');

dllCompiler.apply(new webpack.ProgressPlugin());

dllCompiler.run((err, stats) => {
  let buildCompiler = webpack(require('./webpack.config.js')({production: !dev}));
  buildCompiler.apply(new webpack.ProgressPlugin());
  if(err) throw new Error(err);
  console.log(stats.toString(statsConfig));
  console.log('\n>> Finish task dll, start build app files <<\n'.green);
  console.log('\n[Task app]'.grey, 'Building app...\n');
  if(dev) {
    console.log('\n[ Watching Files ... ]\n'.grey);
    buildCompiler.watch({}, (e, s) => {
      if(e) throw new Error(e);
      console.log(s.toString(statsConfig));
      console.log('\n[ Watching Files ... ]\n'.grey);
    });
  } else {
    buildCompiler.run((e, s) => {
      if(e || s.hasErrors()) {
        console.log(e || s.toJson().errors);
      } else {
        console.log(s.toString(statsConfig));
        console.log('\n✓ All done! Without error!\n☺ Awesome Ashe!\n'.green);
      }
    });
  }
});
