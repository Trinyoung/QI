const log4js = require('log4js');
log4js.configure({
  appenders: {
    qi: { type: 'console', filename: 'logs/access' },
    error: { 
      type: 'file', 
      filename: 'logs/error' , 
      alwaysIncludePattern: true, 
      pattern: "-yyyy-MM-dd.log", 
      layout: {
        type: 'pattern',
        pattern: '[%d] [%p] - %m'
      }
    },
    access: { 
      type: 'file', 
      filename: 'logs/access',
      alwaysIncludePattern: true,
      pattern: '-yyyy-MM-dd.log',
      layout: {
        type: 'pattern',
        pattern: '[%d] [%p] - %m'
      }
   },
  },
  categories: {
    default: { appenders: ['access', 'qi', 'error'], level: 'debug' },
    err: { appenders: ['error'], level: 'error' },
    access: { appenders: ['access'], level: 'debug' }
  }
});
module.exports = {
  errLog: log4js.getLogger('err'),
  logger: log4js.getLogger()
};