module.exports = {
    port: 80,
    staticDir:'./static/dist',
    index:'index.html',
    notFoundRedirect:"/",
    fileUploadConfig:{
        destination:'./uploads',
        fileName: `FIELDNAME-${Date.now()}.txt`,
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
