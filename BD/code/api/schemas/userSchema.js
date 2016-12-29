let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
  phone: String,
  type: Number,
  createTime: Date,
  updateTime: Date,
  version: Number,
  email: String,
  isEmailVerified: Boolean,
  userName: String,
  preLoginTime: Date,
  lastLoginTime: Date,
  preTokenRefreshTime: Date,
  tokenRefreshTime: Date,
  failedLoginCount: Number,
  isDelete: Boolean,
  address: {
    province:String,
    city:String,
    region:String,
    details:String
  },
  geoLocation:{
    latitude: Number,
    longitude: Number
  },
  profession: String,
  unlockedTime: Date,
  avatar:String
})

userSchema.statics.findByName = (name,cb) =>{
  return this.find({
    userName:new RegExp(name, 'i')
  },cb)
}



module.exports = userSchema