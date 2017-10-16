var configs = require('../config.json');
var modules = {};

configs.modules.forEach((m) => {
  modules[m] = require('../modules/' + m + '/index');
});

module.exports = {
  configs: configs,
  modules: modules
};
