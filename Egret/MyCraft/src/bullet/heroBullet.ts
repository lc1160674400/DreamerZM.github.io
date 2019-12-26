class HeroBullet {
    public static _count:Object = {};
    public static update(index:string,data:Bullet){
        HeroBullet._count[index] = data;
    }
    public static remove(index:string){
        delete HeroBullet._count[index]
    }
}