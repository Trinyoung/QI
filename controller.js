const saveData = require('./service/save_data');
const forwardData = require('./service/forward_data');
const logger = require('./util/log');
module.exports =async (data) => {
  let result;
  switch (data.access_type) {
    case 1:
      result = await saveData.save(data);
      break;
    case 2:
      try {
        result = await forwardData.forward();
      }
      catch (e) {
        return;
      }
      break;
    default:
      logger.warn();
  }
  return result;
}