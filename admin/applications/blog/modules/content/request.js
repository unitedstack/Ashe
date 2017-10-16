var fetch = require('../../../../core/fetch');

module.exports = {

  getArticle: function(id) {
    return fetch.get({
      url: '/admin/api/article/' + id
    });
  }

};
