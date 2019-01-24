// pages/games/2048/2048.js

function nospace(board){
  for (var i = 0; i <= 3; i++) {
    for (var j = 0; j <= 3; j++) {
      if(board[i][j]==0){
        return false
      }
    }
  }
  return true
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:0,
    best:0,
    tellme:'KEEP FIGHTTING！',
    lastX: 0,
    lastY: 0,
    startX:0,
    startY:0,
    text: "没有滑动",
    borad:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gameInit();
    this.submitToCloud()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  /**
   * 手势识别
   */
  handletouchend: function (event) {
    // this.data.board.forEach({
    //   function(value,index,arr){
    //     value.forEach(
    //       function(value,index,arr){
            
    //       }
    //     )
    //   }
    // })
    //左右方向滑动
    var text = ''
    var tx = this.data.lastX-this.data.startX;
    var ty = this.data.lastY-this.data.startY;
    if (Math.abs(tx) > Math.abs(ty)) {
      if (tx < 0)
        text = "向左滑动"
      else if (tx > 0)
        text = "向右滑动"
    }
    //上下方向滑动
    else {
      if (ty < 0)
        text = "向上滑动"
      else if (ty > 0)
        text = "向下滑动"
    }
    console.log(text)
    
    if(text==='向右滑动'){
      this.moveRight(this.data.board)
      this.generateNumber()
    }else if(
      text === '向左滑动'
    ){
      this.moveLeft(this.data.board)
      this.generateNumber()
    } else if (
      text === '向上滑动'
    ) {
      this.moveUp(this.data.board)
      this.generateNumber()
    } else if (
      text === '向下滑动'
    ) {
      this.moveDown(this.data.board)
      this.generateNumber()
    }
    this.setData({
      best: this.data.score > this.data.best ? this.data.score : this.data.best
    })
    
  },

  //手指按下
  handletouchtart: function (event) {
    this.data.startX = event.touches[0].pageX
    this.data.startY = event.touches[0].pageY
  },
  handletouchmove:function(event){
    this.data.lastX = event.touches[0].pageX
    this.data.lastY = event.touches[0].pageY
  },


  gameInit:function(){
    //游戏初始化
    console.log('游戏初始化')
    var board = []
    //初始化游戏数组
    for(var i =0;i<=3;i++){
      board[i] = new Array();
      for(var j=0;j<=3;j++){
        board[i][j]=0;
      }
    }
    //初始化分数
    this.setData({
      score:0,
      board: board,
      best: wx.getStorageSync('best') ? wx.getStorageSync('best'):0
    }) 
    //生成随机两个数
    this.generateNumber()
    this.generateNumber()
  },

  generateNumber:function(){
    const that = this
    var board = this.data.board
    if (!nospace(this.data.board)){
      //随机生成一个位置
      var randx = parseInt(Math.floor(Math.random() * 4));
      var randy = parseInt(Math.floor(Math.random() * 4));
      //看是不是空格,优化随机
      var times = 0;
      while (times < 50) {
        if (board[randx][randy] == 0) {
          break;
        }
        //重复
        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));

        times++;
      }
      if (times == 50) {
        for (var i = 0; i < 4; i++) {
          for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
              randx = i;
              randy = j;
            }
          }
        }
      }
      var randNumber = Math.random() < 0.65 ? 2 : 4;
      // showNumberWithAnimation(randx, randy, randNumber);
      board[randx][randy] = randNumber;
      this.setData({
        board : board
      })
    }else{
      wx.setStorageSync('best', this.data.best)
      wx.showModal({
        title: '游戏结束',
        content: '无可移动方块，是否重新开始',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.gameInit()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    }
  },
  // moveRight:function(board){
  //   var temp_board = board
  //   for(var i =0;i<4 ;i++){
  //     for(var j=2;j>=0;j--){
  //       temp_board[i][j + 1] = temp_board[i][j + 1] == 0 ? temp_board[i][j] : temp_board[i][j + 1]
  //     }
  //   }
  //   this.setData({
  //     board:temp_board
  //   })
  //   console.log(this.data.temp_board)
  // }

moveRight:function(board){
  var score = 0
  for (var i=0;i<4;i++){
    var temp = 0
    var temp_list = []
    var is_zero = true
    var index = 3
    for(var j=3;j>=0;j--){
      temp_list[j] = 0;
      if (board[i][j] != 0 && is_zero){
        temp_list[index]=board[i][j]
        index--
        is_zero = false
      } else if (board[i][j] == temp_list[index + 1] && board[i][j]!=temp){
        score += board[i][j]
        temp_list[index+1] = board[i][j]+temp_list[index+1]
        temp = temp_list[index + 1]
      } else if ((board[i][j] != temp_list[index + 1] && board[i][j] != 0) || (board[i][j] == temp && temp != 0 )) {
        temp_list[index] = board[i][j]
        index--
      }else{
        temp_list[index] = 0
      }
    
    }
    board[i]= temp_list
  }
  this.setData({
    board:board,
    score: this.data.score + score
  })
},
  moveLeft: function (board) {
    var score = 0
    for (var i = 0; i < 4; i++) {
      var temp = 0
      var temp_list = []
      var is_zero = true
      var index = 0
      for (var j = 0; j <= 3; j++) {
        temp_list[j] = 0;
        if (board[i][j] != 0 && is_zero) {
          temp_list[index] = board[i][j]
          index++
          is_zero = false
        } else if (board[i][j] == temp_list[index - 1] && board[i][j] != temp) {
          temp_list[index - 1] = board[i][j] + temp_list[index - 1]
          score += board[i][j]
          temp = temp_list[index - 1]
        } else if ((board[i][j] != temp_list[index - 1] && board[i][j] != 0) || (board[i][j] == temp && temp != 0)) {
          temp_list[index] = board[i][j]
          index++
        } else {
          temp_list[index] = 0
        }

      }
      board[i] = temp_list
    }
    this.setData({
      board: board,
      score: this.data.score + score
    })
  },
  moveUp: function (board) {
    var score = 0
    for (var i = 0; i < 4; i++) {
      var temp = 0
      var temp_list = []
      var is_zero = true
      var index = 0
      for (var j = 0; j < 4; j++) {
        temp_list[j] = 0;
        if (board[j][i] != 0 && is_zero) {
          temp_list[index] = board[j][i]
          index++
          is_zero = false
        } else if (board[j][i] == temp_list[index - 1] && board[j][i] != temp) {
          temp_list[index - 1] = board[j][i] + temp_list[index - 1]
          score += board[j][i]
          temp = temp_list[index - 1]
        } else if ((board[j][i] != temp_list[index - 1] && board[j][i] != 0) || (board[j][i] == temp && temp != 0)) {
          temp_list[index] = board[j][i]
          index++
        } else {
          temp_list[index] = 0
        }

      }
      temp_list.forEach(function(value,index,arr){
        board[index][i] = value
      })
      // board[i] = temp_list
    }
    this.setData({
      board: board,
      score: this.data.score + score
    })
  },
  moveDown: function (board) {
    var score = 0
    for (var i = 0; i < 4; i++) {
      var temp = 0
      var temp_list = []
      var is_zero = true
      var index = 3
      for (var j = 3; j >= 0; j--) {
        temp_list[j] = 0;
        if (board[j][i] != 0 && is_zero) {
          temp_list[index] = board[j][i]
          index--
          is_zero = false
        } else if (board[j][i] == temp_list[index + 1] && board[j][i] != temp) {
          temp_list[index + 1] = board[j][i] + temp_list[index + 1]
          score += board[j][i]
          temp = temp_list[index + 1]
        } else if ((board[j][i] != temp_list[index + 1] && board[j][i] != 0) || (board[j][i] == temp && temp != 0)) {
          temp_list[index] = board[j][i]
          index--
        } else {
          temp_list[index] = 0
        }

      }
      temp_list.forEach(function (value, index, arr) {
        board[index][i] = value
      })
    }
    this.setData({
      board: board,
      score: this.data.score + score
    })
  },
/**
 * 重新开始游戏
 */
  newgame:function(){
    const that = this
    wx.showModal({
      title: '新游戏',
      content: '重新开始游戏？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.gameInit()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 将分数数据提交到微信服务器
   */
  submitToCloud:function(){
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth();//得到月份
    var date = now.getDate();//得到日期
    var day = now.getDay();//得到周几
    var hour = now.getHours();//得到小时
    var minu = now.getMinutes();//得到分钟
    var sec = now.getSeconds();//得到秒
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    var time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;

    var score = 100;//跳一跳分数
    var kvScore = { "key": "score", "value": score };
    wx.setUserCloudStroage({ "KVDataList": [kvScore] });
  }
})