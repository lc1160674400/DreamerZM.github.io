/**
 * 生成敌人
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GenerateEnemy = (function () {
    function GenerateEnemy() {
    }
    GenerateEnemy.normalEnemy = function (list, total, root) {
        var repeat = total;
        var timer = setInterval(function () {
            if (repeat == 0) {
                clearInterval(timer);
            }
            else {
                repeat--;
                var bit = Common.createBitmapByName(list[Math.floor(Math.random() * list.length)]);
                var endAction = Common.createMovieClipByName('boom2', 'boom', 'start', 1);
                var blood = Math.floor(Math.random() * total);
                var enemy = new Enemy(bit, endAction, root, 6, blood);
                new EnemyController(0, enemy);
            }
        }, 2000);
    };
    return GenerateEnemy;
}());
__reflect(GenerateEnemy.prototype, "GenerateEnemy");
//# sourceMappingURL=generateEnemy.js.map