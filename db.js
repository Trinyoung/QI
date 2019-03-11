const mongoose = require("mongoose");
const DB_URL = "mongodb://127.0.0.1:27017/users";
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, {useNewUrlParser: true});
mongoose.connection.on("connected", () => {
    console.log("mongodb数据库连接成功")
});
mongoose.connection.on("error", (error) => {
    console.log("mongodb数据库连接失败", error)
});
module.exports = mongoose;

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
// module.exports = callback => {
//   MongoClient.connect(config.mongo.url, function (err, db) {
//     if (err) {
//       logger.error(`connect mongodb error:${err}`);
//       throw err;
//     }
//       logger.info(`connect mongodb successfully`)
//     var dbo = db.db("QI");
//     return callback(err, dbo);
//   });
// }
