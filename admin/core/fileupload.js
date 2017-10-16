let RSVP = require('rsvp');
let Promise = RSVP.Promise;

module.exports = (option) => {

  let xhr = new XMLHttpRequest();

  let promise = new Promise(function(resolve, reject) {
    function handler() {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText);
      } else {
        reject(xhr);
      }
    }

    xhr.open('post', option.url, true);

    xhr.onerror = function(e) {
      reject(e);
    };

    xhr.onreadystatechange = handler;

    xhr.send(option.data);
  });

  return promise;
};
