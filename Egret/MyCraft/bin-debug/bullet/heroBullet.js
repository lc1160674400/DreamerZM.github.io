var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HeroBullet = (function () {
    function HeroBullet() {
    }
    HeroBullet.update = function (index, data) {
        HeroBullet._count[index] = data;
    };
    HeroBullet.remove = function (index) {
        delete HeroBullet._count[index];
    };
    HeroBullet._count = {};
    return HeroBullet;
}());
__reflect(HeroBullet.prototype, "HeroBullet");
//# sourceMappingURL=heroBullet.js.map