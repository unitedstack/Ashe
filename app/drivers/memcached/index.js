'use strict';

const Memcached = require('memjs');

const config = require('../../../config');
const sessionEngine = config('sessionEngine');
const MemcachedStore = require('./memcachedStore');


const driver = {};
driver.memcached = new MemcachedStore(Memcached.Client.create(sessionEngine.remotes.join(','), {}));

module.exports = driver;
