<template>
    <div>
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="概念题目" name="first" id="questionForm">
          <el-form ref="form" :model="form" label-width="80px" >
            <el-form-item label="题目标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="题目难度">
                <el-select v-model="form.level" placeholder="请选择题目难度">
                <el-option label="初级" value="初级"></el-option>
                <el-option label="中级" value="中级"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="题目答案">
                <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item label="标签">
                <el-checkbox-group v-model="form.tags">
                <el-checkbox label="面试必出" name="type"></el-checkbox>
                <el-checkbox label="基础题" name="type"></el-checkbox>
                <el-checkbox label="刨根问底" name="type"></el-checkbox>
                <el-checkbox label="额外知识" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="题目类型">
                <el-radio-group v-model="form.type">
                <el-radio label="JavaScript"></el-radio>
                <el-radio label="html && css"></el-radio>
                <el-radio label="Vue"></el-radio>
                <el-radio label="React"></el-radio>
                <el-radio label="Angular"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="当前时间">
                <el-col :span="11">

                <el-date-picker type="date" placeholder="默认选择当前日期" v-model="form.date1" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">上传题目</el-button>
                <el-button>取消</el-button>
            </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="疑难笔记" name="second">配置管理</el-tab-pane>
      </el-tabs> -->
    </div>
</template>
<script>
import headerComponente from '../components/header'
import sidebarComponente from '../components/sidebar'
export default {
  name: 'updateQuestion',
  components: {
    headerComponente,
    sidebarComponente
  },
  data () {
    return {
      form: {
        title: '',
        level: '',
        date1: '',
        tags: [],
        type: '',
        content: ''
      }
    }
  },
  methods: {
    getNowTime () {
      var now = new Date()
      var year = now.getFullYear() // 得到年份
      var month = now.getMonth() // 得到月份
      var date = now.getDate() // 得到日期
      month = month + 1
      month = month.toString().padStart(2, '0')
      date = date.toString().padStart(2, '0')
      var defaultDate = `${year}-${month}-${date}`
      this.$set(this.form, 'date1', defaultDate)
    },
    onSubmit () {
      this.$axios.post('/questions/insert', this.form).then(res => {
        if (res.data.status === '200') {
          this.$store.commit('dialogShow', {title: '提交成功', content: '', cancelText: '关闭'})
          setTimeout(() => {
            this.$router.go(0)
          }, 2000)
        } else {
          this.$store.commit('dialogShow', {title: res.data.message.title, content: res.data.message.content, cancelText: '关闭'})
        }
      })
    }

  },
  mounted () {
    this.getNowTime()
  }
}
</script>
<style lang="less" scoped>
// #questionForm{
//     display: inline-block;
//     position: absolute;
//     margin-top: 23px;
// }

</style>
