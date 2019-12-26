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
    function Hero(option, bg, root) {
        var _this = _super.call(this) || this;
        /**
         * 玩家飞机属性
         */
        _this._moveSpeed = 10; // 飞机移动速度速度
        _this._fireSpeed = 400; // 开火间隔
        _this._bulletSpeed = 10; // 子弹飞行速度
        _this._rootView = root;
        _this._bg = bg;
        _this._location = [_this._rootView.stage.stageWidth / 2, _this._rootView.stage.stageHeight / 5 * 4];
        if (option.moveClip || option.bitMap) {
            if (option.moveClip) {
                _this._hero = option.moveClip;
                _this._hero.anchorOffsetX = _this._hero.width / 2;
                _this._hero.anchorOffsetY = _this._hero.height / 2;
                // 设置飞机刷新频率
                _this._hero.frameRate = _this._moveSpeed;
                // 设置飞机初始位置
                if (option.defaultLocation)
                    _this._location = option.defaultLocation;
                _this._rootView.addChild(option.moveClip);
                _a = _this._location, option.moveClip.x = _a[0], option.moveClip.y = _a[1];
                // 设置背景速度
                bg._speed = _this._moveSpeed / 2;
                bg._speed2 = _this._moveSpeed * 2;
            }
        }
        else {
            throw new Error('实例化参数option必须至少包含一个bitmap或者movieclip');
        }
        return _this;
        var _a;
    }
    Hero.prototype.setSpeed = function (speed) {
        this._moveSpeed = speed;
        this._bg._speed = this._moveSpeed / 2;
        this._bg._speed2 = this._moveSpeed * 2;
    };
    return Hero;
}(egret.EventDispatcher));
__reflect(Hero.prototype, "Hero");
//# sourceMappingURL=hero.js.map