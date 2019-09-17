<template>
    <div id="questionBank">
      <headerComponente></headerComponente>
      <sidebarComponente></sidebarComponente>
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
          prop="name"
          label="上传作者"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="题目标题">
        </el-table-column>
        <el-table-column
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
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
