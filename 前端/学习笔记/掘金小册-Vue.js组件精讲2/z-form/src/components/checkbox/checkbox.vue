
<template>
    <div>
        <label>
            <span>
                <input 
                    type="checkbox"
                    :disabled ="disabled"
                    :checked = "currentValue"
                    @change="handlerChange"
                >
            </span>
            <slot></slot>
        </label>
    </div>
</template>
<script>
/**
 * 因为要在 Checkbox 组件上直接使用 v-model 来双向绑定数据，那必不可少的一个 prop 就是 value，还有 event input，因为 v-model 本质上是一个语法糖（如果你还不清楚这种用法，可以阅读最后的扩展阅读 1）。

理论上，我们只需要给 value 设置为布尔值即可，也就是 true / false，不过为了扩展性，我们再定义两个 props：trueValue 和 falseValue，它们允许用户指定 value 用什么值来判断是否选中。因为实际开发中，数据库中并不直接保存 true / false，而是 1 / 0 或其它字符串，如果强制使用 Boolean，使用者就要再额外转换一次，这样的 API 设计不太友好。

除此之外，还需要一个 disabled 属性来表示是否禁用。

自定义事件 events 上文已经说了一个 input，用于实现 v-model 语法糖；另一个就是 on-change，当选中 / 取消选中时触发，用于通知父级状态发生了变化。

slot 使用默认的就好，显示辅助文本。

理清楚了 API，先来写一个基础的 v-model 功能，这在大部分组件中都类似。
 */
import emitter from '@/mixin/emitter.js'
export default {
    name:"zCheckbox",
    mixins:[emitter],
    data() {
        return {
            currentValue:this.value
        }
    },
    props:{
        value:{
            type:[Boolean,String,Number],
            default:false
        },
        trueValue:{
            type:[Boolean,String,Number],
            default:true
        },
        falseValue:{
            type:[String,Boolean,Number],
            default:false
        },
        disabled:{
            type:Boolean,
            default:false
        }
    },
    watch:{
        value(val){
            if(val === this.trueValue || val === this.falseValue){
                this.updateValue(val)
            }else{
                throw 'value should be trueValue or falseValue'
            }
        }
    },
    methods:{
        handlerChange(event){
            if(this.disabled){
                return false
            }
            const checked = event.target.checked;
            this.currentValue = checked;
            const value = checked?this.trueValue:this.falseValue;
            this.$emit('input',value)
            this.$emit('on-change',value)
            this.dispatch('z-checkbox-group','checkbox-onchange',value)
            this.dispatch('zFormItem','on-form-change',value)
        },
        updateValue(){
            this.currentValue = this.value === this.trueValue;
        }
    }
}
</script>