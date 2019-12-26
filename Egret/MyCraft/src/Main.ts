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

    private onAddToStage(event: egret.Event) {

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

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        // 小游戏平台获取用户信息
        // await platform.login();
        // const userInfo = await platform.getUserInfo();
        // console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {

        // 创建背景
        var bgBitmap = this.createBitmapByName('background1_jpg')
        var bgCoverBitmap = this.createBitmapByName('cloud_png')
        var bg = new Background(bgBitmap,bgCoverBitmap,this);


        // 创建玩家飞机
        var heroMovieClip = this.createMovieClipByName('hero','aircraft','fly')
        var hero = new Hero({moveClip:heroMovieClip},bg,this)


        // 创建摇杆
        var controllerOption = {
            back:this.createBitmapByName('c_back_png'),
            front:this.createBitmapByName('c_front_png'),
        }
        var controller = new Controller(controllerOption,hero,this);
        
        // 创建子弹
        var bulletBitmap = this.createBitmapByName('bullet_png')
        // var bulletBitmap2 = this.createBitmapByName('c_front_png')
        var bullet = new Bullet(hero,bulletBitmap,this,-1)


        // 创建敌人
        // var enemyBitmap = this.createBitmapByName('enemy_1_png')
        // var enemy = new Enemy(enemyBitmap,this,10,20)
        GenerateEnemy.normalEnemy(['enemy_1_png','c_back_png'],20,this)

         //震动目标obj，1秒内震动20次，震动最大距离20
        // ShakeTool.getInstance().shakeObj(hero._hero, 1, 20, 20);

    }

    private ControllerListennerBegin(){

    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 根据name关键字创建MovieClip对象，根据actionname创建动作
     */
    private createMovieClipByName(name: string,group: string,action: string){
        let result = new egret.MovieClip();
        let json = RES.getRes(name + '_json')
        let png = RES.getRes(name + '_png')
        var Factory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(json,png)
        result = new egret.MovieClip(Factory.generateMovieClipData(group))
        result.gotoAndPlay(action,-1)
        return result;
    }

}