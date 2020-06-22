const upload = require('../vendor/multer-config.js')
// 引入dao层
const dao = require('../dao/userDao.js')
module.exports= function (post) {
    post('/profile',  function (req, res) {
        // 获取单域单文件，avatar为文件域名称
        upload.single('avatar')(req,res,(err)=>{
            if(err){
                // 发生错误 [不符合文件限制，不止一个文件等情况，在这里捕获异常]
                console.log(err)
                res.json(false)
            }else{
                // 一切都好
                // file保存单个file文件
                // 如果不保存到物理磁盘，则在file.buffer中获取文件
                console.log(req.file)
                // 如果你使用内存存储，则从req.body.buffer获取内存中保存的文件
                // 若useMemory:false,则为undefined
                console.log(req.file.buffer)
                // 获取非文件域内容
                console.log(req.body.test)
                res.end()
            }
        })
    })
    post('/info', (req,res) => {
        // 接收单域多个文件
        // 如果multipart/form-data的imgs域有多个文件，则使用upload.array
        upload.array('imgs')(req,res,(err)=>{
            if(err){
                // 发生错误 [不符合文件限制，在这里捕获异常]
                console.log(err)
                res.json(false)
            }else{
                // req.files存储多个文件 :
                // files:[file,file,file...]
                console.log(req.files)
                // 获取非文件域内容
                console.log(req.body.test)
                res.end()
            }
        })
    })
    post('/more', (req,res) => {
        // 接收多域多个文件
        // 如果multipart-formdata的avatar，gallery域有文件，则使用upload.fields
        // maxCount 表示该域最多上传 n 个文件, 若超出限制，则会抛出异常
        upload.fields([
            { name: 'avatar', maxCount: 1 },
            { name: 'gallery', maxCount: 8 }
        ])(req,res,(err)=>{
            if(err){
                // 发生错误 [不符合文件限制，在这里捕获异常]
                console.log(err)
                res.json(false)
            }else{
                // req.files存储多个文件 :
                // files:[file,file,file...]
                console.log(req.files)
                // 获取非文件域内容
                console.log(req.body.test)
                res.end()
            }
        })
    })
    /**
     *  和后台数据库交互
     */
    post('/user',(req,res)=>{
        // use 'res.body.xxx'  to get the post request body params
        console.log(req.body.account)
        // handle result
        dao.validateAccount(req.body.account,req.body.pwd)
            .then(result=>{
                res.send(result)
            })
            .catch(err=>{
                res.status(400).send({message:"正在维护中"})
            })
    })
}
