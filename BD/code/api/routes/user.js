const Router = require('koa-router')
const User = require('../Blls/User')



const router = new Router({
    prefix: '/user'
})

//注册用户
router.post('/register', async (ctx) => {
    console.log('body:' + JSON.stringify(ctx.request.body))
    let result = await User.register(ctx.request.body)
    ctx.body = result
})
.post('/login', async(ctx)=>{
    let {phone,pwd} = ctx.request.body 
    let result = await User.login(phone,pwd)
    ctx.body = result  
})


module.exports = router