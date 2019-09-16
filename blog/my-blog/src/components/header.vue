<template>
    <div id="header">
      <div>
        <i :class="iconClass"></i>
        {{title}}
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
  }
}
</script>
<style lang="less" scoped>
@import '../assets/css/palette.less';
#header{
  background-color: @darkPrimaryColor;
  height: 60px;
  line-height: 60px;
  color: #fff;
}
</style>
