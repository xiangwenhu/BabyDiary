let mongoose = require('mongoose')
let loginHistorySchema = require('../schemas/loginHistorySchema')

let LoginHistory = mongoose.model('LoginHistory',loginHistorySchema)

module.exports = LoginHistory