const saveData = require('./service/save_data');
const forwardData = require('./service/forward_data');
const logger = require('./util/log');
module.exports = (data)=>{
  // if (data.type = 1){
  //   saveData.save();
  // }
  switch (data.type) {
    case 1:
      saveData.save()
      break;
    case 2: 
      forwardData.forward();
      break;
    default:
      logger.warn()
  }
  
}