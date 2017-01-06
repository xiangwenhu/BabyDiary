let mongoose = require('mongoose')
let userSchema = require('../schemas/userSchema')


let User = mongoose.model('User',userSchema)




module.exports = User