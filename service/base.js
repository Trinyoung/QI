const crc16 = require('crc16');
const { logger } = require('../util/log');
class Base {
  fillzero(num) {
    const length = num.length
    if (length < 8) {
      for (let i = 0; i < 8 - length; i++) {
        num = '0' + num;
      }
    }
    return num;
  }

  confirmcrc16(data, result) {
    result = Math.pow(2, 16) - 1 - result;
    result = result ^ 0xBEEF;
    logger.info(`last 2 number result:${result}`);
    logger.info(`crc16 calculate front 14:${crc16(data,'hex')}`);
    if (crc16(data, 'hex') === result) {
      return true
    }
    return false;
  }

}

module.exports = Base;