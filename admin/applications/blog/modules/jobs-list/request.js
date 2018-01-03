const fetch = require('../../../../core/fetch');
const RSVP = require('rsvp');

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
  },

  updateStatus: function(id, data) {
    return fetch.put({
      url: '/admin/api/job/' + id,
      data: data
    });
  },

  deleteJobs: function(rows) {
    let deleteItems = [];
    rows.forEach(item => {
      deleteItems.push(fetch.delete({
        url: '/admin/api/job/' + item.id
      }));
    });
    return RSVP.all(deleteItems);
  }

};
