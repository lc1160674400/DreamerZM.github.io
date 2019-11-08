// TypeScript file
class EnemyConfig extends Object{
    // 敌人爆炸类型
    boomData:any;   // movieClip data
    boomTemp:any;   // movieClip temp
    boomName:string;    // movieClip boomName
    boomAction:string;  // movieClip Action Name
    loopTimes:number;   // movieClip 循环次数
    blood:number;   //设置敌人血量
    flyData?:any;   // 飞行动画数据
    flyTemp?:any;   // 飞行动画json
    flyName?:string;    // movieClip flyName
    flyAction?:string;  // movieClip Action Name
    bitmapData?:any; // 贴图
    beginLocation?:[number,number]; // 初始位置
}