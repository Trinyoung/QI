const log4js = require('log4js');
log4js.configure({
  appenders: {
    cheese: { type: 'console' },
    error: { 
      type: 'file', 
      filename: '../log/error' , 
      alwaysIncludePattern: true, 
      pattern: "-yyyy-MM-dd.log", 
      layout: {
        type: 'pattern',
        pattern: '[%d] [%p] - %m'
      }
    },
    access: { 
      type: 'file', 
      filename: '../log/access',
      alwaysIncludePattern: true,
      pattern: '-yyyy-MM-dd.log',
      layout: {
        type: 'pattern',
        pattern: '[%d] [%p] - %m'
      }
   },
  },
  categories: {
    default: { appenders: ['cheese'], level: 'all' },
    err: { appenders: ['error'], level: 'error' },
    access: { appenders: ['access'], level: 'info' }
  }
});
const qi = log4js.getLogger('');
const errLog = log4js.getLogger('err');
const access = log4js.getLogger('access');
errLog.error('Got error');
access.info('Got QI');


// module.exports = logger;