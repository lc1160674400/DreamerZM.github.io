<template>
    <button :class="'i-button-size-'+ size" :disabled = "disable" @click="handlerClick">
        <div class="type1">
            <slot name="type1"></slot>
        </div>
        <slot name="type2"></slot>
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
      console.log(1)
      this.$emit('click1', e)
      console.log(1)
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
    .type1 span{
        color: red;
    }
</style>
