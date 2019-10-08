
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
  showDialog: false,
  dialogOption: {
    title: '调用弹窗失败',
    content: '弹窗未初始化',
    cancelText: '关闭'
  },
  pageInfo: {
    title: '',
    activeItem: '',
    current: ''
  }
}

const mutations = {
  dialogShow (state, options) {
    if (typeof options !== 'object' || Object.keys(options).length === 0) {
      console.error('使用弹出框的时候请输入弹框参数，类型为Object')
    } else {
      state.dialogOption.title = options.title ? options.title : ''
      state.dialogOption.content = options.content ? options.content : ''
      state.dialogOption.cancelText = options.cancelText ? options.cancelText : '关闭'
    }
    state.showDialog = true
  },
  dialogHide (state) {
    state.showDialog = false
    setTimeout(
      () => {
        state.dialogOption.title = '调用弹窗失败'
        state.dialogOption.content = '弹窗未初始化'
        state.dialogOption.cancelText = '关闭'
      }, 1000
    )
  },
  PageInfo (state, options) {
    state.pageInfo.title = options.title ? options.title : ''
    state.pageInfo.activeItem = options.activeItem ? options.activeItem : ''
    state.pageInfo.current = options.current ? options.current : ''
  }
}

const actions = {
  setPageInfo (context, options) {
    setTimeout(() => {
      context.commit('PageInfo', options)
    })
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
