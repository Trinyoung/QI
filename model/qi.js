const db = require('../db');
const Schema = db.Schema;

const QiSchema = new Schema({
  nid: { type: String, required: true, indexs: true },
  eth0: { type: String },
  eth1: { type: String },
  ppp: { type: String },
  wlan: { type: String },
  power: { type: String },
  memory: { type: String },
  flash: { type: String },
  cpu: { type: String },
  temperature: { type: String },
  humidity: { type: String },
  uptime: { type: Number },
  localtime: { type: Number },
  from: {
    host: { type: String },
    port: { type: String }
  },
  created_at: Date
}
);
const Qi = db.model('Qi', QiSchema);
module.exports = Qi;