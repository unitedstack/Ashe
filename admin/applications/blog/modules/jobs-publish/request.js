const fetch = require('../../../../core/fetch');

module.exports = {

  createJob: function(data) {
    return fetch.post({
      url: '/admin/api/job',
      data: data
    });
  }

};
