<template>
    <div id="questionBank">
      <headerComponente></headerComponente>
    </div>
</template>
<script>
import headerComponente from '../components/header'
export default {
  components: {
    headerComponente
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
  float: left;
  line-height: 60px;
  font-size: 17px;
}

</style>
