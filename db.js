const mongoose = require("mongoose");
const config = require('./config');
const DB_URL = config.mongo.url;
const { logger, errLog } = require('./util/log');
mongoose.Promise = global.Promise;
let connectTimes = 0;
const connect = function () {
    connectTimes++;
    if (connectTimes > 5) {
        logger.error(`connect mongodb connectTimes > 5`);
        setTimeout(() => {
            process.exit(1);
        }, 2000);
        return;
    }
    mongoose.connect(DB_URL, { useNewUrlParser: true });
    mongoose.connection.on("connected", () => {
        // TODO: 如果连接成功，是否要重置 connectTimes = 0
        logger.info('connect mongodb successfully');
    });
    mongoose.connection.on("error", (error) => {
        errLog.error("connect mongodb failed", error);
    });
};
connect();
mongoose.connection.on('disconnected', function () {
    connect();
});
module.exports = mongoose;
