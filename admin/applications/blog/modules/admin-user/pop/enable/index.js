const commonModal = require('admin/components/modal_common/index');
const config = require('./config.json');
const request = require('../../request');

function pop(obj, parent, callback) {
  if(obj.enable) {
    config.title = '启用';
    config.fields[0].info = `确认启用账户 ${obj.email} 吗？`;
  } else {
    config.title = '禁用';
    config.fields[0].info = `确认禁用账户 ${obj.email} 吗？`;
  }

  let props = {
    parent: parent,
    config: config,
    onInitialize: function(refs) {},
    onConfirm: function(refs, cb) {
      let ids = [obj.id];
      request.enableAccount(ids, obj.enable).then(res => {
        cb(true);
        callback && callback();
      }).catch(err => {
        cb(true);
      });
    },
    onAction: function(field, state, refs) {}
  };

  commonModal(props);
}

module.exports = pop;
