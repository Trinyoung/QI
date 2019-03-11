const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const logger = require('./util/log');
const config = require('./config');
const controller = require('./controller');
const jsonRpc = require('node-json-rpc');
server.on('message', async function (msg, rinfo) {
  const json = msg.toString();
  const newMsg = JSON.parse(json);
  console.log (rinfo, '=============> rinfo')
  const result = await controller(newMsg);
  const bufferResult = new Buffer(result.toString());
  server.send(bufferResult);
});

server.on('error', function (error){
  // logger.err();
  console.log(error,'--------->')
});

server.on('listening', function () {
  var address = server.address();
  console.log('server listening' + address.address + ":" + address.port);
  // logger.info(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);