class Rocker extends egret.EventDispatcher{
    private _backBitMap:egret.Bitmap;      // 摇杆背景图
    private _frontBitMap:egret.Bitmap;     // 摇杆前景图
    private _circalRadius:number = 50;       // 圆圈半径
    private _ballRadius:number = 15;         // 摇杆小球半径
    private _rootView:egret.DisplayObjectContainer; // 父容器
    private centerX:number;
    private centerY:number;
    private touchId:number;         // touchid
    private _movePoint:egret.Point = new egret.Point();     // 移动之后的位置
    private _startPoint:egret.Point;
    public constructor(root:egret.DisplayObjectContainer,frontBitMap:egret.Bitmap,backBitMap:egret.Bitmap){
        super()
        this._rootView = root;
        this._backBitMap = backBitMap;
        this._frontBitMap = frontBitMap;
        // this.centerX = this._rootView.stage.stageWidth / 4;
        // this.centerY = this._rootView.stage.stageHeight / 4 * 3;
        // this._backBitMap.x = this._frontBitMap.x = this.centerX;
        // this._backBitMap.y = this._frontBitMap.y = this.centerY;
        this._backBitMap.anchorOffsetX = this._backBitMap.width/2;      // 设置锚点为中心点
        this._frontBitMap.anchorOffsetX = this._frontBitMap.width/2;
        this._backBitMap.anchorOffsetY = this._backBitMap.height/2;
        this._frontBitMap.anchorOffsetY = this._frontBitMap.height/2;
        // this._rootView.addChild(this._backBitMap)
        // this._rootView.addChild(this._frontBitMap)
        this._rootView.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this)
        this._rootView.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this)
        this._rootView.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this)
    }    

    public onTouchBegin(event:egret.TouchEvent){
        this.touchId = event.touchPointID;
        this.centerX = event.stageX;
        this.centerY = event.stageY;
        if (this._startPoint == null)
                this._startPoint = new egret.Point();
        this._startPoint.x = event.stageX;
        this._startPoint.y = event.stageY;
        this._backBitMap.x = this.centerX;
        this._backBitMap.y = this.centerY;
        this._frontBitMap.x = this.centerX;
        this._frontBitMap.y = this.centerY;
        this._rootView.addChild(this._backBitMap);
        this._rootView.addChild(this._frontBitMap);
        this.dispatchEvent(new egret.Event("vj_start"));
    }

    public onTouchMove(event:egret.TouchEvent){
        this._movePoint.x = event.stageX;
        this._movePoint.y = event.stageY;
        var dist:number = egret.Point.distance(this._startPoint,this._movePoint);
        var angle:number = Math.atan2(event.stageY - this.centerY, event.stageX - this.centerX);
        if(dist <= this._circalRadius){
            this._frontBitMap.x = event.stageX;
            this._frontBitMap.y = event.stageY;
        }else{
            this._frontBitMap.x = Math.cos(angle)*(this._circalRadius - this._ballRadius) + this.centerX;
            this._frontBitMap.y = Math.sin(angle)*(this._circalRadius - this._ballRadius) + this.centerY;
        }
        //派发事件
        this.dispatchEventWith("vj_move", false, angle);
    }

    public onTouchEnd(event:egret.TouchEvent){
        if(this.touchId != event.touchPointID){
            return;
        }
        this._rootView.removeChild(this._backBitMap)
        this._rootView.removeChild(this._frontBitMap)
        this.dispatchEvent(new egret.Event("vj_end"));
    }
}