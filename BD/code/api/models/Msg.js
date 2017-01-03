let mongoose = require('mongoose')
let msgSchema = require('../schemas/msgSchema')

let Msg = mongoose.model('Msg',msgSchema)

module.exports = Msg