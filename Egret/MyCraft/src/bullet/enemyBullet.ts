class EnemyBullet {
    public static _count:Object = {};
    public static update(index:string,data:Bullet){
        EnemyBullet._count[index] = data;
    }
    public static remove(index:string){
        delete EnemyBullet._count[index]
    }
}