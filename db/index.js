const mysql = require('mysql');
const {mysqlConfig} = require('../config.js');
const path = require('path')
const sql = require(path.resolve(__dirname,'../',mysqlConfig.sqlPath));
const pool = mysql.createPool(mysqlConfig);
module.exports=new Proxy({
},{
    get(target, p) {
        return function (...params) {
            return new Promise((resolve, reject) => {
                if (!sql[p]) {
                    reject("no sql named:" + p);
                }
                pool.query(sql[p], params,function (err, result) {
                    err ? reject(err) : resolve(result)
                });
            })
        };
    }
})
