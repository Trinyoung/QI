const saveData = require('./service/save_data');
const { logger, errLog } = require('./util/log');
// const errLog = require('./util/log');
module.exports = async (data) => {
  let result;
  try {
    result = await saveData.save(data);
    logger.info(`insert data successfully!`);
  } catch (err) {
    errLog.error(`insert data error: ${err}`);
  }
  return result;
}