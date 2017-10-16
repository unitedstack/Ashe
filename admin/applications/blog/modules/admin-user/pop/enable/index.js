const commonModal = require('admin/applications/blog/components/pop/index');
const config = require('./config.json');
const request = require('../../request');
const getErrorMessage = require('admin/applications/blog/cores/getErrorMessage');

function pop(accounts, isEnable, callback) {

  const ids = accounts.map((ele) => ele.id);
  const emails = accounts.map((ele) => ele.email).join(', ');

  const text = config.fields[0];
  config.title = isEnable ? '启用账户' : '禁用账户';
  text.info = '确认' + config.title + ' ' + emails + ' 账户吗？';

  var props = {
    __: {},
    config: config,
    onInitialize: function(refs) {},
    onConfirm: function(refs, cb) {

      request.enableAccount(ids, isEnable).then((res) => {
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
