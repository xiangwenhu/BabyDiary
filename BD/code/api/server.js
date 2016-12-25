const Koa = require('koa')
const koaStatic  = require('koa-static') 
const path = require('path')
const views  = require('koa-views')
const bodyparser  = require('koa-bodyparser')
const routes = require('./routes')

const app = new Koa()

//bodyparser
app.use(bodyparser())

//模板
//app.use(views(path.resolve(__dirname,'../client/dist')))

//静态服务器资源
//app.use(koaStatic(path.resolve(__dirname,'../client')))

//自定义错误处理
app.use(async (ctx, next) => {
  try {
    await next()
    if (ctx.status === 404) {
        ctx.body = {
            code:404, 
            msg:'404 未找到'      
        }
    }
  } catch (err) {
    let status = err.status || 500
    ctx.body = {
        code:500, 
        msg:'服务器内部错误'      
    }
    console.log(err)
  }
})


app.use(async (ctx,next)=>{
    await next()
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    ctx.set('Access-Control-Allow-Headers', 'Content-Type')
}) 

// x-response-time
app.use(async function (ctx, next) {
  const start = new Date()
  await next()
  const ms = new Date() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// logger
app.use(async function (ctx, next) {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

//路由
routes(app)

//异常
app.on('error', (err, ctx) => {
  console.log(ctx.url)
  console.log(err)
  console.log(err.stack)
})



app.listen(8080)
