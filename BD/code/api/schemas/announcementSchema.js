let mongoose = require('mongoose')
let Schema = mongoose.Schema

let announcementSchema = new Schema({
    createTime:{ type: Date, default: Date.now },
    updateTime:{ type: Date, default: Date.now },
    version:Number,
    title:String,
    body:String,
    publisher:String,
    uid:String,
    isDelete:{ type:Boolean,default:false}
})

module.exports = announcementSchema