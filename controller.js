const saveData = require('./service/save_data');
const forwardData = require('./service/forward_data');
module.exports = (data)=>{
  if (data.type = 1){
    saveData.save();
  }
  
  
}