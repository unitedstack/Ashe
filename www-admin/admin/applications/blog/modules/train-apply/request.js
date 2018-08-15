const fetch = require('../../../../core/fetch');

module.exports = {

  getList: function() {
    return fetch.get({
      url: '/admin/api/apply/train'
    });
  }

};
