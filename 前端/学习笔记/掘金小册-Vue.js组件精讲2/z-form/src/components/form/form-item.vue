<template>
    <div>
        <label v-if="label" :class="{'z-form-item-label-required' : isRequired}">{{label}}</label>
        <slot></slot>
        <div v-if="validateState === 'error'" class="i-form-item-message">{{ validateMessage }}</div>
    </div>
</template>
<script>
import emitter from '../../mixin/emitter.js'
import AsyncValidator from 'async-validator'
export default {
    name:'zFormItem',
    mixins:[emitter],
    inject:['form'],
    data() {
        return {
            validateState:'',       // 保存校验状态
            validateMessage:'',
            isRequired:false,
        }
    },
    props:{
        label:{
            type:String,
            default:''
        },
        prop:{
            type:String
        }
    },
    computed:{
        fieldValue(){
            return this.form.model[this.prop]
        }
    },
    methods:{
        getRules(){
            let formRules = this.form.rules;
            // 获取到rules对应name的rules
            formRules = formRules?formRules[this.prop] : [];
            return [].concat(formRules || [])

        },
        setRules(){
            let rules = this.getRules();
            this.isRequired = rules.some((rule) => rule.required );
            this.$on('on-form-change',this.onFieldChange);
            this.$on('on-form-blur',this.onFieldBlur)
        },
        onFieldChange(){
            this.validate('change');
        },
        onFieldBlur(){
            this.validate('blur');
        },
        // 获取对应triggle的规则
        getFilterRule(triggle){
            const rules = this.getRules();
            return rules.filter((rule)=> !rule.triggle || rule.triggle.indexOf(triggle) !== -1)
        },
        validate(triggle,callback=function(){}){
            let rules = this.getFilterRule(triggle);
            // 如果没有规则直接返回true
            if(!rules || rules.length == 0){
                return true
            }

            //进行校验
            this.validateState = 'validating'  // 设置校验状态为检测中

            //调用async-validator库
            let descriptor = {};
            descriptor[this.prop] = rules;

            const validator = new AsyncValidator(descriptor);
            let model = {};

            model[this.prop] = this.fieldValue;
            console.log(model)
            validator.validate(model, { firstFields: true }, errors => {
                console.log(errors);
                this.validateState = !errors ? 'success' : 'error';
                this.validateMessage = errors ? errors[0].message : '';

                callback(this.validateMessage);
            });
        },
        resetField(){
            this.validateState = ''
            this.validateMessage = ''
            this.form.model[this.prop] = this.initialValue
        }

    },
    mounted(){
        if(this.prop){
            this.dispatch('zForm','on-form-item-add',this) 
            this.initialValue = this.fieldValue
            this.setRules()

        }
    },
    beforeDestroy(){
        this.dispatch('zForm','on-form-item-destroy',this)
    }
}
</script>
<style>
.z-form-item-label-required::before{
    content: ' * ';
    color : red
}
.i-form-item-message{
    color: red;
}
</style>