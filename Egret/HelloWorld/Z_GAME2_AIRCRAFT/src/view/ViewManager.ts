class ViewManager extends egret.EventDispatcher{
    private _rootView:egret.DisplayObjectContainer;
    private _texture:egret.SpriteSheet;
    public constructor(root:egret.DisplayObjectContainer,textrue:egret.SpriteSheet){
        super()
        this._rootView = root;
        this._texture = textrue;

        var bg:egret.Bitmap = new egret.Bitmap();
        bg.texture = this._texture.getTexture('bg2');
        bg.width = this._rootView.stage.stageWidth;
        bg.height = this._rootView.stage.stageHeight;
        this._rootView.addChild(bg)
    }
}