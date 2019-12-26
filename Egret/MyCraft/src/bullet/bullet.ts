class Bullet extends egret.DisplayObjectContainer{
    private _rootView:egret.DisplayObjectContainer;

    public _content:egret.Bitmap|egret.MovieClip;
    private static ID:number = 0;
    
    private _countId:string;
    private _countData:Bullet;

    private _hero:Hero;
    private inUse:boolean = true;
    // 子弹属性

    public _bulletNumber:number;    // 子弹数量 -1时无限发射子弹


    public constructor (hero:Hero,content:egret.Bitmap,root:egret.DisplayObjectContainer,times?:number){
        super()
        this._rootView = root;
        this._content = content;
        this._hero = hero;
        this._content.anchorOffsetX = this._content.width/2;
        this._content.anchorOffsetY = this._content.height/2;
        this._rootView.addChild(this._content)
        
        this._countId = Bullet.ID + ''
        HeroBullet.update(this._countId,this)
        
        // ID变量自增
        Bullet.ID++;

        // 设置子弹默认位置
        var x = hero._hero.x;
        var y = hero._hero.y;
        this._content.x = x;
        this._content.y = y-hero._hero.height/5*4;

        // 子弹设置自动往前发射
        this.addEventListener(egret.Event.ENTER_FRAME,this.frame,this)

        // 自动连发子弹
        let tempBitmap = new egret.Bitmap(content.texture);
        if(times && times != -1 && times > 1){
            setTimeout(function() {
                new Bullet(hero,tempBitmap,root,times-1)
            }, hero._fireSpeed);  
        }
        if(times == -1){
            setTimeout(function() {
                new Bullet(hero,tempBitmap,root,-1)
            }, hero._fireSpeed); 
        }
    }

    private frame(){
        if(this.inUse){
            if(this._hero){
                this._content.y -= this._hero._bulletSpeed;
                HeroBullet.update(this._countId,this)
                // 如果飞到屏幕尽头，销毁子弹
                if(this._content.y <= 0){
                    this.Recycle();
                }
            }
        }
    }
    public Recycle(){
        HeroBullet.remove(this._countId);
        this.inUse = false;
        this.removeEventListener(egret.Event.ENTER_FRAME,this.frame,this)
        if(this._rootView){
            this._rootView.removeChild(this._content);
        }
    }
}
