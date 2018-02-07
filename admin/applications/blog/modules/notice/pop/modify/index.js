const commonModal = require('admin/components/modal_common/index');
const config = require('./config.json');
const request = require('../../request');

function pop(obj, parent, callback) {
  config.fields[0].value = obj.title;
  config.fields[1].value = obj.content;
  config.fields[2].checked = obj.top;

  let props = {
    parent: parent,
    config: config,
    maxHeight: 700,
    width: 800,
    onInitialize: function(refs) {},
    onConfirm: function(refs, cb) {
      let data = {
        title: refs.title.state.value,
        content: refs.content.state.value,
        top: !!refs.top.state.checked
      };

      request.updateNotice(obj.id, data).then((res) => {
        cb(true);
        callback  && callback(res);
      });
    },
    onAction: function(field, state, refs) {
      const isValid = refs.title.state.value && refs.content.state.value;
      switch (field) {
        case 'title':
        case 'content':
          refs.btn.setState({
            disabled: !isValid
          });
          break;
        default:
          break;
      }
    }
  };

  commonModal(props);
}

module.exports = pop;
