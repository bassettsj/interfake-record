'use strict';

import url from 'url';

export default class InterfakeRecorder {
  constructor (remoteHost, outputDir) {
    if (typeof remoteHost !== 'string') {
      throw new TypeError (`Expected remoteHost to be a string, recieved ${typeof remoteHost}`);
    }
    this.remote = url.parse(remoteHost);
  }
}


console.log(new InterfakeRecorder('http://example.com/foobar?search').remote);
