let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
  phone: { type: String},
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
  email: { type: String, require:false},
  isEmailVerified: { type: Boolean, default: false },
  userName: { type: String, required: true ,unique:true},
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
  avatar: String
})

userSchema.index({  userName: 1 })

userSchema.statics.findByName = (name, cb) => {
  return this.find({
    userName: new RegExp(name, 'i')
  }, cb)
}



module.exports = userSchema