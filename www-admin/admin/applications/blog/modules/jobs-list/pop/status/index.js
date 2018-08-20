const commonModal = require('admin/components/modal_common/index');
const config = require('./config.json');
const request = require('../../request');

function pop(obj, parent, callback) {
  if(obj.status === 'public') {
    config.fields[0].info = '确认把状态切换成 private 吗？';
  } else {
    config.fields[0].info = '确认把状态切换成 public 吗？';
  }

  let props = {
    parent: parent,
    config: config,
    onInitialize: function(refs) {},
    onConfirm: function(refs, cb) {
      let ids = [obj.id];
      let data = {
        status: obj.status === 'public' ? 'private' : 'public'
      };
      request.updateStatus(ids, data).then(res => {
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
