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
 * 实体类：具有基本的碰撞属性
 * 是一个容器，其中封装了一个Animation对象
 */
var Entity = /** @class */ (function (_super) {
    __extends(Entity, _super);
    function Entity() {
        var _this = _super.call(this) || this;
        //动画是精灵的子类
        /**实体的动画实例 用来显示主体 定义时就进行初始化*/
        _this.body = new Laya.Animation();
        //将主体添加到容器中
        _this.addChild(_this.body);
        return _this;
    }
    /**
     * 对实例进行初始化
     * @param typeName 实体名称
     * @param collision 是否可以碰撞
     * @param collisionRadius 实体碰撞半径
     */
    Entity.prototype.initate = function (typeName, collision, collisionRadius) {
        this.typeName = typeName;
        this.collision = collision;
        this.collisionRadius = collisionRadius;
    };
    /**
     * 判断两个实体是否发生了碰撞
     * @param entity 检测的实体
     */
    Entity.prototype.isColliding = function (entity) {
        //如果其中一个实体无法碰撞，那么则没发生碰撞
        if (!this.collision || !entity.collision) {
            return false;
        }
        /**
         * 两个实体之间的可以发生碰撞的距离
         * 这里的碰撞是按照矩形的形状进行检测，而不是按照圆形
         */
        var radius = this.collisionRadius + entity.collisionRadius;
        /**两个实体之间的X坐标之差 */
        var distanceX = Math.abs(this.x - entity.x);
        /**两个实体之间的Y坐标之差 */
        var distanceY = Math.abs(this.y - entity.y);
        //X坐标和Y坐标分别判断，因此是矩形判断
        return distanceX <= radius && distanceY <= radius;
    };
    /**
     * 播放与实体类型相应的动画，并设置居中
     * 注意这里调用play方法传入的是模版名，即缓存动画创建模版的时候注册的名字
     * 而不是图片名
     * 因此图片名不影响，只要注册时的名字对就可以了
     * @param action 动画的名称。
     */
    Entity.prototype.playAction = function (action) {
        //播放动画
        this.body.play(0, true, this.typeName + "_" + action);
        //获取机身在父类容器中的边界区域（一个矩形区域）
        /**机身的占据的区域边界 */
        var bound = this.body.getBounds();
        //将机身在容器中居中
        this.body.pos(-bound.width / 2, -bound.height / 2);
    };
    return Entity;
}(Laya.Sprite));
//# sourceMappingURL=Entity.js.map