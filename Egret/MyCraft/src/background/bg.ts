/**
 * 背景类，继承自EventDispatcher 
 * 用来分发事件
 */
class Background extends egret.EventDispatcher{
    //变量声明
    public _bgBitmap:egret.Bitmap;
    public _bgBitmap2:egret.Bitmap;
    public _rootView:egret.DisplayObjectContainer;
    public _coverBitmap:egret.Bitmap
    private _coverBitmap2:egret.Bitmap
    public _speed:number = 5;
    public _speed2:number = 10;
    public constructor(bgBitmap:egret.Bitmap,cover:egret.Bitmap,root:egret.DisplayObjectContainer){
        super()
        this._bgBitmap = bgBitmap;
        this._bgBitmap2 = new egret.Bitmap(bgBitmap.texture);
        this._coverBitmap = cover;
        this._coverBitmap2 = new egret.Bitmap(cover.texture);
        this._rootView = root;
        Common.addToStage(this._rootView,this._bgBitmap,{
            x:0,
            y:0,
            width:this._rootView.stage.stageWidth,
            height:this._rootView.stage.stageHeight
        })
        Common.addToStage(this._rootView,this._bgBitmap2,{
            x:0,
            y:-this._rootView.stage.stageHeight,
            width:this._rootView.stage.stageWidth,
            height:this._rootView.stage.stageHeight
        })
        Common.addToStage(this._rootView,this._coverBitmap,{
            x:0,
            y:0,
            width:this._rootView.stage.stageWidth,
            height:this._rootView.stage.stageHeight
        })
        Common.addToStage(this._rootView,this._coverBitmap2,{
            x:0,
            y:-this._rootView.stage.stageHeight,
            width:this._rootView.stage.stageWidth,
            height:this._rootView.stage.stageHeight
        })
        this._rootView.addEventListener(egret.Event.ENTER_FRAME,()=>{
            // 背景以一定速度运行
            this.frame(this._speed)
        },this)
    }
    private frame(speed:number){
        this._bgBitmap.y += speed;
        if(this._bgBitmap.y > this._rootView.stage.stageHeight){
            this._bgBitmap.y = - this._rootView.stage.stageHeight + this._speed; 
        }
        this._bgBitmap2.y += speed;
        if(this._bgBitmap2.y > this._rootView.stage.stageHeight){
            this._bgBitmap2.y = - this._rootView.stage.stageHeight + this._speed; 
        }

        this._coverBitmap.y += this._speed2;
        if(this._coverBitmap.y > this._rootView.stage.stageHeight){
            this._coverBitmap.y = - this._rootView.stage.stageHeight + this._speed2; 
        }
        this._coverBitmap2.y += this._speed2;
        if(this._coverBitmap2.y > this._rootView.stage.stageHeight){
            this._coverBitmap2.y = - this._rootView.stage.stageHeight + this._speed2; 
        }
    }


    



}