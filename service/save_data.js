const model = require('../model/qi');
const { logger, errLog } = require('../util/log');
const moment = require('moment');
const Base = require('./base');
class Save extends Base {
    constructor() {
        super();
    }
    async save(data, address, port) {
        const info = {};
        info.uptime = data.readUInt32LE(8, 4);
        info.localtime = data.reaadUInt32LE(12, 2);
        info.nid = data.slice(0, 2).toString('hex') + '-' + data.slice(2, 4);
        const eth = this.fillzero(data[4].toString(2));
        info.eth1 = eth.subStr(0, 4);
        info.eth0 = eth.subStr(4, 4);
        const wandp = this.fillzero(data[5].toString(2));
        info.ppp = wandp.subStr(0, 4);
        info.wlan = wandp.subStr(4, 4);

        const pmfc = this.fillzero(data[6].toString(2));
        info.power = pmfc.subStr(6, 2);
        info.memory = pmfc.subStr(4, 2);
        info.memory = pmfc.subStr(2, 2);
        info.memory = pmfc.subStr(0, 2);

        const temperAndHum = this.fillzero(data[7].toString(2));
        info.temperature = parseInt(temperAndHum.subStr(4, 4), 2) * 10 - 30;
        info.humidity = parseInt(temperAndHum.subStr(0, 4), 2) * 6 + 10
        const now = new Date();
        info = Object.assign({
            from: {
                host: address,
                port: port
            },
            created_at: now.getTime() / 1000,
            updated_at: now.getTime() / 1000
        }, info);
        const qi = new model(data);
        if (info.nid === undefined) {
            errLog.error('cannot find node_id');
            return;
        }
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
