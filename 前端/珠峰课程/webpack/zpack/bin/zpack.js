#! /usr/bin/env node
/**
 * webpack的简易实现
 */

 let entry = './src/index.js';  //入口文件
 
 let output = './dist/main.js'; //出口

 let fs = require('fs')

 let script = fs.readFileSync(entry,'utf8')