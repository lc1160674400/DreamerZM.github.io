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
    function Bullet(main) {
        var _this = _super.call(this) || this;
        _this.IsUse = false;
        _this._speed = 5;
        _this.width = 20;
        _this.height = 28;
        _this._main = main;
        _this._bulletBitMap = new egret.Bitmap();
        _this.addChild(_this._bulletBitMap);
        Bullet._ID++;
        _this._bulletCountIndex = Bullet._ID + '';
        BulletCount.e_update(_this._bulletCountIndex, _this);
        return _this;
    }
    Bullet.prototype.frame = function () {
        // 逐帧动画
        if (this.IsUse) {
            if (this.btype == IdentityType.ENEMY) {
                this.y += this._speed;
                BulletCount.e_update(this._bulletCountIndex, this);
            }
            if (this.btype == IdentityType.HERO) {
                this.y -= this._speed;
                BulletCount.e_update(this._bulletCountIndex, this);
                if (this.y <= 0) {
                    if (this.parent) {
                        this.parent.removeChild(this);
                        this.Recycle();
                    }
                }
            }
        }
    };
    Bullet.prototype.Recycle = function () {
        BulletCount.e_remove(this._bulletCountIndex);
        this.IsUse = false;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.frame, this);
        if (this.parent) {
            this.parent.removeChild(this);
            this.Recycle();
        }
    };
    Bullet.prototype.Use = function (type, x, y) {
        this.IsUse = true;
        this.x = x;
        this.y = y;
        this.btype = type;
        if (type == IdentityType.ENEMY) {
            this._bulletBitMap.texture = RES.getRes('bullet_png');
        }
        if (type == IdentityType.HERO) {
            this._bulletBitMap.texture = RES.getRes('bullet_png');
        }
        this._main.addChildAt(this, 10);
        this.addEventListener(egret.Event.ENTER_FRAME, this.frame, this);
    };
    Bullet._ID = 0;
    return Bullet;
}(egret.DisplayObjectContainer));
__reflect(Bullet.prototype, "Bullet");
//# sourceMappingURL=bullet.js.map