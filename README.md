
## README

1.  **npm i 下载项目依赖模块**
2.  **在http-action目录中找到处理请求对应的文件，写入您的逻辑代码**
3.  **在config.js中修改你想要的配置**
4.  **命令行中执行 npm run start 启动服务**

### 配置
`config.js:`


```
module.exports = {
    port: 80,
    staticDir:'./static/dist',
    index:'index.html',
    notFoundRedirect:"/",
    fileUploadConfig:{
        // 是否保存在内存中
        useMemory:false,
        // 上传文件存储目录
        destination: './uploads',
        // 保存文件名称
        fileName: `${Date.now()}-FIELD_NAME-ORIGINAL_FILE_NAME`,
        // 文件限制
        limit:{
            fieldNameSize: 50, // B
            fieldSize: 1024, //B
            fields: 100,
            // 单个文件大小限制10M
            fileSize: 1024 * 1024 * 10, // B
            files: 5
        }
    },
    corsConfig:{
        origin : '*',
        methods : "POST,GET,DELETE,PUT",
        reqHeaders : "Content-Type",
        resHeaders : "",
        useCookie: false
    },
    // database config here
    mysqlConfig:{
        'connectionLimit': 10,
        'host': 'localhost',
        'port': 3306,
        'user': 'root',
        'password': '123',
        'database': 'db_car',
        'sqlPath':"./sql.js"
    }

};
```


`port` 服务器端口号
    
`staticDir` 静态文件目录

`index` 首页

`notFoundRedirect` 404重定向页面

`fileUploadConfig` 文件上传配置
- useMemory : 是否存储在内存节点中，若为true，文件内容由file.buffer中获取
- destination: 文件保存地点
- fileName: 文件名,`FIELDNAME`为客户端上传的表单域名称
- limit
    - fieldNameSize : 域名称大小，单位： B
    - fieldSize : 非文件域表单值，单位：B
    - fields : 非文件域个数限制
    - fileSize : 文件大小，单位： B
    - files : 文件个数限制

`corsConfig`跨域相关
- origin : 允许的请求源
- methods : 允许请求源发送的HTTP方法
- reqHeaders : 允许请求源发送的HTTP Request Header
- resHeaders : 允许请求源访问的HTTP response Header
- useCookie: 开启credential

`mysqlConfig` 数据库相关
- connectionLimit : 允许连接数
- host : host 例如 localhost
- port ： 端口号 例如 3306
- user ： 数据库用户名
- password ： 密码
- database ： 目标数据库名称
- sqlPath ： sql配置文件路径


### http-actions

`get请求` 

- req.query.X ： 获取query数据 
- req.params.X : 获取restful数据 

```
// http-actions/get.js
module.exports=function (get) {
    get('/:id',function (req,res){
        // 获取 query string:
        console.log(req.query.xxx)
        // restful api:
        console.log(req.params.id)
        res.end()
    })
}
```
`post请求` 
- req.body.X ： 获取请求体中的数据

`接收文件`
- req.file
    - fieldname ： 表单域名称，由表单指定
    - originalname : 原始文件名称
    - encoding ： 文件编码
    - mimetype : mime类型
    - size ： 文件大小
    - destination : 保存路径
    - filename 保存在destination中的文件名
    - path 已上传文件的完整路径
    - buffer 保存在内存中的文件数据
- req.files
    - 保存多个file的数组
```
// http-actions/post.js
// 引入文件处理
const upload = require('../vendor/multer-config.js')
// 引入数据库
const db = require('../db')
module.exports= function (post) {
    post('/profile',  function (req, res, next) {
        // 获取单域单文件【若不止单个文件，则抛出异常】，avatar为文件域名称
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
                // 若配置文件 useMemory:false,则为undefined
                console.log(req.file.buffer)
                // 获取非文件域内容
                console.log(req.body.test)
                res.end()
            }
        })
    })
    post('/info', (req,res) => {
        // 接收单域多个文件
        // 如果multipart/form-data的imgs域有多个文件，应使用upload.array
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
        // 如multipart/form-data的avatar，gallery域有文件，则使用upload.fields
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
        // queryAccount是您提供的sql语句的key值，在您的sql语句中，有几个‘？’，您就应该提供几个参数
        // 对数据库的操作应单独抽取到DAO层，此代码仅供示例参考
        db.queryAccount(req.body.account,req.body.pwd)
        // handle result
            .then(data=>{
                console.log(data)
                res.send(data)
            })
            // catch error
            .catch(err =>{
                console.log(err)
                res.status(400).send({err:"Bad Request"})
            })
    })
}

```
