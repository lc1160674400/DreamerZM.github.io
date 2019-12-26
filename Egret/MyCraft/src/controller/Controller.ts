/**
 * 摇杆类
 */

class Controller extends egret.EventDispatcher {
    private _options:{back:egret.Bitmap,front:egret.Bitmap}
    private _rootView:egret.DisplayObjectContainer
    private _touchBeginLocation:[number,number]
    private _moveLocation:[number,number]
    private _target:Hero;
    private _speedX:number = 0;
    private _speedY:number = 0;
    public constructor (option:{back:egret.Bitmap,front:egret.Bitmap},target:Hero,root:egret.DisplayObjectContainer){
        super()
        this._options = option;
        this._rootView = root;
        this._target = target;
        this._options.back.anchorOffsetX = this._options.back.width/2;
        this._options.back.anchorOffsetY = this._options.back.height/2;
        this._options.front.anchorOffsetX = this._options.front.width/2;
        this._options.front.anchorOffsetY = this._options.front.height/2;
        this._rootView.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.ControllerListennerBegin,this)
        this._rootView.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.ControllerListennerEnd,this)
        this._rootView.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.ControllerListennerMove,this)
    }
    public createController(x:number,y:number){
        this._touchBeginLocation = [x,y]
        this._rootView.addChild(this._options.back);
        this._rootView.addChild(this._options.front);
        this._options.back.x =  x;
        this._options.front.x = x;
        this._options.front.y = y;
        this._options.back.y = y;
    }
    public removeController(){
        this._rootView.removeChild(this._options.front);
        this._rootView.removeChild(this._options.back);
    }

    // 监听按下事件
    private ControllerListennerBegin (event:egret.TouchEvent){
        var x = event.stageX;
        var y = event.stageY;
        this.createController(x,y)
        this._rootView.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }

    // 监听抬起事件
    private ControllerListennerEnd (){
        this._rootView.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.removeController()
    }

    // 监听移动事件
    private ControllerListennerMove(event:egret.TouchEvent){
        this._moveLocation = [event.localX,event.localY]
        var startPoint = new egret.Point(this._touchBeginLocation[0],this._touchBeginLocation[1])
        var movePoint = new egret.Point(this._moveLocation[0],this._moveLocation[1])
        var dist:number = egret.Point.distance(startPoint,movePoint);
        var angle:number = Math.atan2(event.stageY - this._touchBeginLocation[1], event.stageX - this._touchBeginLocation[0]);
        var _circalRadius = this._options.back.width/2;
        var _ballRadius = this._options.front.width/2;
        if(dist <= _circalRadius){
            this._options.front.x = event.stageX;
            this._options.front.y = event.stageY;
        }else{
            this._options.front.x = Math.cos(angle)*(_circalRadius - _ballRadius) + this._touchBeginLocation[0];
            this._options.front.y = Math.sin(angle)*(_circalRadius - _ballRadius) + this._touchBeginLocation[1];
        }
        this._speedX = Math.cos(angle)*this._target._moveSpeed;
        this._speedY = Math.sin(angle)*this._target._moveSpeed;
    }

    // 逐帧动画函数
    private onEnterFrame (){
        this._target._hero.x += this._speedX;
        this._target._hero.y += this._speedY;
        this._target._hero.x = this._target._hero.x<0?0:this._target._hero.x
        this._target._hero.y = this._target._hero.y<0?0:this._target._hero.y
        this._target._hero.x = this._target._hero.x>this._rootView.stage.stageWidth-50?this._rootView.stage.stageWidth-50:this._target._hero.x
        this._target._hero.y = this._target._hero.y>this._rootView.stage.stageHeight-50?this._rootView.stage.stageHeight-50:this._target._hero.y
    }
}