var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BulletCount = (function () {
    function BulletCount() {
    }
    BulletCount.e_update = function (index, data) {
        this.enemyBullet[index] = data;
    };
    BulletCount.e_remove = function (index) {
        delete this.enemyBullet[index];
    };
    BulletCount.enemyBullet = {};
    return BulletCount;
}());
__reflect(BulletCount.prototype, "BulletCount");
//# sourceMappingURL=bulletCount.js.map