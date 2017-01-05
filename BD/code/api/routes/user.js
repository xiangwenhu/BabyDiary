const Router = require('koa-router')
const User  = require('../models/User')
const crypto = require('crypto')


const router = 	new Router({
    prefix:'/user'
})

//注册用户
router.get('/register',async (ctx)=>{

   let user = new User({
       phone:15801576442,
       pwd:12345678,
       userName: '谁是谁的谁'
   })    

   user.pwd = crypto.createHash('md5').update(user.pwd).digest('hex')
   user.save()

   console.log('executing .....')
   ctx.body = {
        status:true
    }
})

module.exports = router