var fetch = require('../../../../core/fetch');

module.exports = {

  getList: function(page, params) {
    return fetch.get({
      url: '/admin/api/job'
    });
  },

  createJob: function(data) {
    return fetch.post({
      url: '/admin/api/job',
      data: data
    });
  }

};
