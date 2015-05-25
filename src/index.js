'use strict';

import http from 'http';
import httpProxy from 'http-proxy';
import fs from 'fs';
import path from 'path';

export default class FixtureRecorder {
  constructor (target, directory = process.cwd()) {

    this.directory = this.dir = path.normalize(directory);
    fs.exists(this.dir, (exists) => {
      if (!exists) {
        throw new Error('directory does not exists: ' + this.dir);
      }
    })

    let proxy = this.proxy = httpProxy.createProxyServer({
      target: target
    });

    proxy.on('proxyReq', (proxyReq, req, res, options) => {
      console.log(this.dir, req.url);
      let recordResStream = fs.createWriteStream(path.join(this.dir, req.url));
      res.pipe(recordResStream);
    });

  }

  listen (port) {
    console.log(`Listening on port ${port}`);
    this.proxy.listen(...arguments);
  }
}

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(4515);


var fixture = new FixtureRecorder('http://127.0.0.1:4515', __dirname + '/../.temp');

fixture.listen(3000);
