const commonModal = require('admin/applications/blog/components/pop/index');
const config = require('./config.json');
const request = require('../../request');
const getErrorMessage = require('admin/applications/blog/cores/getErrorMessage');

function pop(accounts, isEnable, callback) {

  const ids = accounts.map((ele) => ele.id);
  const names = accounts.map((ele) => ele.name).join(', ');

  const text = config.fields[0];
  config.title = isEnable ? '启用企业用户' : '禁用企业用户';
  text.info = '确认' + config.title + ' ' +  names + ' 企业用户吗';

  var props = {
    __: {},
    config: config,
    onInitialize: function(refs) {},
    onConfirm: function(refs, cb) {

      request.enableCompany(ids, isEnable).then((res) => {
        cb && cb(true);
        callback  && callback(res);
      }).catch((error) => {
        cb && cb(false, getErrorMessage(error));
      });
    },
    onAction: function(filed, state, refs) {}
  };

  commonModal(props);
}

module.exports = pop;
