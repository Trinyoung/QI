const saveData = require('./service/save_data');
const { logger, errLog } = require('./util/log');
  // TODO: 少传了？  await controller(msg, rinfo.address, rinfo.port);
module.exports = async (data) => {
  await saveData.save(data, address, port);
}
