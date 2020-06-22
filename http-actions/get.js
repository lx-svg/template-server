module.exports=function (get) {
    get('/:id',function (req,res){
        // 获取 query string:
        console.log(req.query.id)
        // restful api:
        console.log(req.params.id)
        res.end()
    })
}
