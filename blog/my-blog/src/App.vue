<template>
  <div id="app">
    <router-view/>
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
export default {
  name: 'App',
  computed: {
    showDialog () {
      return this.$store.state.showDialog
    },
    dialogOption () {
      return this.$store.state.dialogOption
    }
  },
  methods: {
    dialogHide () {
      this.$store.commit('dialogHide')
    }
  },
  mounted () {
  }
}
</script>

<style lang="less">
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
</style>
