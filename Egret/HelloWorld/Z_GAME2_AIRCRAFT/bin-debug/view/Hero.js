var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Hero = (function () {
    function Hero(root, texture) {
        this._rootView = root;
        this._src = texture;
        var hreo = new egret.Bitmap();
        hreo.texture = this._src.getTexture('hero');
        hreo.x = (this._rootView.stage.stageWidth - Hero.width) / 2;
        hreo.y = (this._rootView.stage.stageHeight - Hero.height) / 2;
        this._rootView.addChild(hreo);
    }
    Hero.width = 100;
    Hero.height = 124;
    return Hero;
}());
__reflect(Hero.prototype, "Hero");
//# sourceMappingURL=Hero.js.map