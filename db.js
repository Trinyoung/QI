var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

module.exports = callback => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("QI");
    return callback(err, dbo);
  });
}
