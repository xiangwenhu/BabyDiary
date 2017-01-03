let mongoose = require('mongoose')
let tokenSchema = require('../schemas/tokenSchema')

let Token = mongoose.model('OtpLogs',tokenSchema)
module.exports = Token