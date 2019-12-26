<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <zform :model="formValidate" :rules="ruleValidate">
      <form-item prop='name' label="姓名">
        <z-input placeholder="请输入姓名"  v-model="formValidate.name"></z-input>
      </form-item>
      <form-item prop='mail' label="邮箱">
        <z-input placeholder="请输入邮箱"  v-model="formValidate.mail"></z-input>
      </form-item>
      <form-item prop='checkbox'>
        <z-checkbox v-model="formValidate.checkbox">测试</z-checkbox>
      </form-item>
    </zform>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Form from '@/components/form/form.vue'
import FormItem from '@/components/form/form-item.vue'
import ZInput from '@/components/form/input.vue'
import ZCheckbox from '@/components/checkbox/checkbox.vue'
export default {
  name: 'home',
  components: {
    // HelloWorld,
    zform:Form,
    FormItem,
    ZInput,
    ZCheckbox,
  },
  data(){
    return{
      formValidate: {
          name: '',
          mail: '',
          checkbox:true
        },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        checkbox:[
          {required:true,message:'单选框不能为空'}
        ]
      }
    }
  }
}
</script>
