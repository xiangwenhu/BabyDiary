const Router = require('koa-router')
const User = require('../Blls/User')



const router = new Router({
    prefix: '/user'
})

//注册用户
router.post('/register', async (ctx) => {
    console.log('body:' + JSON.stringify(ctx.request.body))
    let result = await User.register(ctx.request.body)
    ctx.body = {
        status: result.status,
        message: result.status? null: result.message
    }
})


module.exports = router