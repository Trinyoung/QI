const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const logger = require('./util/log');
const config = require('./config');
const controller = require('./controller');

const jsonRpc = require('node-json-rpc');
server.on('message', async function (msg, rinfo) {
  const json = msg.toString();
  const newMsg = JSON.parse(json);
  const result = await controller(newMsg);
  const bufferResult = new Buffer(result.toString());
  server.send(bufferResult);
});

server.on('error', function (error){
  logger.error(`server connecting or message listening error: ${error}`)
});

server.on('listening', function () {
  var address = server.address();
  logger.info(`server listening ${address.address}:${address.port}`)
});

server.bind(config.port);

process.on('uncaughtException', function(err){
  logger.error(`uncaughtException :${err}`);
});

jsonRpc.Server();