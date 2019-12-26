<template>
    <input 
        type="text"
        :value = "currentValue"
        @input = "handlerInput"
        @blur = "handlerBlur"
    >
</template>

<script>
import emitter from '../../mixin/emitter.js'
// import {findComponentUpward} from '../../utils/assist'
export default {
    name:'z-input',
    mixins:[emitter],
    props:{
        value:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            currentValue:this.value
        }
    },
    watch: {
        value (val) {
            this.currentValue = val;
        }
    },
    methods:{
        handlerInput(event){
            const value = event.target.value;
            this.currentValue = value;
            this.$emit('input',value)
            this.dispatch('zFormItem','on-form-change',value)
        },
        handlerBlur(){
            this.dispatch('zFormItem','on-form-blur',this.currentValue)
        }
    },
    mounted(){
    }

}
</script>