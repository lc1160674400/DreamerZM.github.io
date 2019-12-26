class Enemy extends egret.DisplayObjectContainer{
    private _rootView:egret.DisplayObjectContainer;
    // 开放属性
    
    public _enemy:egret.Bitmap|egret.MovieClip;         // 敌机贴图
    public _speed:number = 1;                               // 飞行速度
    public _blood:number = 20;                               // 血量
    public _location:[number,number]                        // 刷新坐标
    public _label:egret.TextField                           // 血量显示
    private _sizeStandar:number = 10                         // 设置标准血量
    public _endAction:egret.MovieClip

    public constructor(content:egret.Bitmap|egret.MovieClip,endAction:egret.MovieClip,root:egret.DisplayObjectContainer,speed?:number,blood?:number){
        super()
        this._enemy = content;
        this._rootView = root;
        this._endAction = endAction;
        if(blood) this._blood = blood
        if(speed) this._speed = speed
        this._enemy.anchorOffsetX = this._enemy.width/2;
        this._enemy.anchorOffsetY = this._enemy.height/2;
        this._endAction.width = this._enemy.width;
        this._endAction.height = this._enemy.height;
        this._endAction.anchorOffsetX = this._endAction.width/2;
        this._endAction.anchorOffsetY = this._endAction.height/2;
        this.addChild(this._enemy);
        this._rootView.addChild(this)
        var randomX = Math.round(Math.random()*this._rootView.stage.stageWidth)
        this._location = [randomX,this._enemy.height]
        this.setLocation() 
        this.changeSizeByBlood()
        this.createBloodNumber()
        this._enemy.addEventListener(egret.Event.ENTER_FRAME,this.frame,this)
        console.log(this._speed)
    }

    // 逐帧动画
    private frame(){
        if(this._enemy.y>this._rootView.stage.stageHeight){
            this.Recycle()
        }else{
            Object.keys(HeroBullet._count).forEach(index => {
                var isHit:boolean = this._enemy.hitTestPoint(HeroBullet._count[index]._content.x,HeroBullet._count[index]._content.y)
                // 如果有子弹击中
                if(isHit){
                    HeroBullet._count[index].Recycle();
                    this._blood --;
                    if(this._blood == 0){
                        // 如果没血了
                        // ShakeTool.getInstance().shakeObj(this._enemy, 1, 20, 20);
                        this._enemy.removeEventListener(egret.Event.ENTER_FRAME,this.frame,this)
                        // this._enemy = this._endAction;
                        this._endAction.x = this._enemy.x;
                        this._endAction.y = this._enemy.y;
                        this.removeChild(this._enemy)
                        this.removeChild(this._label);
                        this.addChild(this._endAction)
                        this._endAction.gotoAndPlay('start',1)
                        this._endAction.addEventListener(egret.Event.COMPLETE,()=>{
                            this.Recycle();
                        },this)
                        // setTimeout(()=>{
                        //     this.Recycle()
                        // }, 2000);
                        
                    }else {
                        ShakeTool.getInstance().shakeObj(this, 1, 10, 10);
                        this.setLocation();
                        this.changeSizeByBlood();
                        this.setLable();
                    }
                }
            })
        }
    }

    // 回收方法
    public Recycle(){
        this._enemy.removeEventListener(egret.Event.ENTER_FRAME,this.frame,this)
        if(this._rootView){
            try{
                this.removeChild(this._enemy);
            }catch(e){

            }
            try{
                this.removeChild(this._label);
            }catch(e){

            }
            try{
                this.removeChild(this._endAction);
            }catch(e){

            }
            this._rootView.removeChild(this)
        }
    }

    // 设置位置
    public setLocation(){
        this._enemy.x = this._location[0];
        this._enemy.y = this._location[1];
    }

    // 根据血量设置飞机大小
    public changeSizeByBlood(){
        this._enemy.scaleX = this._blood/this._sizeStandar > 1 ? this._blood/this._sizeStandar:1;
        this._enemy.scaleY = this._blood/this._sizeStandar > 1 ? this._blood/this._sizeStandar:1;
    }

    public setLable(){
        this._label.text = this._blood + '';
        if(this._blood > this._sizeStandar) this._label.size = 30 * (this._blood/this._sizeStandar < 1 ? this._blood/this._sizeStandar:1)
        this._label.anchorOffsetX = this._label.width/2;
        this._label.anchorOffsetY = this._label.height/2;
        this._label.x = this._location[0];
        this._label.y = this._location[1];
    }
    // 血量显示
    public createBloodNumber(){
         //创建 TextField 对象
        this._label = new egret.TextField();
        //设置显示背景
        this._label.background = true;
        //设置背景颜色
        this._label.backgroundColor = 0xffffff;
        //设置显示边框
        this._label.border = true;
        //设置边框颜色
        this._label.borderColor = 0x00ff00;
        //设置字体
        this._label.fontFamily = "Arial";
        //设置文本颜色
        this._label.textColor = 0xFF0000;
        //设置字号
        this._label.size = 30;
        //设置显示文本
        this._label.text = this._blood+'';
        this._label.anchorOffsetX = this._label.width/2;
        this._label.anchorOffsetY = this._label.height/2;
        this._label.x = this._location[0];
        this._label.y = this._location[1];
        //添加到显示列表
        this.addChild(this._label);
    }
}