export default {
  questionBankSideBarList: [
    {
      title: '题库',
      icon: 'el-icon-odometer',
      items: [
        {
          text: '初级题库',
          href: 'questionbank-base',
          params: {
            level: 'base'
          }
        }, {
          text: '中级题库',
          href: 'questionbank-middle',
          params: {
            level: 'middle'
          }
        },
        {
          text: '上传题目',
          href: 'updatequestion'
        }, {
          text: '上传随笔',
          href: 'uploadMarkDown'
        }
      ]
    },
    {
      title: '个人空间',
      icon: 'el-icon-s-promotion',
      items: [
        {
          text: '日常笔记',
          href: 'updatequestionbyhand'
        }
      ]
    },
    {
      title: '其他内容',
      icon: 'el-icon-setting',
      items: [
        {
          text: '日常笔记',
          href: 'updatequestionbyhand'
        }
      ]
    }
  ]
}
