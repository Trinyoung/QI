const moment = require('moment');
const model = require('../model/qi');
const { logger, errLog } = require('../util/log');
const Base = require('./base');
class Save extends Base {
    constructor() {
        super();
    }
    async save(data, address, port) {
        let info = {};
        if (!this.confirmcrc16(data.slice(0, 14).toString('hex'), data.readUInt16LE(14, 2))) {
            return;
        }
        info.uptime = data.readUInt32LE(8, 4);
        info.localtime = data.readUInt16LE(12, 2);
        info.nid = data.slice(2, 4).reverse().toString('hex') + '-' + data.slice(0, 2).reverse().toString('hex');
        const eth = this.fillzero(data[4].toString(2));
        info.eth1 = eth.substr(0, 4);
        info.eth0 = eth.substr(4, 4);
        const wandp = this.fillzero(data[5].toString(2));
        info.wlan = wandp.substr(0, 4);
        info.ppp = wandp.substr(4, 4);
        const pmfc = this.fillzero(data[6].toString(2));
        info.power = pmfc.substr(6, 2);
        info.memory = pmfc.substr(4, 2);
        info.flash = pmfc.substr(2, 2);
        info.cpu = pmfc.substr(0, 2);

        const temperAndHum = this.fillzero(data[7].toString(2));
        info.temperature = parseInt(temperAndHum.substr(4, 4), 2) * 10 - 30;
        info.humidity = parseInt(temperAndHum.substr(0, 4), 2) * 6 + 10;
        info = Object.assign({
            from: {
                host: address,
                port
            },
            created_at: Math.round(Date.now() / 1000)
        }, info);
        logger.debug(`get info:${JSON.stringify(info)}`);
        const qi = new model(info);
        if (info.nid === undefined) {
            errLog.error('cannot find node_id');
            return;
        }
        try {
            const result = await qi.save();
            logger.debug(`insert data :${result}successfully!`);
            return result;
        } catch (e) {
            errLog.error(`insert data error: ${e}`);
        }
    }
}

module.exports = new Save();
