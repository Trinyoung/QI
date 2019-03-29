const cppMsg = require('cppmsg');
const structure = {
  struct: [
    ['eth0', 'uint32'],
    ['eth1', 'uint32'],
    ['ppp', 'uint32'],
    ['wlan', 'uint32'],
    ['power', 'uint32'],
    ['memory', 'uint32'],
    ['flash', 'uint32'],
    ['cpu', 'uint32'],
    ['temperature', 'uint32'],
    ['humidity', 'uint32']
  ]
};
const model = new cppMsg.msg([
  ['nid', 'uint32'],
  ['struct', 'object', structure.struct],
  ['uptime', 'uint16'],
  ['localtime', 'uint32'],
  ['crc16', 'uint16']
]);
module.exports = {
  mongo: {
    url: "mongodb://127.0.0.1:27017/qi"
  },
  port: 41234,
  cppModel: model
}