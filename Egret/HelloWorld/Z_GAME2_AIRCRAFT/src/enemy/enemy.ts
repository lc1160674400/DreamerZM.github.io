// TypeScript file
class Enemy extends egret.EventDispatcher{
    public _blood:number;
    private _bitmap:egret.Bitmap | egret.MovieClip;
    private _rootview:egret.DisplayObjectContainer;
    private _speed:number = 5;
    public IsUse:boolean = true;
    private _enemyBoom:egret.MovieClip
    private _enemyConfig:EnemyConfig
    private _flyMovieClip:boolean;
    public constructor(root:egret.DisplayObjectContainer,boomOtion:EnemyConfig){
        super();
        this._enemyConfig = boomOtion;
        this._rootview = root;
        this._blood = this._enemyConfig.blood;
        this._flyMovieClip = this._enemyConfig.flyData !== undefined && this._enemyConfig.flyTemp !== undefined;
        console.log(this._flyMovieClip)
        // 如果没有同时配置敌人飞行的MovieClip则换成贴图
        if(!this._flyMovieClip){
            this._bitmap = new egret.Bitmap(this._enemyConfig.bitmapData)
            this._rootview.addChild(this._bitmap);
            // 如果有初始化敌人的坐标则取构造时传入的配置文件，如果没有取默认设置
            [this._bitmap.x,this._bitmap.y] = this._enemyConfig.beginLocation?this._enemyConfig.beginLocation:[this._rootview.stage.stageWidth/2,this._rootview.stage.stageHeight/15]
            this._bitmap.addEventListener(egret.Event.ENTER_FRAME,this.frame,this)
        }
        // 如果时有传入敌人的飞行的动画则飞行渲染动画
        else {
            var mcDataFactory = new egret.MovieClipDataFactory(this._enemyConfig.flyData,this._enemyConfig.flyTemp)
            this._bitmap = new egret.MovieClip(mcDataFactory.generateMovieClipData(this._enemyConfig.flyName))
             this._rootview.addChild(this._bitmap);
             this._bitmap.gotoAndPlay(this._enemyConfig.flyAction, -1);
            // 如果有初始化敌人的坐标则取构造时传入的配置文件，如果没有取默认设置
            [this._bitmap.x,this._bitmap.y] = this._enemyConfig.beginLocation?this._enemyConfig.beginLocation:[this._rootview.stage.stageWidth/2,this._rootview.stage.stageHeight/15]
            this._bitmap.addEventListener(egret.Event.ENTER_FRAME,this.frame,this)
        }
        //创建 Tween 对象
        egret.Tween.get(this._bitmap, {
            loop: true,//设置循环播放
            onChange: this.onChange,//设置更新函数
            onChangeObj: this//更新函数作用域
        })
            .to({y: this._rootview.stage.stageHeight}, 10000)//设置2000毫秒内 rotation 属性变为360
            .wait(1000)//设置等待1000毫秒
            .call(this.onComplete, this, ["param1", {key: "key", value: 3}]);//设置回调函数及作用域，可用于侦听动画完成
        
    }
    private onChange():void {
        egret.log("onChange");
    }

    private onComplete(param1:string, param2:any):void {
        egret.log("onComplete");
        egret.log(param1);
        egret.log(param2);
    }
    private removeEnemy(){
        this._enemyBoom.removeEventListener(egret.MovieClipEvent.COMPLETE,this.removeEnemy,this)
        this._rootview.removeChild(this._enemyBoom);
    }
    private frame(){
        // this._bitmap.y += this._speed;
        Object.keys(BulletCount.enemyBullet).forEach(index=>{
            
            var isHit:boolean = this._bitmap.hitTestPoint(BulletCount.enemyBullet[index].x,BulletCount.enemyBullet[index].y)
            if(isHit){
                BulletCount.enemyBullet[index].Recycle()
                this._blood --;
                if(!this._blood){
                    //如果没血了，飞机挂掉，换贴图
                    if(this._bitmap.parent){
                        var data = this._enemyConfig.boomData;
                        var temp = this._enemyConfig.boomTemp;
                        var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, temp);
                        this._enemyBoom = new egret.MovieClip(mcDataFactory.generateMovieClipData(this._enemyConfig.boomName));
                        this._enemyBoom.x = this._bitmap.x;
                        this._enemyBoom.y = this._bitmap.y;
                        this._bitmap.parent.removeChild(this._bitmap);
                        this._rootview.addChild(this._enemyBoom)
                        this._enemyBoom.gotoAndPlay(this._enemyConfig.boomAction, this._enemyConfig.loopTimes);
                        this._enemyBoom.addEventListener(egret.MovieClipEvent.COMPLETE,this.removeEnemy,this)                        
                    }
                }
            }
    })
        // if(this.IsUse){
        //     if(this.)
        // }
    }
    private hitCheck(){

    }
}