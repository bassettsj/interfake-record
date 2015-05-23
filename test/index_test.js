'use strict';

import {expect} from 'chai';
import InterfakeRecord from '../lib/index';

describe('InterfakeRecord', () => {
  var interfake;
  beforeEach(() => interfake = new InterfakeRecord());
  afterEach(() => {
    if (interfake) {
      interfake.stop();
    }
  });
  it('should extend the base class', () => {
    expect(interfake).to.be.defined;


  });

})
