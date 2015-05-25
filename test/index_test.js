/* global describe, beforeEach, afterEach, it */
'use strict';

import {expect} from 'chai';
import request from 'request';
import Q from 'q';
import Interfake from 'interfake';
import InterfakeRecord from '../lib/index';


describe('InterfakeRecord', () => {
  var interfake, remote;
  beforeEach(() => {
    remote = new Interfake();
    remote.get('/').status(200).body({whatever: 'stuff'});
    remote.listen(2000);
    interfake = new InterfakeRecord();
  });
  afterEach(() => {
    if (interfake) {
      interfake.stop();
    }
    if (remote) {
      remote.stop();
    }
  });
  it('should have intercept method', () => {
    debugger;
    expect(interfake).to.have.property('intercept');
  });
  it('should proxy a remote url', (done) => {
    interfake.intercept({
      route: '/',
      remote: 'http://127.0.0.1:2000',
      folder: __dirname + '/.temp'
    });
    interfake.listen(3000);

    request('http:127.0.0.1:3000', function (err, res, body) {
      expect(body).to.have.property('whatever', 'stuff');
      done();
    });
  });


});
