let mongoose = require('mongoose')
let announcementSchema = require('../schemas/announcementSchema')

let Announcement = mongoose.model('Announcement',announcementSchema)

module.exports = Announcement