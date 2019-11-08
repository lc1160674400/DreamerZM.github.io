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
var Rocker = (function (_super) {
    __extends(Rocker, _super);
    function Rocker(root, frontBitMap, backBitMap) {
        var _this = _super.call(this) || this;
        _this._circalRadius = 50; // 圆圈半径
        _this._ballRadius = 15; // 摇杆小球半径
        _this._movePoint = new egret.Point(); // 移动之后的位置
        _this._rootView = root;
        _this._backBitMap = backBitMap;
        _this._frontBitMap = frontBitMap;
        // this.centerX = this._rootView.stage.stageWidth / 4;
        // this.centerY = this._rootView.stage.stageHeight / 4 * 3;
        // this._backBitMap.x = this._frontBitMap.x = this.centerX;
        // this._backBitMap.y = this._frontBitMap.y = this.centerY;
        _this._backBitMap.anchorOffsetX = _this._backBitMap.width / 2; // 设置锚点为中心点
        _this._frontBitMap.anchorOffsetX = _this._frontBitMap.width / 2;
        _this._backBitMap.anchorOffsetY = _this._backBitMap.height / 2;
        _this._frontBitMap.anchorOffsetY = _this._frontBitMap.height / 2;
        // this._rootView.addChild(this._backBitMap)
        // this._rootView.addChild(this._frontBitMap)
        _this._rootView.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
        _this._rootView.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onTouchMove, _this);
        _this._rootView.stage.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchEnd, _this);
        return _this;
    }
    Rocker.prototype.onTouchBegin = function (event) {
        this.touchId = event.touchPointID;
        this.centerX = event.stageX;
        this.centerY = event.stageY;
        if (this._startPoint == null)
            this._startPoint = new egret.Point();
        this._startPoint.x = event.stageX;
        this._startPoint.y = event.stageY;
        this._backBitMap.x = this.centerX;
        this._backBitMap.y = this.centerY;
        this._frontBitMap.x = this.centerX;
        this._frontBitMap.y = this.centerY;
        this._rootView.addChild(this._backBitMap);
        this._rootView.addChild(this._frontBitMap);
        this.dispatchEvent(new egret.Event("vj_start"));
    };
    Rocker.prototype.onTouchMove = function (event) {
        this._movePoint.x = event.stageX;
        this._movePoint.y = event.stageY;
        var dist = egret.Point.distance(this._startPoint, this._movePoint);
        var angle = Math.atan2(event.stageY - this.centerY, event.stageX - this.centerX);
        if (dist <= this._circalRadius) {
            this._frontBitMap.x = event.stageX;
            this._frontBitMap.y = event.stageY;
        }
        else {
            this._frontBitMap.x = Math.cos(angle) * (this._circalRadius - this._ballRadius) + this.centerX;
            this._frontBitMap.y = Math.sin(angle) * (this._circalRadius - this._ballRadius) + this.centerY;
        }
        //派发事件
        this.dispatchEventWith("vj_move", false, angle);
    };
    Rocker.prototype.onTouchEnd = function (event) {
        if (this.touchId != event.touchPointID) {
            return;
        }
        this._rootView.removeChild(this._backBitMap);
        this._rootView.removeChild(this._frontBitMap);
        this.dispatchEvent(new egret.Event("vj_end"));
    };
    return Rocker;
}(egret.EventDispatcher));
__reflect(Rocker.prototype, "Rocker");
//# sourceMappingURL=Rocker.js.map