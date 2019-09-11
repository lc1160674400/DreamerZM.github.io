<template>
    <div id="index">
        <div id="up-block"></div>
        <div id="bottom-block"></div>
        <div id="title">
            ZMER
        </div>
        <div id="header">
            <div v-for="(item,index) in headerList" :key = index><span class="underline-text">{{item.title}}</span></div>
        </div>
        <div id="author" class="underline-text">
            ming.zhu @ 77
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      titleRotate: 0,
      headerList: [
        {
          title: 'Home',
          href: 'www..baidu.com'
        },
        {
          title: 'Article',
          href: 'www..baidu.com'
        },
        {
          title: 'Tool-Box',
          href: 'www..baidu.com'
        },
        {
          title: 'Blogs',
          href: 'www..baidu.com'
        },
        {
          title: 'Life',
          href: 'www..baidu.com'
        }
      ]
    }
  },
  mounted () {
    setTimeout(() => {
      let bottomDiv = document.getElementById('bottom-block')
      bottomDiv.style.marginTop = '34%'
    }, 1000)

    setTimeout(() => {
      let bottomDiv = document.getElementById('up-block')
      bottomDiv.style.left = '-130%'
    }, 1000)

    // setInterval(() => {
    //   this.titleRotate = this.titleRotate !== 360 ? this.titleRotate + 90 : 0
    //   let titleDiv = document.getElementById('title')
    //   titleDiv.style.transform = `rotate(${this.titleRotate}deg)`
    // }, 10000)
  }
}
</script>

<style scoped lang="less" >
@import '../assets/css/palette.less';
#index{
    width: 100%;
    height: 100%;
    background-color:@textPrimaryColor;
    text-align: center;
    position: relative;
}
#up-block{
    background: linear-gradient(@lightPrimaryColor, @dividerColor);
    position: absolute;
    top: 0;
    left: -350%;
    right: 0;
    bottom: 0;
    transform: rotate(-24deg);
    transition: left 2s;
    -moz-transition: left 2s; /* Firefox 4 */
    -webkit-transition: left 2s; /* Safari 和 Chrome */
    -o-transition: left 2s; /* Opera */
}

#bottom-block{
    background: linear-gradient(@dividerColor, @lightPrimaryColor);
    position: absolute;
    top: -10%;
    left: 10%;
    right: -18%;
    bottom: -37%;
    transform: rotate(-24deg);
    margin-top: 70%;
    transition: margin-top 2s;
    -moz-transition: margin-top 2s; /* Firefox 4 */
    -webkit-transition: margin-top 2s; /* Safari 和 Chrome */
    -o-transition: margin-top 2s; /* Opera */
}

#title{
    font-size: 376px;
    color: @textPrimaryColor;
    position: absolute;
    font-weight: 200;
    left: 0;
    right: 0;
    top: 0;
    transition: transform 2s;
}
#title:hover{
    transform: rotate(360deg);
}
#header{
    text-align: left;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin-left: 50px;
    margin-top: 50px;
    width: 300px;
}
#header span{
    font-family: fantasy;
    color: @textPrimaryColor;
    font-size: 30px;
    margin: 16px;
    display: inline-block;
    margin-top: 0;
    margin-bottom: -5px;
    border: 10px solid transparent;
    transition: margin 1s;
    -moz-transition: margin 2s; /* Firefox 4 */
    -webkit-transition: margin 2s; /* Safari 和 Chrome */
    -o-transition: margin 2s; /* Opera */
}
.underline-text:hover,#header span:hover{
    margin: 16px;
    display: inline-block;
    text-decoration: underline;
    transition: margin 1s;
}
#author{
    font-family: fantasy;
    position: absolute;
    color: #FFFFFF;
    bottom: 25px;
    right: 37px;
    font-size: 22px;
}
</style>
