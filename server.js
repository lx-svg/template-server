const express = require('express')
const app = express()
const {preflightRequest} = require('./cross-origin/cors.js')
// ACTIONS
const POST = require('./http-actions/post.js')
const DELETE = require('./http-actions/delete.js')
const PUT = require('./http-actions/put.js')
const GET = require('./http-actions/get.js')
// CONFIG
const {index,notFoundRedirect,port,corsConfig,staticDir} = require('./config.js')
// STATIC FILES
app.use(express.static(staticDir,{index: index}))
// PARSE application/json
app.use(express.json())
// PARSE application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}))
// PREFLIGHT
preflightRequest(app,corsConfig)


// HTTP ACTIONS
POST(app.post.bind(app));
GET(app.get.bind(app))
DELETE(app.delete.bind(app))
PUT(app.put.bind(app))

// 404 PATH
app.all('*',(req,res)=>{
    res.redirect(notFoundRedirect)
})
// 错误处理
app.use((err,req,res,next)=>{
    if (err instanceof URIError) {
        // URI 错误
        res.redirect(notFoundRedirect)
    }else{
        // 其它错误处理
        res.redirect(notFoundRedirect)
    }
})
/* Listening Port */
app.listen(port,()=>console.log(`server start at ${port} port`))
