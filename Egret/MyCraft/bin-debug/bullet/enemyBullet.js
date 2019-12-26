var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EnemyBullet = (function () {
    function EnemyBullet() {
    }
    EnemyBullet.update = function (index, data) {
        EnemyBullet._count[index] = data;
    };
    EnemyBullet.remove = function (index) {
        delete EnemyBullet._count[index];
    };
    EnemyBullet._count = {};
    return EnemyBullet;
}());
__reflect(EnemyBullet.prototype, "EnemyBullet");
//# sourceMappingURL=enemyBullet.js.map