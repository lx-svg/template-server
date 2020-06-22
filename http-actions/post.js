const upload = require('../vendor/multer-config.js')

module.exports={
    POST(app) {
        app.post('/',function (req,res) {
            // handle your files
            upload.array('text')(req,res,(err)=>{
                if(err){
                    // handle Error
                    console.log(err)
                    res.json(false)
                }else{
                    // files store multiple file's content
                    // if use memory storage, file content store in files[x].buffer
                    console.log(req.files)
                    // 'test' is your field name
                    // test property store the text field info
                    console.log(req.body.test)
                    res.end()
                }
            })
        })
    }
}
