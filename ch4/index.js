import { sampleProvinceData } from './sampleProvinceData.js';
import { Province } from './Province.js';

const result = new Province(sampleProvinceData());

console.log(result.producers);
