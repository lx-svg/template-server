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
                    console.log(req.files)
                    // test is your field name
                    console.log(req.body.test)
                    res.end()
                }
            })
        })
    }
}
