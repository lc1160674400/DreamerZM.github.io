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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.speedX = 0; //人物移动速度
        _this.speedY = 0;
        _this.speed = 10;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        egret.lifecycle.addLifecycleListener(function (context) {
                            // custom lifecycle plugin
                            context.onUpdate = function () {
                            };
                        });
                        egret.lifecycle.onPause = function () {
                            egret.ticker.pause();
                        };
                        egret.lifecycle.onResume = function () {
                            egret.ticker.resume();
                        };
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("aircraft", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.onGroupComplete = function () {
        this._viewManager = new ViewManager(this, RES.getRes('aircraft_json'));
        this._hero = new Hero(this, RES.getRes('aircraft_json'));
        var frontBitMap = new egret.Bitmap(RES.getRes('c_front_png'));
        var backBitMap = new egret.Bitmap(RES.getRes('c_back_png'));
        this._rocker = new Rocker(this, frontBitMap, backBitMap);
        this._rocker.addEventListener("vj_start", this.onStart, this);
        this._rocker.addEventListener("vj_move", this.onChange, this);
        this._rocker.addEventListener("vj_end", this.onEnd, this);
        // 生成敌人
        this.generateEnemy();
    };
    Main.prototype.onStart = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    Main.prototype.onChange = function (e) {
        var angle = e.data;
        this.speedX = Math.cos(angle) * this.speed;
        this.speedY = Math.sin(angle) * this.speed;
    };
    Main.prototype.onEnd = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    Main.prototype.onEnterFrame = function () {
        this._hero.hero.x += this.speedX;
        this._hero.hero.y += this.speedY;
        this._hero.hero.x = this._hero.hero.x < 0 ? 0 : this._hero.hero.x;
        this._hero.hero.y = this._hero.hero.y < 0 ? 0 : this._hero.hero.y;
        this._hero.hero.x = this._hero.hero.x > this.stage.stageWidth - 50 ? this.stage.stageWidth - 50 : this._hero.hero.x;
        this._hero.hero.y = this._hero.hero.y > this.stage.stageHeight - 50 ? this.stage.stageHeight - 50 : this._hero.hero.y;
    };
    Main.prototype.generateEnemy = function () {
        var enemyConfig = {};
        var enemyBoomConfig1 = {
            bitmapData: RES.getRes('enemy_1_png'),
            boomName: 'enemy_boom',
            boomAction: 'boom',
            boomData: RES.getRes('enemy_boom_json'),
            boomTemp: RES.getRes('enemy_boom_png'),
            // flyName:'enemy_boom',
            // flyAction:'boom',
            // flyData:RES.getRes('enemy_boom_json'),
            // flyTemp:RES.getRes('enemy_boom_png'),
            loopTimes: 5,
            blood: 2,
            beginLocation: [100, 100],
        };
        var enemyBoomConfig2 = {
            bitmapData: RES.getRes('enemy_2_png'),
            boomName: 'enemy_boom',
            boomAction: 'boom',
            boomData: RES.getRes('enemy_boom_json'),
            boomTemp: RES.getRes('enemy_boom_png'),
            // flyName:'enemy_boom',
            // flyAction:'boom',
            // flyData:RES.getRes('enemy_boom_json'),
            // flyTemp:RES.getRes('enemy_boom_png'),
            loopTimes: 5,
            blood: 2,
            beginLocation: [500, 100],
        };
        var enemy = new Enemy(this, enemyBoomConfig1);
        var enemy = new Enemy(this, enemyBoomConfig2);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map