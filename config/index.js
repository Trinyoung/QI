const test = require('./config.test');
const prod = require('./config.prod');
const dev = require('./config.dev');
const base = require('./config.default');
module.exports = (()=>{
  const env = process.env.NODE_ENV;
  Object.setPrototypeOf(test, base);
  Object.setPrototypeOf(prod, base);
  Object.setPrototypeOf(dev, base);
  let config;
  switch (env){
    case 'test':
      config = test;
      break;
    case 'prod':
      config = prod;
      break;
    case 'dev':
      config = dev;
      break;
    default:
      config = dev;
  }
  return config;
})();