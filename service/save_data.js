const model = require('../model/qi');
const { logger, errLog } = require('../util/log');
class Save {
    constructor(){
    }
    async save (data){
        const qi = new model(data);
        try {
            const result = await qi.save();
            logger.debug('insert data successfully!');
            return result;
        } catch(e){
            errLog.error()
        }
    }
}

module.exports = new Save();