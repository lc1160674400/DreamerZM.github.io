/**
 * 敌机控制类
 */

class EnemyController{
    private _controllerType:number;
    private _enemy:Enemy;
    public constructor(controllerType:number,enemy:Enemy){
        this._controllerType = controllerType;
        this._enemy = enemy;
        switch (this._controllerType){
            // 飞行直线
            case 0:
                var enemyBitmap = enemy._enemy;
                var speed = enemy._speed;
                enemyBitmap.addEventListener(egret.Event.ENTER_FRAME,this.straightLine,this)
                break;
        }
    }
    private straightLine(){
        this._enemy.y += this._enemy._speed;
    }
}