var webpack = require("webpack");
var path = require('path');
module.exports = {
    entry:'api.js',
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:'bundle.js'
    },
    module:{
        loders:[
            {
                test: /\.js$/, loader: 'babel-loader'
            }
        ]
    }
}