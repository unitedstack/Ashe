const fetch = require('../../../../core/fetch');
const RSVP = require('rsvp');

module.exports = {

  getList: function() {
    return fetch.get({
      url: '/admin/api/company'
    });
  },
  addCompany: function(data) {
    return fetch.post({
      url: '/admin/api/company',
      data: data
    });
  },
  enableCompany: function(ids, isEnable) {
    let list = ids.map((id) => {
      let data = {
        enable: isEnable
      };

      return fetch.put({
        url: '/admin/api/company/' + id + '/enable',
        data: data
      });
    });

    return RSVP.all(list);
  }

};
