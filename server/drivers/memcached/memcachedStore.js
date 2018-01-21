'use strict';

class MemcachedStore {
  constructor(client) {
    this.client = client;
  }

  get(sid) {
    const that = this;
    return new Promise(function (resolve, reject) {
      that.client.get(sid.toString(), function (err, data) {
        if (err) {
          reject(err);
        } else {
          if (!data) {
            data = '{}';
          } else {
            data = JSON.parse(data.toString());
          }
          resolve(data);
        }
      });
    });
  }

  set(sid, value, expires) {
    const that = this;
    value = JSON.stringify(value);
    return new Promise(function (resolve, reject) {
      that.client.set(sid, value, parseInt(expires, 10) / 1000, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(Array.prototype.slice.call(arguments, 1));
        }
      });
    });
  }

  destroy(sid) {
    const that = this;
    return new Promise(function (resolve, reject) {
      that.client.delete(sid, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(Array.prototype.slice.call(arguments, 1));
        }
      });
    });
  }
}

module.exports = MemcachedStore;
