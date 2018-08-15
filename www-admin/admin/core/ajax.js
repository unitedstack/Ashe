/**
 * Note: Compatible with partial jQuery API
 * Author: LeeY
 */

var RSVP = require('rsvp');
var Promise = RSVP.Promise;

var c = {
  dataTypes: {
    _default: '*/*',
    xml: 'application/xml, text/xml',
    html: 'text/html',
    script: 'text/javascript, application/javascript',
    json: 'application/json, text/javascript',
    text: 'text/plain'
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
};

module.exports = (function(m) {

  var request = {
    ajax: function(options) {

      var config = {
          url: '',
          method: 'GET',
          async: true,
          contentType: 'application/x-www-form-urlencoded',
          data: null,
          processData: true,
          dataType: '_default',
          headers: {}
        },
        o = Object.assign(config, options),
        xhr = new XMLHttpRequest();

      var promise = new Promise(function(resolve, reject) {
        function handler() {
          if (this.readyState !== 4) {
            return;
          }
          if (this.status >= 200 && this.status < 300) {
            resolve(request.converters(o.dataType, this.response));
          } else {
            reject(this);
          }
        }
        if (o.method === 'GET') {
          o.url = o.url + request.decodeQuery(o.data);
        }

        xhr.open(o.method, o.url, o.async);

        if (o.timeout) {
          xhr.timeout = o.timeout;
        }

        if (o.contentType !== false) {
          xhr.setRequestHeader('Content-Type', o.contentType);
        }
        xhr.setRequestHeader('Accept', m.dataTypes[o.dataType] || m.dataTypes._default);

        for (let i in o.headers) {
          xhr.setRequestHeader(i, o.headers[i]);
        }

        xhr.onerror = function(e) {
          // Wrong implementation
          reject(e);
        };

        xhr.onreadystatechange = handler;

        xhr.send(o.processData ? request.processData(o.data) : o.data);
      });

      return promise;
    },
    decodeQuery: function(q) {
      if (!q) return '';
      var ret = Object.keys(q).map((el) => {
        return el + '=' + q[el];
      }).join('&');

      if (ret === '') {
        return ret;
      }
      return '?' + ret;
    },
    processData: function(data) {
      if (!data) return null;

      var type = Object.prototype.toString.call(data);
      if (type === '[object Object]' || type === '[object Array]') {
        return JSON.stringify(data);
      }
      return null;
    },
    converters: function(dataType, data) {
      var ret = null;
      if (dataType === 'script') {
        //eval(data);
        ret = data;
      } else if (dataType === 'json') {
        try {
          ret = JSON.parse(data);
        } catch (e) {
          ret = {};
        }

      } else if (dataType === 'xml') {
        // Inspired by jQquery
        let xml, tmp;
        if (!data || typeof data !== 'string') {
          return null;
        }
        try {
          if (window.DOMParser) { // Standard
            tmp = new DOMParser();
            xml = tmp.parseFromString(data, 'text/xml');
          } else { // IE
            xml = new ActiveXObject('Microsoft.XMLDOM');
            xml.async = 'false';
            xml.loadXML(data);
          }
          ret = xml;
        } catch (e) {
          xml = null;
          ret = data;
        }
      }
      return ret;
    }
  };

  m.methods.forEach((el) => {
    request[el.toLowerCase()] = function(options) {
      options = Object.assign(options, {
        method: el
      });
      return this.ajax(options);
    };
  });

  return request;

})(c);
