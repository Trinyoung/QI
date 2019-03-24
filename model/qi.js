const db = require('../db');
const Schema = db.Schema;

const QiSchema = new Schema({
  node_id: { type: String, required: true, indexs: true },
  access_type: String,
  ip_type: String,
  power_status: String,
  battery_status: String,
  memory_status: String,
  storage_status: String,
  cpu_status: String,
  enviroment_status: String,
  private_ip: String,
  up_time: Number,
  local_time: String,
  CRC16: String,
  created_at: Number,
  updated_at: Number
}
);
const Qi = db.model('Qi', QiSchema);
module.exports = Qi;