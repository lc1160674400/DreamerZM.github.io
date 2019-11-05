//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this._movePoint = new egret.Point(); //移动的位置
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        // on add to onAddToStage
        var imgLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, this.imgLoaderHandler, this);
        imgLoader.load('resource/Controller/back1.png');
        var imgLoader2 = new egret.ImageLoader;
        imgLoader2.once(egret.Event.COMPLETE, this.imgLoader2Handler, this);
        imgLoader2.load('resource/Controller/button1.png');
    };
    Main.prototype.imgLoaderHandler = function (event) {
        var bmd = event.currentTarget.data;
        var temp = new egret.Texture;
        temp.bitmapData = bmd;
        this.buttonBack1 = new egret.Bitmap(temp);
        this.buttonBack1.x = this.stage.$stageWidth * 0.1;
        this.buttonBack1.y = this.stage.$stageHeight * 0.6;
        this.addChild(this.buttonBack1);
    };
    Main.prototype.imgLoader2Handler = function (event) {
        var bmd = event.currentTarget.data;
        var temp = new egret.Texture;
        temp.bitmapData = bmd;
        this.button1 = new egret.Bitmap(temp);
        this.button1.x = this.stage.$stageWidth * 0.1 + Main._dis_max;
        this.button1.y = this.stage.$stageHeight * 0.6 + Main._dis_max;
        this.addChild(this.button1);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.handlerMove, this);
    };
    Main.prototype.touchMoveHandler = function (evt) {
        this._movePoint.x = evt.stageX;
        this._movePoint.y = evt.stageY;
        var dist = egret.Point.distance(this._startPoint, this._movePoint);
        if (dist <= Main._dis_max) {
            this.button1.x = this.stage.$stageWidth * 0.1 + Main._dis_max + this._movePoint.x - this._startPoint.x;
            this.button1.y = this.stage.$stageHeight * 0.6 + Main._dis_max + this._movePoint.y - this._startPoint.y;
        }
        else {
            var toPoint = egret.Point.interpolate(this._movePoint, this._startPoint, Main._dis_max / dist);
            this.button1.x = toPoint.x - 10;
            this.button1.y = toPoint.y - 10;
        }
    };
    //取消摇杆
    Main.prototype.cancelHandler = function (evt) {
        this.button1.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
        this.button1.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelHandler, this);
        this.button1.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.cancelHandler, this);
        this.button1.x = this.stage.$stageWidth * 0.1 + Main._dis_max;
        this.button1.y = this.stage.$stageHeight * 0.6 + Main._dis_max;
        egret.Tween.removeTweens(this.button1);
        egret.Tween.get(this.button1).to({ x: this.stage.$stageWidth * 0.1 + Main._dis_max, y: this.stage.$stageHeight * 0.6 + Main._dis_max }, 50, egret.Ease.backOut);
    };
    Main.prototype.handlerMove = function (event) {
        this._movePoint.x = event.stageX;
        this._movePoint.y = event.stageY;
        var dist = egret.Point.distance(new egret.Point(this.stage.$stageWidth * 0.1 + Main._dis_max, this.stage.$stageHeight * 0.6 + Main._dis_max), this._movePoint);
        if (dist <= Main._dis_max) {
            if (this._startPoint == null)
                this._startPoint = new egret.Point();
            this._startPoint.x = event.stageX;
            this._startPoint.y = event.stageY;
            this.button1.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
            this.button1.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.cancelHandler, this);
        }
        // this.button1.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelHandler, this);
        // switch(event.type){
        //     case egret.TouchEvent.TOUCH_MOVE:
        //         this.buttonMove(event.stageX,event.stageY);
        //         break;
        //     case egret.TouchEvent.TOUCH_BEGIN:
        //         this.buttonMove(event.stageX,event.stageY);
        //         this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.handlerMove,this)
        //         break;
        //     case egret.TouchEvent.TOUCH_END:
        //         this.buttonMove(this.stage.$stageWidth*0.1+Main._dis_max,this.stage.$stageHeight*0.6+Main._dis_max)
        //         this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.handlerMove,this)
        //         this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.handlerMove,this);
        //         break;
        // }
    };
    Main._dis_max = 40;
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map