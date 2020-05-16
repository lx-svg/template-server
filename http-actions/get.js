
module.exports={
    GET(app) {
        app.get('/:id',(req,res)=>{
            // query string:
            // console.log(req.query.xxx)
            // restful api:
            // console.log('req.params.id')
            res.end()
        })


    }
}
