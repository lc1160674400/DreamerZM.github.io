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
        _this.bgSpeed = 5;
        _this._rootView = root;
        _this._texture = textrue;
        _this._bg = new egret.Bitmap();
        _this._bg2 = new egret.Bitmap();
        _this._bg.texture = _this._texture.getTexture('bg2');
        _this._bg2.texture = _this._texture.getTexture('bg2');
        _this._bg.width = _this._rootView.stage.stageWidth;
        _this._bg2.width = _this._rootView.stage.stageWidth;
        _this._bg.height = _this._rootView.stage.stageHeight;
        _this._bg2.height = _this._rootView.stage.stageHeight;
        _this._bg.x = 0;
        _this._bg.y = 0;
        _this._bg2.x = 0;
        _this._bg2.y = -_this._rootView.stage.stageHeight + 10;
        _this._rootView.addChild(_this._bg);
        _this._rootView.addChild(_this._bg2);
        _this._rootView.addEventListener(egret.Event.ENTER_FRAME, function () {
            // 图片滚动            
            _this._bg.y += _this.bgSpeed;
            if (_this._bg.y > _this._rootView.stage.stageHeight) {
                _this._bg.y = (0 - _this._rootView.stage.stageHeight + 20);
            }
            _this._bg2.y += _this.bgSpeed;
            if (_this._bg2.y > _this._rootView.stage.stageHeight) {
                _this._bg2.y = (0 - _this._rootView.stage.stageHeight + 20);
            }
        }, _this);
        return _this;
    }
    return ViewManager;
}(egret.EventDispatcher));
__reflect(ViewManager.prototype, "ViewManager");
//# sourceMappingURL=ViewManager.js.map