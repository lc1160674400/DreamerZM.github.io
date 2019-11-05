<template>
  <div class="hello">
    <i-button @click.native="clicked">按钮 1</i-button>
    <i-button>
      <strong slot="slot2">按钮 2</strong>
    </i-button>
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
    clicked (e) {
      console.log('this button has been clicked', e)
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
