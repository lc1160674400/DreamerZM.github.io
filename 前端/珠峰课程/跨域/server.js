let express = require('express');
let app = express();

app.get('/say',function (req,res) {
    let {wd,cb} = req.query
    res.end(`${cb}('我不爱你')`)
})

app.use(express.static(__dirname)) //起一个本地静态资源监听

app.listen('3000')