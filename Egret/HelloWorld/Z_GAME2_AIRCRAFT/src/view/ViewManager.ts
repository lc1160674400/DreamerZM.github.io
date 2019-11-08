class ViewManager extends egret.EventDispatcher{
    private _rootView:egret.DisplayObjectContainer;
    private _texture:egret.SpriteSheet;
    private _bg:egret.Bitmap;
    private _bg2:egret.Bitmap;
    private bgSpeed:number = 5;
    public constructor(root:egret.DisplayObjectContainer,textrue:egret.SpriteSheet){
        super()
        this._rootView = root;
        this._texture = textrue;

        this._bg = new egret.Bitmap();
        this._bg2 = new egret.Bitmap();
        this._bg.texture = this._texture.getTexture('bg2');
        this._bg2.texture = this._texture.getTexture('bg2')
        this._bg.width = this._rootView.stage.stageWidth;
        this._bg2.width = this._rootView.stage.stageWidth;
        this._bg.height = this._rootView.stage.stageHeight;
        this._bg2.height = this._rootView.stage.stageHeight;
        this._bg.x = 0;
        this._bg.y = 0;
        this._bg2.x = 0;
        this._bg2.y = - this._rootView.stage.stageHeight + 10;
        this._rootView.addChild(this._bg)
        this._rootView.addChild(this._bg2)
        this._rootView.addEventListener(egret.Event.ENTER_FRAME,()=>{
            // 图片滚动            
            this._bg.y += this.bgSpeed;
            if (this._bg.y > this._rootView.stage.stageHeight) {
                this._bg.y = (0 - this._rootView.stage.stageHeight + 20)
            }
            this._bg2.y += this.bgSpeed;
            if (this._bg2.y > this._rootView.stage.stageHeight) {
                this._bg2.y = (0 - this._rootView.stage.stageHeight + 20)
            }
        },this)
    }
}