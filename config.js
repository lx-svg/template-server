module.exports = {
    port: 80,
    staticDir:'./static/dist',
    index:'index.html',
    notFoundRedirect:"/",
    fileUploadConfig:{
        // 上传文件存储目录
        destination: './uploads',
        // 文件名称
        fileName: `FIELDNAME-${Date.now()}.txt`,
        // 文件限制
        limit:{
            fieldNameSize: 50, // B
            fieldSize: 1024, //B
            fields: 100,

            fileSize: 1024, // B
            files: 10
        }
    },
    corsConfig:{
        origin : '*',
        methods : "POST,GET,DELETE,PUT",
        reqHeaders : "Content-Type",
        resHeaders : "",
        useCookie: false
    },

};
