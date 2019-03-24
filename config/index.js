const test = require('./config.test');
const prod = require('./config.prod');
const dev = require('./config.dev')
module.exports = (()=>{
  const env = process.env.NODE_ENV;
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