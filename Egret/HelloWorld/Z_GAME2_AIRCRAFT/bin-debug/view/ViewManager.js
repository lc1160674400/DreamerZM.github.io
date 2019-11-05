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
var ViewManager = (function (_super) {
    __extends(ViewManager, _super);
    function ViewManager(root, textrue) {
        var _this = _super.call(this) || this;
        _this._rootView = root;
        _this._texture = textrue;
        var bg = new egret.Bitmap();
        bg.texture = _this._texture.getTexture('bg2');
        bg.width = _this._rootView.stage.stageWidth;
        bg.height = _this._rootView.stage.stageHeight;
        _this._rootView.addChild(bg);
        return _this;
    }
    return ViewManager;
}(egret.EventDispatcher));
__reflect(ViewManager.prototype, "ViewManager");
//# sourceMappingURL=ViewManager.js.map