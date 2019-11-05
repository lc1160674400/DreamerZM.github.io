var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Rocker = (function () {
    function Rocker(root, frontBitMap, backBitMap) {
        this._rootView = root;
        this._backBitMap = backBitMap;
        this._frontBitMap = frontBitMap;
        this.centerX = this._rootView.stage.stageWidth / 4;
        this.centerY = this._rootView.stage.stageHeight / 4 * 3;
        this._backBitMap.x = this._frontBitMap.x = this.centerX;
        this._backBitMap.y = this._frontBitMap.y = this.centerY;
        this._backBitMap.anchorOffsetX = this._backBitMap.width / 2; // 设置锚点为中心点
        this._frontBitMap.anchorOffsetX = this._frontBitMap.width / 2;
        this._backBitMap.anchorOffsetY = this._backBitMap.height / 2;
        this._frontBitMap.anchorOffsetY = this._frontBitMap.height / 2;
        this._rootView.addChild(this._backBitMap);
        this._rootView.addChild(this._frontBitMap);
    }
    return Rocker;
}());
__reflect(Rocker.prototype, "Rocker");
//# sourceMappingURL=Rocker.js.map