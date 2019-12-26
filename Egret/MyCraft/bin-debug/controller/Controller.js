/**
 * 摇杆类
 */
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
var Controller = (function (_super) {
    __extends(Controller, _super);
    function Controller(option, target, root) {
        var _this = _super.call(this) || this;
        _this._speedX = 0;
        _this._speedY = 0;
        _this._options = option;
        _this._rootView = root;
        _this._target = target;
        _this._options.back.anchorOffsetX = _this._options.back.width / 2;
        _this._options.back.anchorOffsetY = _this._options.back.height / 2;
        _this._options.front.anchorOffsetX = _this._options.front.width / 2;
        _this._options.front.anchorOffsetY = _this._options.front.height / 2;
        _this._rootView.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.ControllerListennerBegin, _this);
        _this._rootView.stage.addEventListener(egret.TouchEvent.TOUCH_END, _this.ControllerListennerEnd, _this);
        _this._rootView.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.ControllerListennerMove, _this);
        return _this;
    }
    Controller.prototype.createController = function (x, y) {
        this._touchBeginLocation = [x, y];
        this._rootView.addChild(this._options.back);
        this._rootView.addChild(this._options.front);
        this._options.back.x = x;
        this._options.front.x = x;
        this._options.front.y = y;
        this._options.back.y = y;
    };
    Controller.prototype.removeController = function () {
        this._rootView.removeChild(this._options.front);
        this._rootView.removeChild(this._options.back);
    };
    // 监听按下事件
    Controller.prototype.ControllerListennerBegin = function (event) {
        var x = event.stageX;
        var y = event.stageY;
        this.createController(x, y);
        this._rootView.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    // 监听抬起事件
    Controller.prototype.ControllerListennerEnd = function () {
        this._rootView.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.removeController();
    };
    // 监听移动事件
    Controller.prototype.ControllerListennerMove = function (event) {
        this._moveLocation = [event.localX, event.localY];
        var startPoint = new egret.Point(this._touchBeginLocation[0], this._touchBeginLocation[1]);
        var movePoint = new egret.Point(this._moveLocation[0], this._moveLocation[1]);
        var dist = egret.Point.distance(startPoint, movePoint);
        var angle = Math.atan2(event.stageY - this._touchBeginLocation[1], event.stageX - this._touchBeginLocation[0]);
        var _circalRadius = this._options.back.width / 2;
        var _ballRadius = this._options.front.width / 2;
        if (dist <= _circalRadius) {
            this._options.front.x = event.stageX;
            this._options.front.y = event.stageY;
        }
        else {
            this._options.front.x = Math.cos(angle) * (_circalRadius - _ballRadius) + this._touchBeginLocation[0];
            this._options.front.y = Math.sin(angle) * (_circalRadius - _ballRadius) + this._touchBeginLocation[1];
        }
        this._speedX = Math.cos(angle) * this._target._moveSpeed;
        this._speedY = Math.sin(angle) * this._target._moveSpeed;
    };
    // 逐帧动画函数
    Controller.prototype.onEnterFrame = function () {
        this._target._hero.x += this._speedX;
        this._target._hero.y += this._speedY;
        this._target._hero.x = this._target._hero.x < 0 ? 0 : this._target._hero.x;
        this._target._hero.y = this._target._hero.y < 0 ? 0 : this._target._hero.y;
        this._target._hero.x = this._target._hero.x > this._rootView.stage.stageWidth - 50 ? this._rootView.stage.stageWidth - 50 : this._target._hero.x;
        this._target._hero.y = this._target._hero.y > this._rootView.stage.stageHeight - 50 ? this._rootView.stage.stageHeight - 50 : this._target._hero.y;
    };
    return Controller;
}(egret.EventDispatcher));
__reflect(Controller.prototype, "Controller");
//# sourceMappingURL=Controller.js.map