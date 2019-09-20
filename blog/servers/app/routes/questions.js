var Question = require('./question');
// 获取url参数 依赖于url模块 使用前需要使用
var mysql = require('mysql');   // 引入mysql
var dbConfig = require('../database/config');     //引入mysql 配置文件
var questionSql = require('../database/QuestionSql')    // 引入sql执行命令
var URL = require('url');
var express = require('express');
var router = express.Router();

// 创建一个连接池
// 使用DBConfig.js的配置信息创建一个MySql链接池
var pool = mysql.createPool( dbConfig.mysql );
// 响应一个JSON数据
var responseJSON = function (res, ret) {
    if (typeof ret === 'undefined') {
      res.json({
          code: '-200',
          msg: '操作失败'
      });
    } else {
      var dataString = JSON.stringify(ret);
      var data = JSON.parse(dataString);
      res.json(data);
    }
};
/* GET question listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource in question');
});


// 创建一个查询数据库接口
router.get('/queryAll',(req,res,next)=>{
  var question = new Question();
  var params = URL.parse(req.url, true).query;
  pool.getConnection((err,connection)=>{
    connection.query(questionSql.queryAll,(err,result)=>{
      responseJSON(res, result)
      connection.release();
    })
  })
})

// 创建一个插入数据库接口
router.post('/insert',(req,res)=>{
  console.log(req.body);
  let params = req.body;
  var strTime=params.date1; //字符串日期格式             
  var date= new Date(Date.parse(strTime.replace(/-/g,   "/"))); //转换成Data();
  pool.getConnection(function (err, connection) {
      connection.query(questionSql.insert, [params.title,params.content,'zmer',params.level,params.type,date], function (err, rows) {
          if (err) {
              res.send({
                status:'500',
                message:{
                  title:'新增失败',
                  content:err
              }
              });
          } else {
              res.send({
                status:'200',
                message:'上传成功'
              });
          }
          connection.release();

      });
  });
  // pool.getConnection((err,connection)=>{
  //   connection.query(questionSql.queryAll,(err,result)=>{
  //     responseJSON(res, result)
  //     connection.release();
  //   })
  // })
})

// 监听一个路由接收参数并且返回一堆静态测试数据
router.get('/getQuestion', function(req, res, next) {
  var question = new Question();
  var params = URL.parse(req.url, true).query;

  if(params.id == '1') {
    question.question_id=1;
    question.question_title=1;
    question.question_content=1;
    question.question_author=1;
    question.question_update_time=1;
    question.question_level=1;
    question.question_type=1;
    question.question_tag=1;
    question.question_markdown=1;
    question.question_note=1;
    question.question_remarks=1;
  } else {
    question.question_id=2;
    question.question_title=2;
    question.question_content=2;
    question.question_author=2;
    question.question_update_time=2;
    question.question_level=2;
    question.question_type=2;
    question.question_tag=2;
    question.question_markdown=2;
    question.question_note=2;
    question.question_remarks=2;
  }
  var response = {status:200,data:question};
  res.send(JSON.stringify(response))
});

module.exports = router;