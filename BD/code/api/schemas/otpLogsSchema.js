let mongoose = require('mongoose')
let Schema = mongoose.Schema

let loginHistorySchema = new Schema({
  type:String,
  businessId: String,
  optUserId:String,
  description:String,
  optType:String,
  isDelete:{type:Boolean, default:false},
  createTime:{type:Date,default:Date.now},
  version:Number 
})

module.exports = loginHistorySchema