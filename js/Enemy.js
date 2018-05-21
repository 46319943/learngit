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
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        return _super.call(this) || this;
    }
    /**
     * 根据传入的类型来设置敌机的属性
     * @param type 1为小飞机，3为大飞机
     */
    Enemy.prototype.init = function (type) {
        /**通过传入的type类型数值生成类型字符串 */
        var typeName = "enemy" + type;
        //调用父类的初始化方法
        _super.prototype.initate.call(this, typeName, true, Enemy.collisionInfo[type]);
        //根据类型查表设置值
        this.speed = Enemy.speedInfo[type];
        this.hp = Enemy.hpInfo[type];
        this.typeNumber = type;
        this.lastShootTime = Laya.Browser.now();
        //播放动画，让角色动起来
        this.playAction("fly");
    };
    /**
     * 根据速度移动自己
     */
    Enemy.prototype.move = function () {
        //移动
        this.y += this.speed;
        //如果移到了可显示的区域之外
        if (this.y > 1000) {
            this.remove();
        }
    };
    /**
     * 进行射击
     */
    Enemy.prototype.shoot = function () {
        if (this.typeNumber == 1) {
            return;
        }
        //发射子弹
        var bulletManager = Laya.stage.getChildByName("bulletManager");
        //获取当前时间
        var now = Laya.Browser.now();
        if (this.lastShootTime + Enemy.shootInfo[this.typeNumber] < now) {
            this.lastShootTime += Enemy.shootInfo[this.typeNumber];
            bulletManager.shoot(this.x, this.y, 10, 0, -1);
        }
    };
    /**
     * 让敌人被击毁
     */
    Enemy.prototype.destorySelf = function () {
        this.collision = false;
        this.body.stop();
        this.body.once(Laya.Event.COMPLETE, this, this.onCompleteDown);
        this.playAction("down");
    };
    /**
     * 击毁动画播放完成回调函数
     */
    Enemy.prototype.onCompleteDown = function () {
        this.body.stop();
        this.remove();
    };
    /**
     * 让敌人受到攻击
     */
    Enemy.prototype.hit = function () {
        this.hp -= 1;
        if (this.hp <= 0) {
            this.destorySelf();
            return;
        }
        this.body.stop();
        this.body.once(Laya.Event.COMPLETE, this, this.onCompleteHit);
        this.playAction("hit");
    };
    /**
     * 受到攻击动画播放完成回调函数
     */
    Enemy.prototype.onCompleteHit = function () {
        this.playAction("fly");
    };
    /**
     * 从容器中移除自己
     */
    Enemy.prototype.remove = function () {
        //从父节点中移除自己
        this.removeSelf();
        //将敌机放到对象池中
        Laya.Pool.recover("enemy", this);
    };
    //因为undefined和0在弱类型语言中都是假，为了避免发生意外，类型值从1开始。
    /**速度表，从角标为1开始 */
    Enemy.speedInfo = [0, 3, 2, 1];
    /**血量表，从角标为1开始 */
    Enemy.hpInfo = [0, 1, 3, 5];
    /**碰撞范围表，从角标1开始 */
    Enemy.collisionInfo = [0, 30, 35, 80];
    /**射击时间冷却表，从角标1开始 */
    Enemy.shootInfo = [0, 0, 3000, 1000];
    return Enemy;
}(Entity));
//# sourceMappingURL=Enemy.js.map