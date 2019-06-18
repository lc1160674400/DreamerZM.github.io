let express = require('express');
let app = express();
let whiteList = ['http://localhost:3000','http://127.0.0.1:3000']

app.use(function(req,res,next){
    let origin = req.headers.origin;
    if(whiteList.includes(origin)){
        //设置哪个源可以访问
        res.setHeader('Access-Control-Allow-Origin',origin)
        res.setHeader('Access-Control-Allow-Headers','name')
    }
    next();
})
app.get('/getData',function (req,res) {
    // let {wd,cb} = req.query
    console.log(req.headers)
    res.end(`我不爱你`)
})

// app.use(express.static(__dirname)) //起一个本地静态资源监听

app.listen('4000')