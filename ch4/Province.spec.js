import { assert, expect } from 'chai';
import { Province } from './Province.js';
import { sampleProvinceData } from './sampleProvinceData.js';
import { beforeEach, describe, it } from 'mocha';

describe('province', () => {
  let asia;
  beforeEach(() => {
    asia = new Province(sampleProvinceData());
  });
  it('shortfall', () => {
    // assert.equal(asia.shortfall, 5);
    expect(asia.shortfall).equal(5);
  });

  it('profit', () => {
    expect(asia.profit).equal(480);
  });
});
