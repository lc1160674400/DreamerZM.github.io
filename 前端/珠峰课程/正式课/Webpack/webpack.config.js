//webpack内部有一个事件流，tapable 1.0   
//视频观看时间  1：11:52
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:'./src/index.js',   //webpack的输入入口
    output:{    //
        path:path.join(__dirname,'dist'),    //输出的文件目录，只能是绝对路径
        //name 是entry默认是main，hash是哈希值，是根据打包后的文件内容算的哈希值，长度是默认32位
        filename:'[name].[hash:8].js'    //打包之后的文件名
    },
    module:{    //在webpack中一切都是模块，从入口开始，递归查找所有的模块
        rules:[//数组
            {
                test:/\.css$/,   //正则，已css结尾
                //css-loader 用来处理css文件中的url路径 把css文件转换成一个js模块
                //style-loader 把css文件变成style标签插入header
                loader:["style-loader","css-loader"]   //一个可以写成字符串，多个写成数组,多个loader是有顺序要求的，从右往左写,多个的执行顺序是从右往左
            }
        ]
    },
    plugins:[
        //此插件可以自动产出html文件
        //配置文件：template
        new HtmlWebpackPlugin({
            template:'./src/index.html',//指定产出的html模板
            filename:'index.html',//产出的文件名
            title:'这是一个变量',//可以传title变量
            hash:true,//会在引入的js里加入查询字符串，避免缓存
            minify:{
                removeAttributeQuotes:true
            }

        })
    ],
    //配置devServer
    devServer:{ 
        contentBase:'./dist',
        host:'localhost',
        port:8080,
        compress: true  //服务器返回给浏览器时是否启动gzip压缩
    }   
    // chunk:{
            //代码块
    // },
    // loader:{
            //模块转换器
    // }


    //webpack启动后会从entry配置里的module开始递归解析entry依赖的所有module，就会根据配的
    //loader去找出对应的转换规则，对module进行转换之后，再解析出当前module依赖的module
    //这些模块会议entry为单位进行分组，一个entry和其所有的依赖的module被分到一个组也就是chunk
    //最后webpack会把所有的chunk转换成文件输出，再整个流程中，webpack会在恰当的时机执行plygin里定义的逻辑
}