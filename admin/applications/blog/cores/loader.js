/**
 * @Author: PengJiyuan
 * @desc:   Load all modules
 */

let modules = {};

// Shit...
function importAll (r) {
  r.keys().forEach(key => modules[key.split('/')[1]] = r(key));
}

importAll(require.context('../modules', true, /\.jsx$/));

module.exports = {
  modules: modules
};
