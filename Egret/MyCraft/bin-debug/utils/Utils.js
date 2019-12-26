var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var Common = (function () {
    function Common() {
    }
    Common.addToStage = function (parent, pic, option) {
        if (parent)
            parent.addChild(pic);
        if (option.x !== undefined && option.y !== undefined) {
            pic.x = option.x;
            pic.y = option.y;
        }
        if (option.width)
            pic.width = option.width;
        if (option.height)
            pic.height = option.height;
    };
    Common.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Common.createMovieClipByName = function (name, group, action, times) {
        var result = new egret.MovieClip();
        var json = RES.getRes(name + '_json');
        var png = RES.getRes(name + '_png');
        var Factory = new egret.MovieClipDataFactory(json, png);
        result = new egret.MovieClip(Factory.generateMovieClipData(group));
        // result.gotoAndPlay(action,times !== undefined?times:-1)
        return result;
    };
    return Common;
}());
__reflect(Common.prototype, "Common");
//# sourceMappingURL=Utils.js.map