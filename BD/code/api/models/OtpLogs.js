let mongoose = require('mongoose')
let otpLogsSchema = require('../schemas/otpLogsSchema')

let OtpLogs = mongoose.model('OtpLogs',otpLogsSchema)
module.exports = OtpLogs