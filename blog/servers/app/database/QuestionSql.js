var QuestionSql = {
    insert: 'INSERT INTO t_questions ( question_title, question_content, question_author, question_level, question_type,question_update_time ) VALUES ( ?, ?, ?, ?, ?,? );', // 插入数据
    drop: 'DROP TABLE User', // 删除表中所有的数据
    queryAll: 'SELECT * FROM t_questions', // 查找表中所有数据
    getUserById: 'SELECT * FROM User WHERE uid =?', // 查找符合条件的数据
    selectByOne: 'SELECT * FROM t_questions WHERE question_level = "中级"', // 查找符合某一项条件的数据
    select : function(options){
        return `SELECT * FROM t_questions WHERE ${options[0]} = '${options[1]}'`
    }
}
module.exports = QuestionSql;