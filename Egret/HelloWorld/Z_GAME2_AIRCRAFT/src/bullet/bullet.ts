class Bullet extends egret.DisplayObjectContainer {
    private static _ID:number = 0
    private _bulletBitMap:egret.Bitmap;
    public btype:IdentityType;
    public IsUse:boolean = false;
    private _main:egret.DisplayObjectContainer;
    private _speed:number = 5;
    private _bulletCountIndex:string;
    public constructor(main:egret.DisplayObjectContainer){
        super();
        this.width = 20;
        this.height = 28;
        this._main = main;
        this._bulletBitMap = new egret.Bitmap();
        this.addChild(this._bulletBitMap)
        Bullet._ID ++;
        this._bulletCountIndex = Bullet._ID + ''
        BulletCount.e_update(this._bulletCountIndex,this)

    }

    private frame(){
        // 逐帧动画
        if(this.IsUse){
            if(this.btype == IdentityType.ENEMY){
                this.y += this._speed;
                BulletCount.e_update(this._bulletCountIndex,this)
            }
            if(this.btype == IdentityType.HERO){
                this.y -= this._speed;
                BulletCount.e_update(this._bulletCountIndex,this)
                if(this.y <= 0){
                    if(this.parent){
                        this.parent.removeChild(this);
                        this.Recycle();
                    }
                }
            }
        }
    }
    public Recycle(){
        
        BulletCount.e_remove(this._bulletCountIndex)
        this.IsUse = false;
        this.removeEventListener(egret.Event.ENTER_FRAME,this.frame,this)
        if(this.parent){
            this.parent.removeChild(this);
            this.Recycle();
        }
    }
    public Use(type:IdentityType,x:number,y:number){
        this.IsUse = true;
        this.x = x;
        this.y = y;
        this.btype = type;
        if(type == IdentityType.ENEMY){
            this._bulletBitMap.texture = RES.getRes('bullet_png')
        }
        if(type == IdentityType.HERO){
            this._bulletBitMap.texture = RES.getRes('bullet_png')
        }
        
        this._main.addChildAt(this, 10)
        this.addEventListener(egret.Event.ENTER_FRAME, this.frame, this)
    }
}