const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const { errLog, logger } = require('./util/log');
const config = require('./config');
const controller = require('./controller');
server.on('message', async function (msg, rinfo) {
  logger.debug(`server got: ${JSON.stringify(msg)} from ${rinfo.address}: ${rinfo.port}`);
  await controller(msg, rinfo.address, rinfo.port);
});

server.on('error', function (error) {
  errLog.error(`server connecting or message listening error: ${error}`);
});

server.on('listening', function () {
  var address = server.address();
  logger.info(`server listening ${address.address}:${address.port}`);
});

server.bind(config.port);

process.on('uncaughtException', function (err) {
  errLog.error('uncaughtException:', err);
});

process.on('unhandledRejection', function (err) {
  errLog.error('unhandleRejection:', err);
});
