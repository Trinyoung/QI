const db = require('../db');
const Schema = db.Schema;

const forward = new Schema({
    method: String,
    version: String,
    
  }
);
const forward= db.model('froward', forward);
module.exports = forward;