let mongoose = require('mongoose')
let Schema = mongoose.Schema

let tokenSchema = new Schema({
  uid: String,
  expire: Number,
  userId:String,
  createTime: {type:Date,default:Date.now},
  token:String,
  sessionId:String
})

module.exports = tokenSchema