module.exports={
    preflightRequest(app, {origin = '*', methods = "POST,GET,DELETE,PUT", reqHeaders = "Content-Type", resHeaders = "", useCookie = false} = {}) {
        app.all('*', (req, res, next) => {
            // Cors
            res.set({
                "Access-Control-Allow-Origin": origin,
            });
            if(useCookie){
                res.set({
                    //  Cookie: 若启用 Access-Control-Allow-Origin 需明确指定
                    "Access-Control-Allow-Credentials": useCookie
                })
            }
            if (req.method.toUpperCase() === 'OPTIONS') {
                // 非简单请求OPTIONS 预检
                res.set({
                    "Access-Control-Allow-Methods": methods,
                    "Access-Control-Allow-Headers": reqHeaders,
                })
                // 预检完毕
                res.end()
            } else {
                // 简单请求的响应头设置可在后续回调函数中覆盖
                if(resHeaders){
                    res.set({
                        // res Header
                        "Access-Control-Expose-Headers": resHeaders,
                    })
                }
                next()
            }
        })
    }
}
