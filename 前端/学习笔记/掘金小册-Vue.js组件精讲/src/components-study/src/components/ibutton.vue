<template>
    <button :class="'i-button-size-'+ size" :disabled = "disable" @click="handlerClick">
        <slot name="slot1"></slot>
        <slot name="slot2" :style="{color:'yellow'}" @click="handlerClick"></slot>
        <slot></slot>
    </button>
</template>
<script>

// 判断参数是否是其中之一
let oneOf = (value, validList) => {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}
export default{
  props: {
    size: {
      validator (value) {
        return oneOf(value, ['small', 'large', 'default'])
      },
      default: 'default'
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    console.log(this.size)
  },
  methods: {
    handlerClick (e) {
      this.$emit('on-click', e)
    }
  }
}
</script>
<style lang="css">
    .i-button-size-large{
        width:40px;
    }
    .i-button-size-small{
        width: 20px;
    }
    .i-button-size-default{
        width: 30px;
    }
    .type1{
        color: red;
    }
</style>
