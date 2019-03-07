const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const db = require('./db');
const log4js = require('log4js');
const logger = log4js.getLogger();
server.on('message', function (msg, rinfo) {
  const json = msg.toString();
  const newMsg = JSON.parse(json);
  
});

server.on('error', function (error){
  logger.err();
});

server.on('listening', function () {
  var address = server.address();
  console.log('server listening' + address.address + ":" + address.port);
  logger.info();
});
server.bind(41234);