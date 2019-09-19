<template>
    <div id="sidebar">
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="!isCollapse">
            <el-submenu v-for="(item,index) in sidebarData" :key="index" :index="index+''">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.title}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="index + '-' + childindex" v-for="(childitem,childindex) in item.items" :key="childindex" @click="goThere(childitem.href)">{{childitem.text}}</el-menu-item>
                    </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import config from '../config.js'
export default {
  name: 'sidebar',
  props: {
    activeItem: {
      type: String,
      validator: function (t) {
        let legal = false
        config.questionBankSideBarList.forEach(element => {
          element.items.forEach(ele => {
            if (ele.text === t) {
              legal = true
            }
          })
        })
        return legal
      }
    },
    sidebarData: {
      type: Array,
      validator: function (t) {
        let MIN_LENGTH = 1
        // 必须要有这个key值
        let REQUIRED_KEYS = ['items', 'title', 'icon']
        let legalLength = t.length > MIN_LENGTH
        let legalKeys = true
        t.forEach(parentElement => {
          REQUIRED_KEYS.forEach(childElement => {
            if (Object.keys(parentElement).indexOf(childElement) === -1) {
              legalKeys = false
            }
          })
        })
        return legalLength && legalKeys
      },
      default: function () {
        return config.questionBankSideBarList
      }
    }
  },
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    goThere (target) {
      console.log('跳转~')
      if (target) {
        this.$router.push(target)
      }
    }
  },
  computed: {
    activeIndex (activeItem) {
      let tempIndex = ''
      if (this.activeItem) {
        config.questionBankSideBarList.forEach((element, index1) => {
          element.items.forEach((ele, index2) => {
            if (ele.text === this.activeItem) {
              console.log(this.activeItem)
              tempIndex = index1 + '-' + index2
            }
          })
        })
      }
      return tempIndex
    }
  }
}
</script>
<style lang="less" scoped>
@import '../assets/css/palette.less';
#sidebar{
    height: 100%;
    width: 15%;
    display: inline-block;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
}
#sidebar ul{
    height: 100% !important;
    position: absolute;
}
.change-btn{
    position: absolute;
}
</style>
