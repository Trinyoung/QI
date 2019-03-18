var obj = {name: 'lqy', age: 23};
console.log(JSON.stringify(obj));
var buffer = new Buffer(JSON.stringify(obj));
const buf = buffer.toString();
console.log(JSON.parse(buf));
module.exports = buf;