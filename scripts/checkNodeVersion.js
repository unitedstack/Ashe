/**
 * Author: Pengjiyuan
 *
 * npm engineStrict hook(because engineStrict was removed in npm 3.0.0)
 * check node version
 * by field engines from package.json
 *
 * support types:
 * node: '*'                      -- all node versions
 * node: '~x.x.x'                 -- A certain version
 * node: '>=number' or '<number'  -- range (nodeVersion [> or < or <= or >=] number)
 * node: '>=number <=number'      -- range (number <= nodeVersion <=number)
 */
const version = process.version;
const pkg = require('../package.json');
const requireNodeVersion = pkg.engines.node;

if(!pkg.engineStrict) {
  process.exit();
}

const errorOutput = function(requireVersion) {
  return '\n\
      \x1b[31mRequire Node Version ' + requireVersion + '!\n\
      but current node version is ' + version + '\n\
      You can:\n\
      `nvm install ' + requireVersion + '` or see https://nodejs.org/\x1b[0m\
      \n\
  ';
};

/**
 * node: '*'
 */
if(requireNodeVersion === '*') {
  console.log('\x1b[32m%s\x1b[0m', 'Support any node version\n\
    Current node version ' + version);
}
/**
 * node: '~x.x.x'
 * specify node version
 */
else if(requireNodeVersion[0] === '~') {
  if(requireNodeVersion.split('~')[1] != version.split('v')[1]) {
    throw new Error(errorOutput(requireNodeVersion));
  }
}
/**
 * node: '>=number'
 * range
 */
else if(/[><=]/.test(requireNodeVersion[0]) && requireNodeVersion.split(' ').length === 1) {
  if(!eval(version.split('.')[0][1] + requireNodeVersion)) {
    throw new Error(errorOutput(requireNodeVersion));
  }
}
/**
 * node: '>number <number'
 */
else if(/[><=]/.test(requireNodeVersion[0]) && requireNodeVersion.split(' ').length === 2) {
  const reg1 = requireNodeVersion.split(' ')[0];
  const reg2 = requireNodeVersion.split(' ')[1];
  if(!eval(version.split('.')[0][1] + reg1) || !eval(version.split('.')[0][1] + reg2)) {
    throw new Error(errorOutput(requireNodeVersion));
  }
}

console.log('\x1b[32m%s\x1b[0m', 'Current node version ' + version);
