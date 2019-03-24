const saveData = require('./service/save_data');
const { logger, errLog } = require('./util/log');
// const errLog = require('./util/log');
module.exports = async (data) => {
  await saveData.save(data);
}