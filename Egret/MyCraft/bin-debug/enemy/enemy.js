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
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(content, endAction, root, speed, blood) {
        var _this = _super.call(this) || this;
        _this._speed = 1; // 飞行速度
        _this._blood = 20; // 血量
        _this._sizeStandar = 10; // 设置标准血量
        _this._enemy = content;
        _this._rootView = root;
        _this._endAction = endAction;
        if (blood)
            _this._blood = blood;
        if (speed)
            _this._speed = speed;
        _this._enemy.anchorOffsetX = _this._enemy.width / 2;
        _this._enemy.anchorOffsetY = _this._enemy.height / 2;
        _this._endAction.width = _this._enemy.width;
        _this._endAction.height = _this._enemy.height;
        _this._endAction.anchorOffsetX = _this._endAction.width / 2;
        _this._endAction.anchorOffsetY = _this._endAction.height / 2;
        _this.addChild(_this._enemy);
        _this._rootView.addChild(_this);
        var randomX = Math.round(Math.random() * _this._rootView.stage.stageWidth);
        _this._location = [randomX, _this._enemy.height];
        _this.setLocation();
        _this.changeSizeByBlood();
        _this.createBloodNumber();
        _this._enemy.addEventListener(egret.Event.ENTER_FRAME, _this.frame, _this);
        console.log(_this._speed);
        return _this;
    }
    // 逐帧动画
    Enemy.prototype.frame = function () {
        var _this = this;
        if (this._enemy.y > this._rootView.stage.stageHeight) {
            this.Recycle();
        }
        else {
            Object.keys(HeroBullet._count).forEach(function (index) {
                var isHit = _this._enemy.hitTestPoint(HeroBullet._count[index]._content.x, HeroBullet._count[index]._content.y);
                // 如果有子弹击中
                if (isHit) {
                    HeroBullet._count[index].Recycle();
                    _this._blood--;
                    if (_this._blood == 0) {
                        // 如果没血了
                        // ShakeTool.getInstance().shakeObj(this._enemy, 1, 20, 20);
                        _this._enemy.removeEventListener(egret.Event.ENTER_FRAME, _this.frame, _this);
                        // this._enemy = this._endAction;
                        _this._endAction.x = _this._enemy.x;
                        _this._endAction.y = _this._enemy.y;
                        _this.removeChild(_this._enemy);
                        _this.removeChild(_this._label);
                        _this.addChild(_this._endAction);
                        _this._endAction.gotoAndPlay('start', 1);
                        _this._endAction.addEventListener(egret.Event.COMPLETE, function () {
                            _this.Recycle();
                        }, _this);
                        // setTimeout(()=>{
                        //     this.Recycle()
                        // }, 2000);
                    }
                    else {
                        ShakeTool.getInstance().shakeObj(_this, 1, 10, 10);
                        _this.setLocation();
                        _this.changeSizeByBlood();
                        _this.setLable();
                    }
                }
            });
        }
    };
    // 回收方法
    Enemy.prototype.Recycle = function () {
        this._enemy.removeEventListener(egret.Event.ENTER_FRAME, this.frame, this);
        if (this._rootView) {
            try {
                this.removeChild(this._enemy);
            }
            catch (e) {
            }
            try {
                this.removeChild(this._label);
            }
            catch (e) {
            }
            try {
                this.removeChild(this._endAction);
            }
            catch (e) {
            }
            this._rootView.removeChild(this);
        }
    };
    // 设置位置
    Enemy.prototype.setLocation = function () {
        this._enemy.x = this._location[0];
        this._enemy.y = this._location[1];
    };
    // 根据血量设置飞机大小
    Enemy.prototype.changeSizeByBlood = function () {
        this._enemy.scaleX = this._blood / this._sizeStandar > 1 ? this._blood / this._sizeStandar : 1;
        this._enemy.scaleY = this._blood / this._sizeStandar > 1 ? this._blood / this._sizeStandar : 1;
    };
    Enemy.prototype.setLable = function () {
        this._label.text = this._blood + '';
        if (this._blood > this._sizeStandar)
            this._label.size = 30 * (this._blood / this._sizeStandar < 1 ? this._blood / this._sizeStandar : 1);
        this._label.anchorOffsetX = this._label.width / 2;
        this._label.anchorOffsetY = this._label.height / 2;
        this._label.x = this._location[0];
        this._label.y = this._location[1];
    };
    // 血量显示
    Enemy.prototype.createBloodNumber = function () {
        //创建 TextField 对象
        this._label = new egret.TextField();
        //设置显示背景
        this._label.background = true;
        //设置背景颜色
        this._label.backgroundColor = 0xffffff;
        //设置显示边框
        this._label.border = true;
        //设置边框颜色
        this._label.borderColor = 0x00ff00;
        //设置字体
        this._label.fontFamily = "Arial";
        //设置文本颜色
        this._label.textColor = 0xFF0000;
        //设置字号
        this._label.size = 30;
        //设置显示文本
        this._label.text = this._blood + '';
        this._label.anchorOffsetX = this._label.width / 2;
        this._label.anchorOffsetY = this._label.height / 2;
        this._label.x = this._location[0];
        this._label.y = this._location[1];
        //添加到显示列表
        this.addChild(this._label);
    };
    return Enemy;
}(egret.DisplayObjectContainer));
__reflect(Enemy.prototype, "Enemy");
//# sourceMappingURL=enemy.js.map