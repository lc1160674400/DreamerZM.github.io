// TypeScript file
class Common{
    public constructor(){

    }

    public static addToStage(parent:egret.DisplayObjectContainer,pic:egret.Bitmap,option?:{x:number,y:number,width?:number,height?:number}){
        if(parent) parent.addChild(pic)
        
        if(option.x !== undefined && option.y !== undefined) {
            pic.x = option.x;
            pic.y = option.y;
        }
        if(option.width) pic.width = option.width;
        if(option.height) pic.height = option.height;

    }

    public static createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    public static createMovieClipByName(name: string,group: string,action: string,times?:number){
        let result = new egret.MovieClip();
        let json = RES.getRes(name + '_json')
        let png = RES.getRes(name + '_png')
        var Factory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(json,png)
        result = new egret.MovieClip(Factory.generateMovieClipData(group))
        // result.gotoAndPlay(action,times !== undefined?times:-1)
        return result;
    }
}