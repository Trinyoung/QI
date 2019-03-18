const mongoose = require("mongoose");
const config = require('./config');
const DB_URL = config.mongo.url;
const logger = require('./util/log');
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, {useNewUrlParser: true});
mongoose.connection.on("connected", () => {
    logger.info('connect mongodb successfully');
});
mongoose.connection.on("error", (error) => {
    logger.error("mongodb数据库连接失败", error)
});
module.exports = mongoose;
