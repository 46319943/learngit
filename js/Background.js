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
 * 创建一个精灵，这个精灵作为容器，存放其他精灵
 */
var Backgroung = /** @class */ (function (_super) {
    __extends(Backgroung, _super);
    function Backgroung() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    /**
     * 对背景进行初始化
     */
    Backgroung.prototype.init = function () {
        //实例化精灵对象
        this.bg1 = new Laya.Sprite();
        this.bg2 = new Laya.Sprite();
        //将精灵添加到精灵容器中
        this.addChild(this.bg1);
        this.addChild(this.bg2);
        //给精灵对象加载图片
        this.bg1.loadImage("war/background.png");
        this.bg2.loadImage("war/background.png");
        //设置第二个精灵的位置，在第一张的上方
        this.bg2.pos(0, -852);
        //创建帧循环，每一帧都移动图片
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    //定义帧循环的回调函数
    Backgroung.prototype.onLoop = function () {
        //让背景容器向下移动一个单位，那么容器中的精灵都会跟随移动
        this.y += 1;
        //因为容器中精灵的坐标是相对于存放它的容器而言的，即是相对坐标
        //因此容器的坐标+其中精灵的坐标 才是精灵的绝对坐标
        if (this.bg1.y + this.y >= 852) {
            //如果超过了边界，就让它往上移动两个背景长度单位
            this.bg1.y -= 852 * 2;
        }
        if (this.bg2.y + this.y >= 852) {
            this.bg2.y -= 852 * 2;
        }
    };
    return Backgroung;
}(Laya.Sprite));
//# sourceMappingURL=Background.js.map