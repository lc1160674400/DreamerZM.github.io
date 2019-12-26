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
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(hero, content, root, times) {
        var _this = _super.call(this) || this;
        _this.inUse = true;
        _this._rootView = root;
        _this._content = content;
        _this._hero = hero;
        _this._content.anchorOffsetX = _this._content.width / 2;
        _this._content.anchorOffsetY = _this._content.height / 2;
        _this._rootView.addChild(_this._content);
        _this._countId = Bullet.ID + '';
        HeroBullet.update(_this._countId, _this);
        // ID变量自增
        Bullet.ID++;
        // 设置子弹默认位置
        var x = hero._hero.x;
        var y = hero._hero.y;
        _this._content.x = x;
        _this._content.y = y - hero._hero.height / 5 * 4;
        // 子弹设置自动往前发射
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.frame, _this);
        // 自动连发子弹
        var tempBitmap = new egret.Bitmap(content.texture);
        if (times && times != -1 && times > 1) {
            setTimeout(function () {
                new Bullet(hero, tempBitmap, root, times - 1);
            }, hero._fireSpeed);
        }
        if (times == -1) {
            setTimeout(function () {
                new Bullet(hero, tempBitmap, root, -1);
            }, hero._fireSpeed);
        }
        return _this;
    }
    Bullet.prototype.frame = function () {
        if (this.inUse) {
            if (this._hero) {
                this._content.y -= this._hero._bulletSpeed;
                HeroBullet.update(this._countId, this);
                // 如果飞到屏幕尽头，销毁子弹
                if (this._content.y <= 0) {
                    this.Recycle();
                }
            }
        }
    };
    Bullet.prototype.Recycle = function () {
        HeroBullet.remove(this._countId);
        this.inUse = false;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.frame, this);
        if (this._rootView) {
            this._rootView.removeChild(this._content);
        }
    };
    Bullet.ID = 0;
    return Bullet;
}(egret.DisplayObjectContainer));
__reflect(Bullet.prototype, "Bullet");
//# sourceMappingURL=bullet.js.map