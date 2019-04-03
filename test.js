{/* <Buffer 30 30 31 31 0f 00 14 45 03 c5 2c 02 c9 01 00 00> */}
const json = { "type": "Buffer", "data": [48, 48, 49, 49, 15, 0, 20, 69, 3, 197, 44, 2, 201, 1, 0, 0] };
// 00010100
data = {
  nid:  "3030-3131",

  eth0: "0000",
  eth1: "1111",
  ppp: "0000",
  wlan: "0000",

  power: 00,
  memory: 01,
  flash: 01,
  cpu: 00,

  temperature: 4*10-30,
  humidity: 5*6 +10,

  uptime: buff.readInt32LE(8, 4),
  localtime: buff.readInt32LE(12, 2)
}
const str = JSON.stringify(json);
const buff = JSON.parse(str, (key, value) => {
  return value && value.type === 'Buffer' ?
    Buffer.from(value.data) :
    value;
});
console.log(buff.readInt32LE(8, 4));
console.log(buff.readInt16LE(12,2));