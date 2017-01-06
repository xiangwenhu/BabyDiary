let UserModel = require('../models/User')
const crypto = require('crypto')

module.exports = {
    //注册
    register: async function (user) {
        //加密密码
        user.pwd = crypto.createHash('md5').update(user.pwd).digest('hex')
        let u = new UserModel(user)
        let result = await u.save().then(()=>{return {data:u,status:true}})
            .catch(err=>{return {message:err,status:false}})       
        return result
    }
}