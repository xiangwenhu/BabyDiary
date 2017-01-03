let mongoose = require('mongoose')
let Schema = mongoose.Schema

let msgSchema = new Schema({
  ownerId:String,
  type:String,
  from:String,
  to:String,
  isRead:{type:Boolean, default:false},
  detail:{
      subject:String,
      body:String
  },
  isDelete:{type:Boolean, default:false},
  createTime:{type:Date, default:Date.now},
  updateTime:{type:Date, default:Date.now},
  version:Number,   
})

module.exports = msgSchema