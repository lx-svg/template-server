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
