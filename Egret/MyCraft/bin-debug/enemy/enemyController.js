/**
 * 敌机控制类
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EnemyController = (function () {
    function EnemyController(controllerType, enemy) {
        this._controllerType = controllerType;
        this._enemy = enemy;
        switch (this._controllerType) {
            // 飞行直线
            case 0:
                var enemyBitmap = enemy._enemy;
                var speed = enemy._speed;
                enemyBitmap.addEventListener(egret.Event.ENTER_FRAME, this.straightLine, this);
                break;
        }
    }
    EnemyController.prototype.straightLine = function () {
        this._enemy.y += this._enemy._speed;
    };
    return EnemyController;
}());
__reflect(EnemyController.prototype, "EnemyController");
//# sourceMappingURL=enemyController.js.map