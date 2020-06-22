const multer = require('multer')
const {fileName,destination,limit,useMemory} = require('../config.js').fileUploadConfig
const upload = multer({
    storage: useMemory ? multer.memoryStorage() :multer.diskStorage({
        // 相对路径
        destination: destination,
        // 文件名称
        filename: function (req, file, cb) {
            // 存储
            cb(null, fileName.replace('FIELD_NAME',file.fieldname).replace("ORIGINAL_FILE_NAME",file.originalname))
        },
    }),
    // 文件过滤器
    fileFilter(req, file, cb) {
        // 过滤
        cb(null, true); // 允许通过
    },
    // 限制
    limits: limit
});
module.exports = upload;
