class Rocker {
    private _backBitMap:egret.Bitmap;      // 摇杆背景图
    private _frontBitMap:egret.Bitmap;     // 摇杆前景图
    private _circalRadius:number;       // 圆圈半径
    private _ballRadius:number;         // 摇杆小球半径
    private _rootView:egret.DisplayObjectContainer; // 父容器
    private centerX:number;
    private centerY:number;
    public constructor(root:egret.DisplayObjectContainer,frontBitMap:egret.Bitmap,backBitMap:egret.Bitmap){
        this._rootView = root;
        this._backBitMap = backBitMap;
        this._frontBitMap = frontBitMap;
        this.centerX = this._rootView.stage.stageWidth / 4;
        this.centerY = this._rootView.stage.stageHeight / 4 * 3;
        this._backBitMap.x = this._frontBitMap.x = this.centerX;
        this._backBitMap.y = this._frontBitMap.y = this.centerY;
        this._backBitMap.anchorOffsetX = this._backBitMap.width/2;      // 设置锚点为中心点
        this._frontBitMap.anchorOffsetX = this._frontBitMap.width/2;
        this._backBitMap.anchorOffsetY = this._backBitMap.height/2;
        this._frontBitMap.anchorOffsetY = this._frontBitMap.height/2;
        this._rootView.addChild(this._backBitMap)
        this._rootView.addChild(this._frontBitMap)
    }    
}