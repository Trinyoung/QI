const model = require('../model/qi');
const { logger, errLog } = require('../util/log');
const moment = require('moment');
class Save {
    constructor() {
    }
    async save(data, address, port) {
        const now = new Date();
        data = Object.assign({
            from: {
                host: address,
                port: port
            }, 
            created_at: now.getTime() / 1000,
            updated_at: now.getTime() / 1000
        }, data);
        const qi = new model(data);
        if (data.nid === undefined) {
            errLog.error('cannot find node_id');
            return;
        }
        // {"nid":825307184,"struct":{"eth0":1158938639,"eth1":36250219,"ppp":454}}
        try {
            const result = await qi.save();
            logger.debug('insert data successfully!');
            return result;
        } catch (e) {
            errLog.error(`insert data error: ${e}`);
        }
    }
}

module.exports = new Save();
