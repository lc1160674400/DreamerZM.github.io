<template>
    <div id="header">
      <div>
        <span @click="goBack">
          <i class="el-icon-back"></i>
          返回
        </span>
        <span>
          <i :class="iconClass" id="headerTitle"></i>
          {{title}}
        </span>
      </div>
    </div>
</template>
<script>
export default {
  name: 'headerComponente',
  props: {
    // 自定义验证函数
    iconClass: {
      type: String,
      validator: function (t) {
        return t.indexOf('el-icon-') !== -1
      },
      default: () => {
        return 'el-icon-s-management'
      }
    },
    title: {
      type: String,
      validator: function (t) {
        return true
      },
      default: () => {
        return '题库'
      }
    }

  },
  mounted () {
    console.log(this.iconClass)
  },
  data () {
    return {

    }
  },
  methods: {
    goBack () {
      window.history.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
@import '../assets/css/palette.less';
#header{
  background-color: @primaryColor;
  height: 60px;
  line-height: 60px;
  color: @textPrimaryColor;
}
#header > div:nth-of-type(1){
  font-size: 18px;
  margin-left: 40px;
  display: inline-block;
}
#header > div > span:nth-of-type(1){
  cursor: pointer;
}
#header > div > span:nth-of-type(2){
  margin-left: 10px;
}
#header > div > span:nth-of-type(2)::before{
  content: '';
  display: inline-block;
  border-width: 0 1px 0 1px;
  border-style: solid;
  border-color: @textPrimaryColor;
  height: 17px;
  margin-right: 20px;
  vertical-align: -2px;
}
</style>
