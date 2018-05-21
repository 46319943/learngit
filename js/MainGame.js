/**
 * 程序的入口
 */
var MainGame = /** @class */ (function () {
    function MainGame() {
        //初始化引擎，设置宽高，并设置渲染方式
        //如果WebGL不能使用，则自动切换到canvas模式
        Laya.init(480, 852, Laya.WebGL);
        //显示性能统计信息
        Laya.Stat.show();
        //设置缩放模式为最小比例缩放
        Laya.stage.scaleMode = "showall";
        //设置水平对齐为居中
        Laya.stage.alignH = "center";
        //设置垂直对齐为居中
        Laya.stage.alignV = "center";
        //设置场景布局类型为自动横屏
        Laya.stage.screenMode = "vertical";
        //对资源进行预加载
        //加载的资源  加载完成的回调函数  加载进度的回调函数  加载资源的类型
        Laya.loader.load("res/atlas/war.atlas", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
        /*
        注意：
            一定要在图集资源的预加载完成之后再对动画进行缓存
            因为调用createFrames函数时，如果图集还未进行预加载，会导致创建失败
        */
    }
    /**
     * 加载资源完成的回调函数
     */
    MainGame.prototype.onLoaded = function () {
        //进行动画的缓存
        this.cacheAnimation();
        /**背景容器的实例化 */
        var bg = new Backgroung();
        //将背景容器添加到舞台上
        Laya.stage.addChild(bg);
        /**角色容器的实例化 */
        this.player = new Player();
        //设置角色容器的位置
        this.player.pos(200, 500);
        //将角色容器添加到舞台上
        Laya.stage.addChild(this.player);
        //敌人管理器创建
        this.enemyManager = new EnemyManager();
        //将敌人管理器添加到舞台上
        Laya.stage.addChild(this.enemyManager);
        //子弹管理器创建
        this.bulletManager = new BulletManager();
        //将子弹管理器添加到舞台上
        Laya.stage.addChild(this.bulletManager);
        //当资源加载完成之后，再调用创建敌人的函数
        this.enemyManager.createEnemy(5);
    };
    /**
     * 缓存动画
     */
    MainGame.prototype.cacheAnimation = function () {
        //创建动画效果的模版
        Laya.Animation.createFrames(["war/hero_fly1.png", "war/hero_fly2.png"], "hero_fly");
        Laya.Animation.createFrames(["war/hero_down1.png", "war/hero_down2.png",
            "war/hero_down3.png", "war/hero_down4.png"], "hero_down");
        Laya.Animation.createFrames(["war/enemy1_fly1.png"], "enemy1_fly");
        Laya.Animation.createFrames(["war/enemy1_down1.png", "war/enemy1_down2.png",
            "war/enemy1_down3.png", "war/enemy1_down4.png"], "enemy1_down");
        Laya.Animation.createFrames(["war/enemy2_fly1.png"], "enemy2_fly");
        Laya.Animation.createFrames(["war/enemy2_hit.png"], "enemy2_hit");
        Laya.Animation.createFrames(["war/enemy2_down1.png", "war/enemy2_down2.png",
            "war/enemy2_down3.png", "war/enemy2_down4.png"], "enemy2_down");
        Laya.Animation.createFrames(["war/enemy3_fly1.png", "war/enemy3_fly2.png"], "enemy3_fly");
        Laya.Animation.createFrames(["war/enemy3_hit.png"], "enemy3_hit");
        Laya.Animation.createFrames(["war/enemy3_down1.png", "war/enemy3_down2.png",
            "war/enemy3_down3.png", "war/enemy3_down4.png", "war/enemy3_down5.png",
            "war/enemy3_down6.png"], "enemy3_down");
        Laya.Animation.createFrames(["war/bullet1.png"], "bullet1_fly");
        Laya.Animation.createFrames(["war/bullet2.png"], "bullet2_fly");
    };
    return MainGame;
}());
//调用主程序
new MainGame();
//# sourceMappingURL=MainGame.js.map