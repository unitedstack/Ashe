const commonModal = require('admin/applications/blog/components/pop/index');
const config = require('./config.json');

function pop(details) {

  config.fields = details.map((detail) => ({
    type: 'icon_label',
    is_long_label: true,
    field: detail.title
  }));

  var props = {
    __: {},
    config: config,
    onInitialize: function(refs) {},
    onConfirm: function(refs, cb) {
      cb && cb(true);
    },
    onAction: function(filed, state, refs) {}
  };

  commonModal(props);
}

module.exports = pop;
