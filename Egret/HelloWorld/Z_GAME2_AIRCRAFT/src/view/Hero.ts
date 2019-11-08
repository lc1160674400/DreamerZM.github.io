class Hero extends egret.EventDispatcher{
    private _src:egret.SpriteSheet
    private _rootView:egret.DisplayObjectContainer
    private static width:number = 100;
    private static height:number = 124;
    public hero:egret.MovieClip;
    private _action1:egret.MovieClip;
    private _action2:egret.MovieClip;
    private _timer:egret.Timer;
    public constructor(root:egret.DisplayObjectContainer,texture:egret.SpriteSheet){
        super();
        this._rootView = root;
        this._src = texture;
        // this.hero = new egret.Bitmap();
        // this.hero.texture = this._src.getTexture('hero');
        var data = RES.getRes('tes_json')
        var temp = RES.getRes('tes_png')
        var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, temp);
        this.hero = new egret.MovieClip(mcDataFactory.generateMovieClipData("aircraft"));
        // this._rootView.addChild(this._action1)
        this.hero.gotoAndPlay("fly", -1);
        this.hero.x = (this._rootView.stage.stageWidth - Hero.width) / 2;
        this.hero.y = (this._rootView.stage.stageHeight - Hero.height) / 4 * 3;
        this._rootView.addChild(this.hero);
        
        this._timer = new egret.Timer(2000);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this._timer.addEventListener(egret.TimerEvent.COMPLETE, this.timerComplete, this);
        this._timer.start();

        
    }
    private timerFunc(){
        var bullet = new Bullet(this._rootView);
        var x = this.hero.x + this.hero.width / 2 - 8;
        var y = this.hero.y - 25;
        bullet.Use(IdentityType.HERO, x, y)
    }
    private timerComplete(){
        console.log(2)
    }
    
}