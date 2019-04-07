const crc16 = require('crc16');
class Base {
  fillzero(num) {
    if (num.length < 8) {
      for (let i = 0; i <= 8 - num.length; i++) {
        num = '0' + num;
      }
    }
    return num;
  }

  confirmcrc16(data, result){
    if (crc16(data, 'hex') === result){
      return true
    }
    return false;
  }

}

module.exports = Base;