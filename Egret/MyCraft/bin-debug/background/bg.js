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
/**
 * 背景类，继承自EventDispatcher
 * 用来分发事件
 */
var Background = (function (_super) {
    __extends(Background, _super);
    function Background(bgBitmap, cover, root) {
        var _this = _super.call(this) || this;
        _this._speed = 5;
        _this._speed2 = 10;
        _this._bgBitmap = bgBitmap;
        _this._bgBitmap2 = new egret.Bitmap(bgBitmap.texture);
        _this._coverBitmap = cover;
        _this._coverBitmap2 = new egret.Bitmap(cover.texture);
        _this._rootView = root;
        Common.addToStage(_this._rootView, _this._bgBitmap, {
            x: 0,
            y: 0,
            width: _this._rootView.stage.stageWidth,
            height: _this._rootView.stage.stageHeight
        });
        Common.addToStage(_this._rootView, _this._bgBitmap2, {
            x: 0,
            y: -_this._rootView.stage.stageHeight,
            width: _this._rootView.stage.stageWidth,
            height: _this._rootView.stage.stageHeight
        });
        Common.addToStage(_this._rootView, _this._coverBitmap, {
            x: 0,
            y: 0,
            width: _this._rootView.stage.stageWidth,
            height: _this._rootView.stage.stageHeight
        });
        Common.addToStage(_this._rootView, _this._coverBitmap2, {
            x: 0,
            y: -_this._rootView.stage.stageHeight,
            width: _this._rootView.stage.stageWidth,
            height: _this._rootView.stage.stageHeight
        });
        _this._rootView.addEventListener(egret.Event.ENTER_FRAME, function () {
            // 背景以一定速度运行
            _this.frame(_this._speed);
        }, _this);
        return _this;
    }
    Background.prototype.frame = function (speed) {
        this._bgBitmap.y += speed;
        if (this._bgBitmap.y > this._rootView.stage.stageHeight) {
            this._bgBitmap.y = -this._rootView.stage.stageHeight + this._speed;
        }
        this._bgBitmap2.y += speed;
        if (this._bgBitmap2.y > this._rootView.stage.stageHeight) {
            this._bgBitmap2.y = -this._rootView.stage.stageHeight + this._speed;
        }
        this._coverBitmap.y += this._speed2;
        if (this._coverBitmap.y > this._rootView.stage.stageHeight) {
            this._coverBitmap.y = -this._rootView.stage.stageHeight + this._speed2;
        }
        this._coverBitmap2.y += this._speed2;
        if (this._coverBitmap2.y > this._rootView.stage.stageHeight) {
            this._coverBitmap2.y = -this._rootView.stage.stageHeight + this._speed2;
        }
    };
    return Background;
}(egret.EventDispatcher));
__reflect(Background.prototype, "Background");
//# sourceMappingURL=bg.js.map