var fetch = require('../../../../core/fetch');
var RSVP = require('rsvp');

module.exports = {

  publishArticles: function(data) {
    return fetch.post({
      url: '/admin/api/article',
      data: data
    });
  },

  modifyArticles: function(data, path) {
    return fetch.put({
      url: '/admin/api/article/' + path,
      data: data
    });
  },

  postMedia: function(data) {
    return fetch.post({
      url: '/admin/api/media',
      data: data
    });
  },

  getBannerTags: function() {
    return fetch.get({
      url: '/admin/api/article-tag'
    });
  },

  getArticleById(id) {
    return fetch.get({
      url: '/admin/api/article/' + id
    });
  },

  getInitData(id) {
    let initList = [];
    initList.push(this.getBannerTags());
    if(id) {
      initList.push(this.getArticleById(id));
    }
    return RSVP.all(initList);
  }

};
