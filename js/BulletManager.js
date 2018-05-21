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
var BulletManager = /** @class */ (function (_super) {
    __extends(BulletManager, _super);
    function BulletManager() {
        var _this = _super.call(this) || this;
        //创建主循环
        Laya.timer.frameLoop(1, _this, _this.onLoop);
        //给这个节点赋一个名字，方便在其他位置获取它
        _this.name = "bulletManager";
        return _this;
    }
    /**
     * 主循环
     * 移动子弹
     * 判断碰撞
     */
    BulletManager.prototype.onLoop = function () {
        //获取到子弹管理器中所有的子弹节点。
        //因为删除节点会改变数组的长度，而且会导致元素的移动，所以从最后一个元素开始遍历
        for (var i = this.numChildren - 1; i >= 0; i--) {
            var node = this.getChildAt(i);
            //虽然其中存放的都是Enemy对象，为了安全，还是添加一个判断条件
            if (node instanceof Bullet) {
                //将节点的类型断言为Bullet
                var bullet = node;
                //调用敌人的方法让它移动
                bullet.move();
                //判断与敌人的碰撞
                this.collideWithEnemy(bullet);
            }
        }
    };
    /**
     * 判断子弹碰撞
     * @param bullet 需要碰撞的子弹对象
     */
    BulletManager.prototype.collideWithEnemy = function (bullet) {
        if (bullet.camp == 1) {
            var enemyManager = Laya.stage.getChildByName("enemyManager");
            //获取到敌人管理器中所有的敌人节点。
            //因为删除节点会改变数组的长度，而且会导致元素的移动，所以从最后一个元素开始遍历
            for (var i = enemyManager.numChildren - 1; i >= 0; i--) {
                var node = enemyManager.getChildAt(i);
                //虽然其中存放的都是Enemy对象，为了安全，还是添加一个判断条件
                if (node instanceof Enemy) {
                    /**将节点的类型断言为Enemy */
                    var enemy = node;
                    if (bullet.isColliding(enemy)) {
                        //让敌人受到攻击
                        enemy.hit();
                        //子弹摧毁
                        bullet.destorySelf();
                    }
                }
            }
        }
        if (bullet.camp == -1) {
            var player = Laya.stage.getChildByName("player");
            //有可能玩家已经被摧毁，因此要判断玩家是否存在
            if (player && bullet.isColliding(player)) {
                player.destorySelf();
            }
        }
    };
    /**
     * 发射一个子弹
     * @param x 子弹的X坐标
     * @param y 子弹的Y坐标
     * @param xSpeed 子弹的X分速度
     * @param ySpeed 子弹的Y分速度
     * @param camp 子弹的阵营 1为玩家 -1为敌人
     */
    BulletManager.prototype.shoot = function (x, y, xSpeed, ySpeed, camp) {
        //从对象池中获取子弹对象
        var bullet = Laya.Pool.getItemByClass("bullet", Bullet);
        //对子弹进行初始化
        bullet.init(xSpeed, ySpeed, camp);
        //设置子弹的坐标
        bullet.pos(x, y);
        //将子弹添加到子弹管理器中
        this.addChild(bullet);
    };
    return BulletManager;
}(Laya.Sprite));
//# sourceMappingURL=BulletManager.js.map