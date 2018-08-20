const commonModal = require('admin/components/modal_common/index');
const config = require('./config.json');
const request = require('../../request');
const getErrorMessage = require('admin/utils/error_message');

function pop(obj, parent, callback) {
  let props = {
    parent: parent,
    config: config,
    onInitialize: function(refs) {},
    onConfirm: function(refs, cb) {
      let data = {
        nickname: refs.nickname.state.value,
        email: refs.email.state.value,
        phone: refs.phone.state.value,
        password: refs.password.state.value
      };

      request.addAccount(data).then((res) => {
        cb(true);
        callback  && callback(res);
      }).catch((error) => {
        cb(false, getErrorMessage(error));
      });
    },
    onAction: function(field, state, refs) {
      switch (field) {
        case 'nickname':
        case 'email':
        case 'password': {
          let isValid = refs.nickname.state.value && refs.email.state.value && refs.password.state.value;

          refs.btn.setState({
            disabled: !isValid
          });
          break;
        }
        default:
          break;
      }
    }
  };

  commonModal(props);
}

module.exports = pop;
