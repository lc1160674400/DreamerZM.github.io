<template>
  <div id="app">
    <headerComponente iconClass='el-icon-upload' :title="pageInfo.title" :isIndex="pageInfo.current === '/'"></headerComponente>
    <sidebarComponente :activeItem='pageInfo.activeItem'></sidebarComponente>
    <router-view @setParent = "doSetParent" id="routerView"/>
    <el-dialog
      :title="dialogOption.title"
      :visible="showDialog"
      :modal=false
      width="30%">
      <span>{{dialogOption.content}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogHide()">{{dialogOption.cancelText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import headerComponente from './components/header'
import sidebarComponente from './components/sidebar'
export default {
  components: {
    headerComponente,
    sidebarComponente
  },
  name: 'App',
  computed: {
    showDialog () {
      return this.$store.state.showDialog
    },
    dialogOption () {
      return this.$store.state.dialogOption
    },
    pageInfo () {
      return this.$store.state.pageInfo
    }
  },
  data () {
    return {
    }
  },
  methods: {
    doSetParent (params) {
      console.log(params)
    },
    dialogHide () {
      this.$store.commit('dialogHide')
    }
  },
  mounted () {

  }
}
</script>

<style lang="less">
@import './assets/css/palette.less';
// 清除默认外边距
html,body{
  margin: 0;
  padding:0;
}
#app{
  width: 100%;
  height: 100%;

  min-width: 1376px;
  position:fixed;
}
#routerView{
    display: inline-block;
    background-color: @secondaryTextColorSide2;
    vertical-align: top;
    margin-left: -6px;
    width: calc(100% - 200px);
    height: calc(100% - 60px);
}
</style>
