const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const { errLog, logger } = require('./util/log');
const config = require('./config');
const controller = require('./controller');
// const cppMsg = require('cppmsg');
server.on('message', async function (msg, rinfo) {
  var data = config.cppModel.decodeMsg(msg);
  logger.info(JSON.stringify(data));
  // console.log (JSON.stringify(data));
  logger.debug(`server got: ${data.nid} from ${rinfo.address}: ${rinfo.port}`);
  await controller(data);
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