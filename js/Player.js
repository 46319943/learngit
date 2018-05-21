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
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        /**子弹发射冷却 */
        _this.lastShootTime = Laya.Browser.now();
        _this.name = "player";
        _this.init();
        return _this;
    }
    Player.prototype.init = function () {
        //调用父类的初始化方法进行初始化
        _super.prototype.initate.call(this, "hero", true, 45);
        //播放动画，让角色动起来
        this.playAction("fly");
        //注册鼠标移动监听事件
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        //为了适配手机，监听鼠标进入事件
        Laya.stage.on(Laya.Event.MOUSE_OVER, this, this.onMouseMove);
        //创建循环，判断碰撞
        Laya.timer.loop(1, this, this.onLoop);
    };
    /**
     * 循环的回调函数，每一帧触发
     * 判断与敌机的碰撞
     */
    Player.prototype.onLoop = function () {
        //判断与敌人的碰撞
        var enemyManager = Laya.stage.getChildByName("enemyManager");
        //获取到敌人管理器中所有的敌人节点。
        //因为删除节点会改变数组的长度，而且会导致元素的移动，所以从最后一个元素开始遍历
        for (var i = enemyManager.numChildren - 1; i >= 0; i--) {
            var node = enemyManager.getChildAt(i);
            //虽然其中存放的都是Enemy对象，为了安全，还是添加一个判断条件
            if (node instanceof Enemy) {
                //将节点的类型断言为Enemy
                var enemy = node;
                if (this.isColliding(enemy)) {
                    enemy.destorySelf();
                    this.destorySelf();
                }
            }
        }
        //发射子弹
        //获取子弹管理器
        var bulletManager = Laya.stage.getChildByName("bulletManager");
        //获取当前时间
        var now = Laya.Browser.now();
        //上次发射的时间加上冷却时间，如果现在的时间已经过了
        if (now > this.lastShootTime + Player.COOLDOWN) {
            //增加上次发射的时间
            this.lastShootTime += Player.COOLDOWN;
            //用bulletManager来发射子弹
            bulletManager.shoot(this.x, this.y, 10, 5, 1);
            bulletManager.shoot(this.x + 25, this.y, 10, 0, 1);
            bulletManager.shoot(this.x - 25, this.y, 10, 0, 1);
            bulletManager.shoot(this.x, this.y, 10, -5, 1);
            bulletManager.shoot(this.x, this.y, 10, 0, 1);
            bulletManager.shoot(this.x, this.y, 0, 10, 1);
            bulletManager.shoot(this.x, this.y, 0, -10, 1);
        }
    };
    /**
     * 玩家被击毁
     */
    Player.prototype.destorySelf = function () {
        this.body.stop();
        this.body.once(Laya.Event.COMPLETE, this, this.onCompleteDown);
        this.playAction("down");
    };
    /**
     * 击毁动画播放完毕回调函数
     */
    Player.prototype.onCompleteDown = function () {
        //结束主循环
        Laya.timer.clear(this, this.onLoop);
        //清楚鼠标监听
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onMouseMove);
        //取消碰撞检测
        this.collision = false;
        //停止动画播放
        this.body.stop();
        //从父节点中移除
        this.removeSelf();
    };
    /**
     * 鼠标移动触发的函数
     * 为了适配手机，鼠标进入时也会触发
     */
    Player.prototype.onMouseMove = function () {
        //将英雄的坐标设置为鼠标在舞台上面的坐标
        this.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    };
    Player.COOLDOWN = 1000;
    return Player;
}(Entity));
//# sourceMappingURL=Player.js.map