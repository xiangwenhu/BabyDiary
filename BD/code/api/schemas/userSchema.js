let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
  phone: { type: String },
  pwd: String,
  age: {
    type: Number,
    min: 0,
    max: 150
  },
  type: Number,
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now },
  version: Number,
  email: { type: String, require: false },
  isEmailVerified: { type: Boolean, default: false },
  userName: { type: String, required: [true,'用户名不能为空'], unique: [true,'用户名重复，请更换用户名'] },
  preLoginTime: Date,
  lastLoginTime: Date,
  preTokenRefreshTime: Date,
  tokenRefreshTime: Date,
  failedLoginCount: { type: Number, default: 0 },
  isDelete: { type: Boolean, default: false },
  address: {
    province: String,
    city: String,
    region: String,
    details: String
  },
  geoLocation: {
    latitude: Number,
    longitude: Number
  },
  profession: String,
  unlockedTime: Date,
  avatar: String,
  openId:String //第三方登录的唯一标识
})

userSchema.index({ userName: 1 })

userSchema.statics.findByPhone = (phone, cb) => {
  return this.find({
    phone: phone
  }, cb)
}

userSchema.statics.findByEmail = (email, cb) => {
  return this.find({
    email: email
  }, cb)
}


module.exports = userSchema