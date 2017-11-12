import prismejs from '../lib/prismejs.min.js';
import userPrisme from './prismeModels/user';
import mockupJSONAPIInput from './mockupAPI';

const PrismeJS = new prismejs();
const PrismeJSOutput = PrismeJS.format(mockupJSONAPIInput, userPrisme);

console.log('Before PrismeJS >>>');
console.log(JSON.stringify(mockupJSONAPIInput));

console.log('\nAfter PrismeJS >>>');
console.log(JSON.stringify(PrismeJSOutput));
