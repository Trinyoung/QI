const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const { errLog, logger } = require('./util/log');
const config = require('./config');
const controller = require('./controller');

const jsonRpc = require('node-json-rpc');
server.on('message', async function (msg, rinfo) {
  logger.info(msg);
  const json = msg.toString('utf-8');
  console.log(json, '+++++++++++++++++++++++++++>');
  logger.debug(`server got: ${msg} from ${rinfo.address}: ${rinfo.port}`);
  const newMsg = JSON.parse(json);
  await controller(newMsg);
});

server.on('error', function (error) {
  errLog.error(`server connecting or message listening error: ${error}`);
});

server.on('listening', function () {
  var address = server.address();
  logger.debug(`server listening ${address.address}:${address.port}`);
});

server.bind(config.port);

process.on('uncaughtException', function (err) {
  errLog.error(`uncaughtException :${err}`);
});