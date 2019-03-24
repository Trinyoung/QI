const model = require('../model/qi');
const { logger, errLog } = require('../util/log');
const moment = require('moment');
class Save {
    constructor() {
    }
    async save(data) {
        const now = new Date();
        data = Object.assign({
            created_at: now.getTime() / 1000,
            updated_at: now.getTime() / 1000,
        });
	console.log(data.node_id);
        const qi = new model(data);
        if (!data.node_id) {
            errLog.error('cannot find node_id');
            return;
        }
        try {
            const result = await qi.save();
            logger.debug('insert data successfully!');
            return result;
        } catch (e) {
            errLog.error()
        }
    }
}

module.exports = new Save();
