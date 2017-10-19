#!/usr/bin/env node

'use strict';
const start = Date.now();
const http = require('http');

const pkg = require('package.json');
const app = require('server/app');
const config = require('config');

const port = config('port') || 5000;

console.log(`${pkg.name} booted in ${(Date.now()) - start}ms - port: ${port}`);

const server = http.createServer(app.callback());
server.listen(port);

module.exports = server;
