var fetch = require('../../../../core/fetch');
// var RSVP = require('rsvp');

function parseParams(params) {
  if(!params) {
    return '';
  }
  let ret = '';
  Object.keys(params).forEach((o) => {
    ret += '&' + o + '=' + params[o];
  });
  return ret;
}

module.exports = {

  getList: function(page, params) {
    return fetch.get({
      url: '/admin/api/article?page=' + page + parseParams(params)
    });
  },

  modifyArticle(id, obj) {
    return fetch.put({
      url: '/admin/api/article/' + id,
      data: obj
    });
  },

  modifyStatus(id, status) {
    return fetch.put({
      url: '/admin/api/article/' + id + '/status/' + status
    });
  },

  toggleTop(id, top) {
    return fetch.put({
      url: '/admin/api/article/' + id + '/top/' + top
    });
  },

  getListByName(name) {
    let url = '/admin/api/article?search=' + name;
    return fetch.get({
      url: url
    });
  }

};
