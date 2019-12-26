
/**
 * 生成敌人
 */

class GenerateEnemy {
    public static normalEnemy(list:Array<string>,total:number,root:egret.DisplayObjectContainer){
        var repeat = total; 
        var timer = setInterval(() => {    
            if (repeat == 0) {
                clearInterval(timer);
            } else {
                repeat--;
                var bit = Common.createBitmapByName(list[Math.floor(Math.random()*list.length)]);
                var endAction = Common.createMovieClipByName('boom2','boom','start',1)
                var blood = Math.floor(Math.random()*total)
                var enemy = new Enemy(bit,endAction,root,6,blood)
                new EnemyController(0,enemy);
            }
        }, 2000);
    }
}
