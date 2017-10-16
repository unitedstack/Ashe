const fetch = require('../../../../core/fetch');
const RSVP = require('rsvp');

module.exports = {

  getList: function() {
    return fetch.get({
      url: '/admin/api/account'
    });
  },
  addAccount: function(data) {
    return fetch.post({
      url: '/admin/api/account',
      data: data
    });
  },
  enableAccount: function(ids, isEnable) {
    let list = ids.map((id) => {
      let data = {
        enable: isEnable
      };

      return fetch.put({
        url: '/admin/api/account/' + id + '/enable',
        data: data
      });
    });

    return RSVP.all(list);
  }

};
