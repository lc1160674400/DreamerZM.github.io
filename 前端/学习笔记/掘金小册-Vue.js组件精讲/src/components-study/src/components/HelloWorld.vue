<template>
  <div class="hello">
    <i-button>按钮 1</i-button>
    <i-button>
      <strong>按钮 2</strong>
    </i-button>
    <i-button><span slot="type1" @click1="handler1">这是红色</span></i-button>
    <i-button><span slot="type2">这是bai色</span></i-button>
  </div>
</template>

<script>
import ibutton from './ibutton'
export default {
  name: 'HelloWorld',
  components: { IButton: ibutton },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    handler1 () {
      console.log(2)
      alert(1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
