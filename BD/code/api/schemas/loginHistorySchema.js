let mongoose = require('mongoose')
let Schema = mongoose.Schema

let loginHistorySchema = new Schema({
  createTime:{ type: Date, default: Date.now },
  isDelete: { type: Boolean, default: false },
  ip:String,
  identifier:String,
  userId:String,
  source:Number,
  result:Number,
  deviceType:String,
  deviceName:String
})

module.exports = loginHistorySchema