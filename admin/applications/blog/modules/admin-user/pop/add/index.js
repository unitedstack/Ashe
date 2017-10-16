const commonModal = require('admin/applications/blog/components/pop/index');
const config = require('./config.json');
const request = require('../../request');
const getErrorMessage = require('admin/applications/blog/cores/getErrorMessage');

function pop(parent, callback) {
  var props = {
    __: {},
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
        cb && cb(true);
        callback  && callback(res);
      }).catch((error) => {
        cb && cb(false, getErrorMessage(error));
      });
    },
    onAction: function(filed, state, refs) {
      switch (filed) {
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
