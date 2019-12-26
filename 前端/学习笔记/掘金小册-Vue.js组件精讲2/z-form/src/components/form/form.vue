<template>
    <div>
        
        <form>
            <slot></slot>
        </form>
        <button @click="resetFields">重置</button>
        <button @click="submitFields">提交</button>
    </div>
</template>
<script>
import {findComponentsDownward} from '../../utils/assist'
export default {
    name:'zForm',
    provide(){
        return{
            form:this
        }
    },
    props:{
        model:{
            type:Object,
        },
        rules:{
            type:Object
        }
    },
    data:function(){
        return{
            fields:[]
        }
    },
    created(){
        this.$on('on-form-item-add',(field)=>{
            if(field) this.fields.push(field)
        })
        this.$on('on-form-item-remove',(field)=>{
            if(field.prop) this.fields.slice(this.fields.indexOf(field),1)
        })
        
    },
    methods:{
        resetFields(){
            this.fields.forEach(field =>{
                field.resetField()
            })
        },
        validate(callback){
            return new Promise(resolve =>{
                let valid = true;
                let count = 0;
                this.fields.forEach(field=>{
                    field.validate('',errors=>{
                        if(errors){
                            valid = false;
                        }
                        if(++count === this.fields.length){
                            resolve(valid)
                            if(typeof callback === 'function'){
                                callback(valid)
                            }
                        }
                    })
                })
            })
        },
        submitFields(){
            this.validate((value)=>{
                if(value){
                    alert('提交成功')
                }else{
                    alert('提交失败')
                }
            })
        }
    },
    mounted(){
        console.log(findComponentsDownward(this,'z-input'))
    }   
}
</script>