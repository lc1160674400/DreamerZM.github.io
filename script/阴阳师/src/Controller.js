function Controller(option){
    this.init()    
}

Controller.prototype = {
    constructor:Controller,
    init:function(){
        console.log(' rending UI ');
        var window = floaty.window(
            <vertical w="500" h="300dp" bg="#000000" alpha="1" weightSum="30" id="mainContainer">
                
                <horizontal bg="#ff0000" h='30'>
                    <button gravity="left" w="30" h='*' id="closeBtn"> x </button>
                    <text h="13" text="结界突破" textColor="white" textSize="13sp" w='*' gravity='center'/>
                </horizontal>
                
                <horizontal id='brokerItem'>
                    <text text="设置次数" w="60"/>
                    <input inputType="number" w='40' textSizeHint="10sp" textColorHint="#77ffffff" id="brokerTimes" text="10"></input>
                    <button style="Widget.AppCompat.Button.Colored" w="50" h='35' marginLeft="20" id="brokerStart">开始</button>
                </horizontal>
                <text text="经验怪" bg="#00ff00"/>
                <text text="御魂" bg="#0000ff"/>
                
            </vertical>
        );


        var execution = null;

        //记录按键被按下时的触摸坐标
        var x = 0, y = 0;
        //记录按键被按下时的悬浮窗位置
        var windowX, windowY;
        //记录按键被按下的时间以便判断长按等动作
        var downTime;


        // 关闭按钮事件
        window.closeBtn.setOnTouchListener(function(view, event){
            switch(event.getAction()){
                case event.ACTION_DOWN:
                    x = event.getRawX();
                    y = event.getRawY();
                    windowX = window.getX();
                    windowY = window.getY();
                    downTime = new Date().getTime();
                    return true;
                case event.ACTION_MOVE:
                    //移动手指时调整悬浮窗位置
                    window.setPosition(windowX + (event.getRawX() - x),
                        windowY + (event.getRawY() - y));
                    //如果按下的时间超过1.5秒判断为长按，退出脚本
                    if(new Date().getTime() - downTime > 1500){
                        exit();
                    }
                    return true;
                case event.ACTION_UP:
                    //手指弹起时如果偏移很小则判断为点击
                    if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
                        window.setAdjustEnabled(!window.isAdjustEnabled());
                    }
                    return true;
            }
            return true;
        });
    }
}

module.exports = Controller