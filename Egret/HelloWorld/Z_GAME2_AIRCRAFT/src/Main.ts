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

class Main extends egret.DisplayObjectContainer {



    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private async onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        // 加载静态资源
        const loadingView = new LoadingUI();
        this.stage.addChild(loadingView);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onGroupComplete,this)
        await RES.loadConfig("resource/default.res.json", "resource/");
        await RES.loadGroup("aircraft", 0, loadingView);
        this.stage.removeChild(loadingView);

    }
    private _viewManager:ViewManager
    private _hero:Hero
    private _rocker:Rocker
    private speedX = 0;         //人物移动速度
    private speedY = 0;
    private speed = 10;
    
    private onGroupComplete(){
        this._viewManager = new ViewManager(this,RES.getRes('aircraft_json'))
        this._hero = new Hero(this,RES.getRes('aircraft_json'))
        var frontBitMap:egret.Bitmap = new egret.Bitmap(RES.getRes('c_front_png'));
        var backBitMap:egret.Bitmap = new egret.Bitmap(RES.getRes('c_back_png'));
        this._rocker = new Rocker(this,frontBitMap,backBitMap);
        this._rocker.addEventListener("vj_start",this.onStart, this);
        this._rocker.addEventListener("vj_move", this.onChange, this);
        this._rocker.addEventListener("vj_end", this.onEnd, this);

        // 生成敌人
        this.generateEnemy();
    }
    private onStart(){
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }
    private onChange(e:egret.Event){
        var angle = e.data;
        this.speedX = Math.cos(angle)*this.speed;
        this.speedY = Math.sin(angle)*this.speed;
    }
    private onEnd(){
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }
    private onEnterFrame(){
            this._hero.hero.x  += this.speedX;
            this._hero.hero.y += this.speedY;
            this._hero.hero.x = this._hero.hero.x<0?0:this._hero.hero.x
            this._hero.hero.y = this._hero.hero.y<0?0:this._hero.hero.y
            this._hero.hero.x = this._hero.hero.x>this.stage.stageWidth-50?this.stage.stageWidth-50:this._hero.hero.x
            this._hero.hero.y = this._hero.hero.y>this.stage.stageHeight-50?this.stage.stageHeight-50:this._hero.hero.y
    }
    private generateEnemy(){
        var enemyConfig = {}
        var enemyBoomConfig1:EnemyConfig = {
            bitmapData:RES.getRes('enemy_1_png'),

            boomName:'enemy_boom',
            boomAction:'boom',
            boomData:RES.getRes('enemy_boom_json'),
            boomTemp:RES.getRes('enemy_boom_png'),

            // flyName:'enemy_boom',
            // flyAction:'boom',
            // flyData:RES.getRes('enemy_boom_json'),
            // flyTemp:RES.getRes('enemy_boom_png'),

            loopTimes:5,
            blood:2,
            beginLocation:[100,100],
        }
        var enemyBoomConfig2:EnemyConfig = {
            bitmapData:RES.getRes('enemy_2_png'),

            boomName:'enemy_boom',
            boomAction:'boom',
            boomData:RES.getRes('enemy_boom_json'),
            boomTemp:RES.getRes('enemy_boom_png'),

            // flyName:'enemy_boom',
            // flyAction:'boom',
            // flyData:RES.getRes('enemy_boom_json'),
            // flyTemp:RES.getRes('enemy_boom_png'),

            loopTimes:5,
            blood:2,
            beginLocation:[500,100],
        }
        var enemy = new Enemy(this,enemyBoomConfig1);

        var enemy = new Enemy(this,enemyBoomConfig2);
    }
}