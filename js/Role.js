var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 创建一个存放角色实例的精灵容器
 */
var Role = /** @class */ (function (_super) {
    __extends(Role, _super);
    function Role() {
        return _super.call(this) || this;
    }
    /**
     * 对角色进行初始化
     * @param _type 角色类型
     * @param _camp 角色阵营
     * @param _speed 角色移动速度
     * @param _hp 角色血量
     * @param _hitRadius 角色被击半径
     */
    Role.prototype.init = function (_type, _camp, _speed, _hp, _hitRadius) {
        //将参数中的值赋值给对象中的属性
        this.type = _type;
        this.camp = _camp;
        this.speed = _speed;
        this.hp = _hp;
        this.hitRadius = _hitRadius;
        /*
        //如果从对象池获取的容器已经初始化过了的话，容器中已经有实例化的对象，因此要删除它，删除子节点
        this.removeChildren();
        不需要删除，通过判断this.body是否定义来决定是否创建新的
        */
        if (!this.body) {
            //实例化
            this.body = new Laya.Animation();
            //将实例添加到容器中
            this.addChild(this.body);
        }
        //如果没有进行动画缓存的话就进行动画缓存
        if (!Role.Cached) {
            //创建动画效果的模版
            Laya.Animation.createFrames(["war/hero_fly1.png", "war/hero_fly2.png"], "hero_fly");
            Laya.Animation.createFrames(["war/hero_down1.png", "war/hero_down2.png",
                "war/hero_down3.png", "war/hero_down4.png"], "hero_down");
            Laya.Animation.createFrames(["war/enemy1_fly1.png"], "enemy1_fly");
            Laya.Animation.createFrames(["war/enemy1_down1.png", "war/enemy1_down2.png",
                "war/enemy1_down3.png", "war/enemy1_down4.png"], "enemy1_down");
            Laya.Animation.createFrames(["war/enemy2_fly1.png"], "enemy2_fly");
            Laya.Animation.createFrames(["war/enemy2_down1.png", "war/enemy2_down2.png",
                "war/enemy2_down3.png", "war/enemy2_down4.png"], "enemy2_down");
            Laya.Animation.createFrames(["war/enemy3_fly1.png", "war/enemy3_fly2.png"], "enemy3_fly");
            Laya.Animation.createFrames(["war/enemy3_down1.png", "war/enemy3_down2.png",
                "war/enemy3_down3.png", "war/enemy3_down4.png", "war/enemy3_down5.png",
                "war/enemy3_down6.png"], "enemy3_down");
            //缓存之后将标记换为真
            Role.Cached = true;
        }
        //播放动画，让角色动起来
        this.playAction("fly");
    };
    /**
     * 根据角色自身类型播放动画，并设置居中
     * @param action 动画的名字
     */
    Role.prototype.playAction = function (action) {
        //播放动画
        this.body.play(0, true, this.type + "_" + action);
        //获取机身在父类容器中的边界区域（一个矩形区域）
        /**机身的占据的区域边界 */
        var bound = this.body.getBounds();
        //将机身在容器中居中
        this.body.pos(-bound.width / 2, -bound.height / 2);
    };
    /**标记是否已经对动画进行缓存 */
    Role.Cached = false;
    return Role;
}(Laya.Sprite));
//# sourceMappingURL=Role.js.map