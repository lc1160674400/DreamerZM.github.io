class Hero {
    private _src:egret.SpriteSheet
    private _rootView:egret.DisplayObjectContainer
    private static width:number = 100;
    private static height:number = 124;
    public constructor(root:egret.DisplayObjectContainer,texture:egret.SpriteSheet){
        this._rootView = root;
        this._src = texture;
        var hreo:egret.Bitmap = new egret.Bitmap();
        hreo.texture = this._src.getTexture('hero');
        hreo.x = (this._rootView.stage.stageWidth - Hero.width) / 2;
        hreo.y = (this._rootView.stage.stageHeight - Hero.height) / 2;
        this._rootView.addChild(hreo)
    }
}