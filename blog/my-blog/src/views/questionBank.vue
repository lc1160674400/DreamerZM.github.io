<template>
    <div id="questionBank">
      <headerComponente></headerComponente>
      <sidebarComponente activeItem="中级"></sidebarComponente>
       <el-table
        :data="tableData"
        id="dataTable"
        >
        <el-table-column
          prop="date"
          label="上传日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="author"
          label="上传作者"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="题目标题">
        </el-table-column>
        <el-table-column
          prop="content"
          label="快速预览">
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
import headerComponente from '../components/header'
import sidebarComponente from '../components/sidebar'
export default {
  components: {
    headerComponente,
    sidebarComponente
  },
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    this.$axios.get('/questions/queryAll')
      .then((res) => {
        res.data.forEach(element => {
          this.tableData.push({
            date: element.question_update_time ? this.transformDateToString(element.question_update_time) : '暂无日期',
            author: element.question_author,
            title: element.question_title,
            content: element.question_content
          })
        })
      }, (res) => {
        this.$store.commit('dialogShow', {title: '调用接口失败', content: res, cancelText: '关闭'})
      }).catch((e) => {
        console.log(e)
      })
  }
}
</script>
<style lang="less" scoped>
@import '../assets/css/palette.less';
#questionBank{
  height: 100%;
  width: 100%;
}
.el-container{
  height: 100%;
}
.el-header{
  text-align: center;
  background: -webkit-linear-gradient(left, @lightPrimaryColor , @secondaryTextColor); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, @lightPrimaryColor, @secondaryTextColor); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, @lightPrimaryColor, @secondaryTextColor); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, @lightPrimaryColor , @secondaryTextColor); /* 标准的语法 */
}
.el-header span:nth-of-type(1){
  color: @textPrimaryColor;
  display: inline-block;
  line-height: 60px;
  font-size: 17px;
}
#dataTable{
  width: 84%;
  display: inline-block;
  position: absolute;
}
</style>
