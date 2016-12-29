const Router = require('koa-router')
const apiProxy = require('../models/index')
const User  = require('../models/User')


const router = 	new Router({
    prefix:'/api'
})

//搜索
router.get('/getAll', async(ctx)=>{
    let data = await apiProxy.getAll(decodeURIComponent(ctx.query.baseUrl||''), decodeURIComponent(ctx.query.query ||''))
    ctx.body = data
}).get('/user/add',async (ctx)=>{
    let u = new User({
        phone:15801234567,
        userName:'某某'
    })
    u.save()
    console.log('executing .....')
    ctx.body = {
        status:true
    }
})

module.exports = router