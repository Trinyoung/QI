const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const { errLog, logger } = require('./util/log');
const config = require('./config');
const controller = require('./controller');
server.on('message', async function (msg, rinfo) {
  // [48,48,53,49,15,0,20,69,197,127,42,2,199,1,0,0]
  logger.info(msg, 'msg is ------------------');
  console.log(JSON.stringify(msg));
  const jsonMsg = JSON.stringify(msg);
  const data = JSON.parse(jsonMsg, function (key, value) {
    console.log ('key:'+ key,'value:'+  value,'+++++++++++++++>key', );
    return value && value.type === 'Buffer' ?  Buffer.from(value.data) : value;
  });
  // logger.info(msg.toString('hex'), 'msg hex represent+++++++++++++==>');
  // var data = config.cppModel.decodeMsg(msg);
  logger.info(JSON.stringify(data), 'data is here===============>');
  logger.debug(`server got: ${data.nid} from ${rinfo.address}: ${rinfo.port}`);
  await controller(data, rinfo.address, rinfo.port);
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