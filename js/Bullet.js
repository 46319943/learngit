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
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        return _super.call(this) || this;
    }
    /**
     * 根据传入的属性初始化子弹
     * @param xSpeed X分速度
     * @param ySpeed Y分速度
     * @param camp 子弹的阵营 1为玩家 -1为敌人
     */
    Bullet.prototype.init = function (xSpeed, ySpeed, camp) {
        //调用父类的初始化方法
        if (camp == 1) {
            _super.prototype.initate.call(this, "bullet1", true, 5);
        }
        else {
            _super.prototype.initate.call(this, "bullet2", true, 5);
        }
        //设置速度
        this.speed = [xSpeed, ySpeed];
        this.camp = camp;
        //播放动画，让子弹显示
        this.playAction("fly");
    };
    /**
     * 让子弹移动
     */
    Bullet.prototype.move = function () {
        //移动
        this.y -= this.speed[0] * this.camp;
        this.x -= this.speed[1] * this.camp;
        //如果移到了可显示的区域之外
        if (this.y < -50) {
            this.remove();
        }
        if (this.y > 1000) {
            this.remove();
        }
        if (this.x < -10 || this.x > 500) {
            this.remove();
        }
    };
    /**
     * 让子弹销毁
     */
    Bullet.prototype.destorySelf = function () {
        this.collision = false;
        this.body.stop();
        this.remove();
    };
    /**
     * 从容器中移除自己
     */
    Bullet.prototype.remove = function () {
        //从父节点中移除自己
        this.removeSelf();
        //将敌机放到对象池中
        Laya.Pool.recover("bullet", this);
    };
    return Bullet;
}(Entity));
//# sourceMappingURL=Bullet.js.map