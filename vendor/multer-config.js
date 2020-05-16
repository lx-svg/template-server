const multer = require('multer')
const {fileName,destination,limit} = require('../config.js').fileUploadConfig
const upload = multer({
    storage: multer.diskStorage({
        // 相对路径
        destination: destination,
        // 文件名称
        filename: function (req, file, cb) {
            console.log('Debug storage: 存储 ');
            cb(null, fileName.replace('FIELDNAME',file.fieldname))
        },
    }),
    // 文件过滤器
    fileFilter(req, file, cb) {
        console.log('Debug filter: 过滤 ');
        cb(null, true); // 允许通过
    },
    // 限制
    limits: limit
});
module.exports = upload;
