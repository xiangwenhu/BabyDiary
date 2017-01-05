const Router = require('koa-router')
const apiProxy = require('../models/index')



const router = 	new Router({
    prefix:'/api'
})

//搜索
router.get('/getAll', async(ctx)=>{
    let data = await apiProxy.getAll(decodeURIComponent(ctx.query.baseUrl||''), decodeURIComponent(ctx.query.query ||''))
    ctx.body = data
})
module.exports = router