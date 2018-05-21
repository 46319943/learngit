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
 * 敌人管理容器
 * 其中存放着Enemy对象
 * 用来对其中所有的对象进行移动等操作
 */
var EnemyManager = /** @class */ (function (_super) {
    __extends(EnemyManager, _super);
    function EnemyManager() {
        var _this = _super.call(this) || this;
        //创建主循环
        Laya.timer.frameLoop(1, _this, _this.onLoop);
        //给这个节点赋一个名字，方便在其他位置获取它
        _this.name = "enemyManager";
        return _this;
    }
    /**
     * 随机创建敌人
     * @param num 创建敌人的数量
     */
    EnemyManager.prototype.createEnemy = function (num) {
        //根据创建敌人数目进行对应次数的循环
        for (var i = 0; i < num; i++) {
            //从对象池中取出一个用enemy标识的Enemy对象
            var enemy = Laya.Pool.getItemByClass("enemy", Enemy);
            var random = Math.random();
            var type = random < 0.5 ? 1 : random < 0.9 ? 2 : 3;
            enemy.init(type);
            var x = Math.random() * 400 + 40;
            var y = Math.random() * 200 - 200;
            enemy.pos(x, y);
            this.addChild(enemy);
        }
    };
    /**
     * 帧循环调用的函数
     */
    EnemyManager.prototype.onLoop = function () {
        //获取到敌人管理器中所有的敌人节点。
        //因为删除节点会改变数组的长度，而且会导致元素的移动，所以从最后一个元素开始遍历
        for (var i = this.numChildren - 1; i >= 0; i--) {
            var node = this.getChildAt(i);
            //虽然其中存放的都是Enemy对象，为了安全，还是添加一个判断条件
            if (node instanceof Enemy) {
                //将节点的类型断言为Enemy
                var enemy = node;
                //调用敌人的方法让它移动
                enemy.move();
                //调用敌人的发射子弹方法
                enemy.shoot();
            }
        }
        //每60帧创建两个敌人
        //通过timer的currFrame属性获取当前帧数
        if (Laya.timer.currFrame % 120 === 0) {
            this.createEnemy(3);
        }
    };
    return EnemyManager;
}(Laya.Sprite));
//# sourceMappingURL=EnemyManager.js.map