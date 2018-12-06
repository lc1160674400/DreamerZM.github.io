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
    score:2048,
    best:2048,
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
    console.log(event)
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
    }
    
  },

  //手指按下
  handletouchtart: function (event) {
    console.log(event)
    this.data.startX = event.touches[0].pageX
    this.data.startY = event.touches[0].pageY
  },
  handletouchmove:function(event){
    console.log(event)
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
      board: board
    }) 
    //生成随机两个数
    this.generateNumber()
    this.generateNumber()
  },

  generateNumber:function(){
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
  console.log(board)
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
      } else if (board[i][j] != 0 && board[i][j] == temp_list[index+1]){
        console.log(index, board[i][j])
        temp_list[index + 1] += board[i][j]
        temp_list[index] = 0
      } else if (board[i][j] != 0 && board[i][j] != temp_list[index + 1]){
        temp_list[index] = board[i][j]
      } else{
        temp_list[index] = 0
      }
    
    }
    board[i]= temp_list
  }
  this.setData({
    board:board
  })
},
moveRight: function (board) {
  board=[
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [16,8,8,8]
        ]
  console.log(board)
  for (var i = 0; i < 4; i++) {
    var temp = 0
    var temp_list = []
    var is_zero = true
    var index = 3
    var is_plus = 0
    for (var j = 3; j >= 0; j--) {
      temp_list[j] = 0;
      if (board[i][j] != 0 && is_zero) {
        console.log(1,j)
        temp_list[index] = board[i][j]
        index--
        is_zero = false
      } else if (board[i][j] != 0 && board[i][j] == temp_list[index + 1] && is_plus != board[i][j]) {
        console.log(2,j)
        is_plus = board[i][j]
        temp_list[index + 1] += board[i][j]
        temp_list[index] = 0
        index--
      } else if (board[i][j] != 0 && board[i][j] == temp_list[index + 1] && is_plus == board[i][j]) {
        console.log(3, j)
        temp_list[index] = board[i][j]
      } else if (board[i][j] != 0 && board[i][j] != temp_list[index + 1]) {
        console.log(4, j, 'sasas', board[i][j])
        temp_list[index] = board[i][j]
      } else {
        temp_list[index] = 0
      }

    }
    board[i] = temp_list
  }
  this.setData({
    board: board
  })
}


})