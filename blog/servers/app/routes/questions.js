var Question = require('./question');
// 获取url参数 依赖于url模块 使用前需要使用
var URL = require('url');
var express = require('express');
var router = express.Router();

/* GET question listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource in question');
});

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