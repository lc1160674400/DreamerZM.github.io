<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
