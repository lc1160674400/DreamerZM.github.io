class Hero extends egret.EventDispatcher{
    private _rootView:egret.DisplayObjectContainer;
    private _bg:Background;
    public _hero:egret.Bitmap|egret.MovieClip;
    public _heroX:number;
    public _heroY:number;
    public _location:[number,number];

    /**
     * 玩家飞机属性
     */
    public _moveSpeed:number = 10;         // 飞机移动速度速度
    public _fireSpeed:number = 400;         // 开火间隔
    public _bulletSpeed:number = 10;         // 子弹飞行速度

    public constructor(option:{moveClip?:egret.MovieClip,bitMap?:egret.Bitmap,defaultLocation?:[number,number]},bg:Background,root:egret.DisplayObjectContainer){
        super();
        this._rootView = root;
        this._bg = bg;
        this._location = [this._rootView.stage.stageWidth/2,this._rootView.stage.stageHeight/5*4]
        if(option.moveClip || option.bitMap){
            if(option.moveClip){
                this._hero = option.moveClip
                this._hero.anchorOffsetX = this._hero.width/2;
                this._hero.anchorOffsetY = this._hero.height/2;
                // 设置飞机刷新频率
                this._hero.frameRate =  this._moveSpeed;

                // 设置飞机初始位置
                if(option.defaultLocation) this._location = option.defaultLocation;
                this._rootView.addChild(option.moveClip);
                [option.moveClip.x,option.moveClip.y] = this._location;

                // 设置背景速度
                bg._speed = this._moveSpeed/2;
                bg._speed2 = this._moveSpeed * 2;

            }
        }
        else{
            throw new Error('实例化参数option必须至少包含一个bitmap或者movieclip')
        }
    }

    public setSpeed(speed:number){
        this._moveSpeed = speed;
        this._bg._speed = this._moveSpeed /2;
        this._bg._speed2 = this._moveSpeed * 2;
        
    }
}