var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero(root, texture) {
        var _this = _super.call(this) || this;
        _this._rootView = root;
        _this._src = texture;
        // this.hero = new egret.Bitmap();
        // this.hero.texture = this._src.getTexture('hero');
        var data = RES.getRes('tes_json');
        var temp = RES.getRes('tes_png');
        var mcDataFactory = new egret.MovieClipDataFactory(data, temp);
        _this.hero = new egret.MovieClip(mcDataFactory.generateMovieClipData("aircraft"));
        // this._rootView.addChild(this._action1)
        _this.hero.gotoAndPlay("fly", -1);
        _this.hero.x = (_this._rootView.stage.stageWidth - Hero.width) / 2;
        _this.hero.y = (_this._rootView.stage.stageHeight - Hero.height) / 4 * 3;
        _this._rootView.addChild(_this.hero);
        _this._timer = new egret.Timer(2000);
        _this._timer.addEventListener(egret.TimerEvent.TIMER, _this.timerFunc, _this);
        _this._timer.addEventListener(egret.TimerEvent.COMPLETE, _this.timerComplete, _this);
        _this._timer.start();
        return _this;
    }
    Hero.prototype.timerFunc = function () {
        var bullet = new Bullet(this._rootView);
        var x = this.hero.x + this.hero.width / 2 - 8;
        var y = this.hero.y - 25;
        bullet.Use(IdentityType.HERO, x, y);
    };
    Hero.prototype.timerComplete = function () {
        console.log(2);
    };
    Hero.width = 100;
    Hero.height = 124;
    return Hero;
}(egret.EventDispatcher));
__reflect(Hero.prototype, "Hero");
//# sourceMappingURL=Hero.js.map