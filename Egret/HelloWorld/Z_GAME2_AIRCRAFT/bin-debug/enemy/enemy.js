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
// TypeScript file
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(root, boomOtion) {
        var _this = _super.call(this) || this;
        _this._speed = 5;
        _this.IsUse = true;
        _this._enemyConfig = boomOtion;
        _this._rootview = root;
        _this._blood = _this._enemyConfig.blood;
        _this._flyMovieClip = _this._enemyConfig.flyData !== undefined && _this._enemyConfig.flyTemp !== undefined;
        console.log(_this._flyMovieClip);
        // 如果没有同时配置敌人飞行的MovieClip则换成贴图
        if (!_this._flyMovieClip) {
            _this._bitmap = new egret.Bitmap(_this._enemyConfig.bitmapData);
            _this._rootview.addChild(_this._bitmap);
            // 如果有初始化敌人的坐标则取构造时传入的配置文件，如果没有取默认设置
            _a = _this._enemyConfig.beginLocation ? _this._enemyConfig.beginLocation : [_this._rootview.stage.stageWidth / 2, _this._rootview.stage.stageHeight / 15], _this._bitmap.x = _a[0], _this._bitmap.y = _a[1];
            _this._bitmap.addEventListener(egret.Event.ENTER_FRAME, _this.frame, _this);
        }
        else {
            var mcDataFactory = new egret.MovieClipDataFactory(_this._enemyConfig.flyData, _this._enemyConfig.flyTemp);
            _this._bitmap = new egret.MovieClip(mcDataFactory.generateMovieClipData(_this._enemyConfig.flyName));
            _this._rootview.addChild(_this._bitmap);
            _this._bitmap.gotoAndPlay(_this._enemyConfig.flyAction, -1);
            // 如果有初始化敌人的坐标则取构造时传入的配置文件，如果没有取默认设置
            _b = _this._enemyConfig.beginLocation ? _this._enemyConfig.beginLocation : [_this._rootview.stage.stageWidth / 2, _this._rootview.stage.stageHeight / 15], _this._bitmap.x = _b[0], _this._bitmap.y = _b[1];
            _this._bitmap.addEventListener(egret.Event.ENTER_FRAME, _this.frame, _this);
        }
        //创建 Tween 对象
        egret.Tween.get(_this._bitmap, {
            loop: true,
            onChange: _this.onChange,
            onChangeObj: _this //更新函数作用域
        })
            .to({ y: _this._rootview.stage.stageHeight }, 10000) //设置2000毫秒内 rotation 属性变为360
            .wait(1000) //设置等待1000毫秒
            .call(_this.onComplete, _this, ["param1", { key: "key", value: 3 }]); //设置回调函数及作用域，可用于侦听动画完成
        return _this;
        var _a, _b;
    }
    Enemy.prototype.onChange = function () {
        egret.log("onChange");
    };
    Enemy.prototype.onComplete = function (param1, param2) {
        egret.log("onComplete");
        egret.log(param1);
        egret.log(param2);
    };
    Enemy.prototype.removeEnemy = function () {
        this._enemyBoom.removeEventListener(egret.MovieClipEvent.COMPLETE, this.removeEnemy, this);
        this._rootview.removeChild(this._enemyBoom);
    };
    Enemy.prototype.frame = function () {
        var _this = this;
        // this._bitmap.y += this._speed;
        Object.keys(BulletCount.enemyBullet).forEach(function (index) {
            var isHit = _this._bitmap.hitTestPoint(BulletCount.enemyBullet[index].x, BulletCount.enemyBullet[index].y);
            if (isHit) {
                BulletCount.enemyBullet[index].Recycle();
                _this._blood--;
                if (!_this._blood) {
                    //如果没血了，飞机挂掉，换贴图
                    if (_this._bitmap.parent) {
                        var data = _this._enemyConfig.boomData;
                        var temp = _this._enemyConfig.boomTemp;
                        var mcDataFactory = new egret.MovieClipDataFactory(data, temp);
                        _this._enemyBoom = new egret.MovieClip(mcDataFactory.generateMovieClipData(_this._enemyConfig.boomName));
                        _this._enemyBoom.x = _this._bitmap.x;
                        _this._enemyBoom.y = _this._bitmap.y;
                        _this._bitmap.parent.removeChild(_this._bitmap);
                        _this._rootview.addChild(_this._enemyBoom);
                        _this._enemyBoom.gotoAndPlay(_this._enemyConfig.boomAction, _this._enemyConfig.loopTimes);
                        _this._enemyBoom.addEventListener(egret.MovieClipEvent.COMPLETE, _this.removeEnemy, _this);
                    }
                }
            }
        });
        // if(this.IsUse){
        //     if(this.)
        // }
    };
    Enemy.prototype.hitCheck = function () {
    };
    return Enemy;
}(egret.EventDispatcher));
__reflect(Enemy.prototype, "Enemy");
//# sourceMappingURL=enemy.js.map