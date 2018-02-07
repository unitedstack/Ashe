const fetch = require('../../../../core/fetch');
const RSVP = require('rsvp');

module.exports = {

  getList: function(page, params) {
    return fetch.get({
      url: '/admin/api/notice'
    });
  },

  createNotice: function(data) {
    return fetch.post({
      url: '/admin/api/notice',
      data: data
    });
  },

  updateNotice: function(id, data) {
    return fetch.put({
      url: '/admin/api/notice/' + id,
      data: data
    });
  },

  deleteNotices: function(rows) {
    let deleteItems = [];
    rows.forEach(item => {
      deleteItems.push(fetch.delete({
        url: '/admin/api/notice/' + item.id
      }));
    });
    return RSVP.all(deleteItems);
  }

};
