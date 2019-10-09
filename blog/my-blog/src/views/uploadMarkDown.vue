<template>
    <div>
        <el-input
            placeholder="请输入标题"
            suffix-icon="el-icon-money"
            v-model="title"
            class="title-input"
        ></el-input>
        <el-select v-model="selectData" clearable placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
        </el-tag>
        <mavon-editor v-model="markdownData" class="mark-down"/>
        <div class="bottom-tool-box">
            <span>当前时间：</span>
            <span>{{currentDate}}</span>
            <span class='button-area'>
                <el-button @click="confirm">取消上传/清空</el-button>
                <el-button type="primary" @click="upload">确认上传</el-button>
            </span>

        </div>
        <el-dialog
            :modal = "false"
            :title="dialogData.title"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>{{dialogData.content}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogData.confirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: 'uploadMarkDown',
  data () {
    return {
      markdownData: '',
      title: '',
      selectData: '',
      currentDate: '----年-月-日 --:--:--',
      dialogVisible: false,
      options: [{
        value: 'base',
        label: '基础'
      }, {
        value: 'middle',
        label: '中级'
      }, {
        value: 'higher',
        label: '高级'
      }],
      dynamicTags: ['面试必问', '基础夯实', '拔高挑战', 'javascript骚操作', '简单使用小技巧'],
      dialogData: {
        title: '',
        content: '',
        confirm: function () {
          console.log('confirm')
        },
        cancel: function () {
          console.log('cancel')
        }
      }
    }
  },
  watch: {
    value (val) {
      // 此处可以监听markdown文件value
    }
  },
  mounted () {
    let check = function (i) {
      // 方法一，用三元运算符
      var num
      i < 10 ? num = '0' + i : num = i
      return num
    }
    setInterval(() => {
      var time = new Date()
      var year = time.getFullYear()
      var month = time.getMonth() + 1
      var day = time.getDate()

      // 获取时分秒
      var h = time.getHours()
      var m = time.getMinutes()
      var s = time.getSeconds()

      // 检查是否小于10
      h = check(h)
      m = check(m)
      s = check(s)
      this.currentDate = year + '年' + month + '月' + day + '日  ' + h + ':' + m + ':' + s
    }, 1000)
  },
  methods: {
    confirm () {
      this.dialogData.title = '确定清空'
      this.dialogData.content = '清空之后将无法恢复，请小心确认！'
      this.dialogVisible = true
      this.dialogData.confirm = () => {
        alert('清除成功')
        this.dialogVisible = false
      }
    },
    upload () {
      this.dialogData.title = '确认上传'
      this.dialogData.content = '点击确认上传即可上传到服务器'
      this.dialogVisible = true
      this.dialogData.confirm = () => {
        let formData = {}
        formData.title = this.title
        formData.level = this.selectData
        formData.tags = this.dynamicTags
        formData.markdown = this.markdownData
        formData.date = this.currentDate
        console.log(formData)
        this.$axios.post(`${this.baseURL}/questions/insert`, formData).then(res => {
          if (res.data.status === '200') {
            this.$store.commit('dialogShow', {title: '提交成功', content: '', cancelText: '关闭'})
            setTimeout(() => {
              this.$router.go(0)
            }, 2000)
          } else {
            this.$store.commit('dialogShow', {title: res.data.message.title, content: res.data.message.content, cancelText: '关闭'})
          }
        })
        this.dialogVisible = false
      }
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    }
  }
}
</script>
<style lang="less" scoped>

@import '../assets/css/palette.less';

.title-input{
    width: 50%;
    border-radius: 0px;
    margin: 10px 0;
}
.mark-down{
    height: 85%;
}
.bottom-tool-box{
    color:@secondaryTextColor;
    line-height: 67px;
    padding-left: 25px;
}
.button-area{
    float: right;
    margin-right: 25px;
}
</style>
