var ajax = require('../../core/ajax');

module.exports = {

  login: function(data) {
    return ajax.post({
      url: '/admin/login',
      dataType: 'json',
      contentType: 'application/json',
      data: data
    });
  }

};
