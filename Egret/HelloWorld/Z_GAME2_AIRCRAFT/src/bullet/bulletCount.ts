class BulletCount{
    public static enemyBullet:Object = {};
    public static e_update(index:string,data:Bullet){
        this.enemyBullet[index] = data
    }
    public static e_remove(index:string){
        delete this.enemyBullet[index]
    }
}