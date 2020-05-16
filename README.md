
## README

1.  **npm i 下载模块**
2.  **在http-action目录中找到对应的请求回调，写入逻辑代码**
3.  **在config.js中修改配置**
4.  **命令行中执行 npm run start 启动服务**

`config.js:`

`port` 服务器端口号
    
`staticDir` 静态文件目录

`index` 首页

`notFoundRedirect` 404重定向页面

`fileUploadConfig` 文件上传配置
- destination: 文件保存地点
- fileName: 文件名,`FIELDNAME`为客户端上传的表单域名称
- limit
    - fieldNameSize: 域名称大小，单位： B
    - fieldSize: 非文件域表单值，单位：B
    - fields: 允许的非文件域个数
    - fileSize: 文件大小，单位： B
    - files: 文件个数

`corsConfig`跨域相关
- origin : 允许的请求源
- methods : 允许请求源发送的HTTP方法
- reqHeaders : 允许请求源发送的HTTP Request Header
- resHeaders : 允许请求源访问的HTTP response Header
- useCookie: 开启credential

