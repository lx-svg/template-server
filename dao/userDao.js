const db = require('../db')

module.exports={
    validateAccount(account,pwd) {
        // queryAccount是您提供的sql语句的key值，他是一个函数，queryAccount 返回一个Promise实例
        // 在您的sql语句中，有几个‘？’，您就应该提供几个参数
       return db.queryAccount(account,pwd)
            .then(data=>{
                console.log(data)
                return data.length > 0;
        })
        // catch error
            .catch(err =>{
                console.log(err)
                return error
            })
    }
}
