var GlobalData = require("GlobalData")

cc.Class({
    extends: cc.Component,

    properties: {
        speed:1000,//回去的速度
        search_R:80,
        lajiTag:0,
        audioSource: {//音效
            type: cc.AudioClip,
            default: null
        },
    },
    start(){
        this.is_walking = false;
        this.animCtrl = this.node.getComponent(cc.Animation);
    },
    stop_walk(){
        this.is_walking = false;
    },
    // use this for initialization
    onLoad: function () {//开始拖动


        //禁止拖动
        return;
        this.startPos = this.node.convertToWorldSpaceAR(cc.v2(0,0))  //开始位置
        this.startPos2 = this.node.position //开始坐标
        // console.log("坐标", this.startPos2)
        // console.log("坐标2", this.startPos)



        this.endPos = cc.v2(0, 0);    //结束位置


        this.home=cc.find("Canvas/Bg/garbages")//垃圾们的父节点

        var self=this
        ///获取8个垃圾桶的位置
        self.fangzhipin=cc.find("Canvas/Bg/Trashs/fangzhipin")
        var tag1 = self.fangzhipin.getComponent("Trash").tag//纺织品id

        self.boli=cc.find("Canvas/Bg/Trashs/boli")
        var tag2 = self.boli.getComponent("Trash").tag//玻璃id

        self.zhizhang=cc.find("Canvas/Bg/Trashs/zhizhang")
        var tag3 = self.zhizhang.getComponent("Trash").tag//纸张id

        self.jinshu=cc.find("Canvas/Bg/Trashs/jinshu")
        var tag4 = self.jinshu.getComponent("Trash").tag//金属id

        self.shuliao=cc.find("Canvas/Bg/Trashs/shuliao")
        var tag5 = self.shuliao.getComponent("Trash").tag//塑料id

        self.canyu=cc.find("Canvas/Bg/Trashs/canyu")
        var tag6 = self.canyu.getComponent("Trash").tag//餐余id

        self.youhai=cc.find("Canvas/Bg/Trashs/youhai")
        var tag7 = self.youhai.getComponent("Trash").tag//有害id

        self.qita=cc.find("Canvas/Bg/Trashs/qita")
        var tag8 = self.qita.getComponent("Trash").tag//其他id


        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var delta = event.touch.getDelta();
            this.node.x += delta.x;
            this.node.y += delta.y;
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {//拖动结束执行返回最开始的位置
            this.endPos = cc.v2(event.getLocation().x, event.getLocation().y);
            


            var src = self.node.getPosition();
            var dst = self.fangzhipin.getPosition();

            console.log("我的位置",self.fangzhipin)
            var dir = dst.sub(src);
            var len = dir.mag();

            var src2 = self.node.getPosition();
            var dst2 = self.boli.getPosition();
            var dir2 = dst2.sub(src2);
            var len2 = dir2.mag();

            var src3 = self.node.getPosition();
            var dst3 = self.zhizhang.getPosition();
            var dir3 = dst3.sub(src3);
            var len3 = dir3.mag();

            var src4 = self.node.getPosition();
            var dst4 = self.jinshu.getPosition();
            var dir4 = dst4.sub(src4);
            var len4 = dir4.mag();

            var src5 = self.node.getPosition();
            var dst5 = self.shuliao.getPosition();
            var dir5 = dst5.sub(src5);
            var len5 = dir5.mag();

            var src6 = self.node.getPosition();
            var dst6 = self.canyu.getPosition();
            var dir6 = dst6.sub(src6);
            var len6 = dir6.mag();

            var src7 = self.node.getPosition();
            var dst7 = self.youhai.getPosition();
            var dir7 = dst7.sub(src7);
            var len7 = dir7.mag();

            var src8 = self.node.getPosition();
            var dst8 = self.qita.getPosition();
            var dir8 = dst8.sub(src8);
            var len8 = dir8.mag();
            console.log("我吐了",self.lajiTag)
            if(len<=self.search_R){
                if(self.lajiTag===tag1){
                    console.log("我是纺织品丢对了")
                    self.Yeszhengque();
                }else{
                    self.NOcuowu();
                    this.yidong2();
                    console.log("错了")
                }
            }else if (len2<=self.search_R){
                if(self.lajiTag===tag2){
                    console.log("我是玻璃对了")
                    self.Yeszhengque();
                }else{
                    self.NOcuowu();
                    this.yidong2();
                    console.log("错了")
                }
            }else if (len3<=self.search_R){
                if(self.lajiTag===tag3){
                    console.log("我是纸张丢对了")
                    self.Yeszhengque();
                    
                }else{
                    self.NOcuowu();
                    this.yidong2();
                    console.log("错了")
                }
            }else if (len4<=self.search_R){
                if(self.lajiTag===tag4){
                    console.log("我是金属丢对了")
                    self.Yeszhengque();
                    
                }else{
                    self.NOcuowu();
                    this.yidong2();
                    console.log("错了")
                }
            }else if (len5<=self.search_R){
                if(self.lajiTag===tag5){
                    console.log("我是塑料丢对了")
                    self.Yeszhengque();
                    
                }else{
                    self.NOcuowu();
                    this.yidong2();
                    console.log("错了")
                }
            }else if (len6<=self.search_R){
                if(self.lajiTag===tag6){
                    console.log("我是厨余丢对了")
                    self.Yeszhengque();
                    
                }else{
                    self.NOcuowu();
                    this.yidong2();
                    console.log("错了")
                }
            }else if (len7<=self.search_R){
                if(self.lajiTag===tag7){
                    console.log("我是有害丢对了")
                    self.Yeszhengque();
                    
                }else{
                    self.NOcuowu();
                    this.yidong2();
                    console.log("错了")
                }
            }else if (len8<=self.search_R){
                if(self.lajiTag===tag8){
                    console.log("我是其他丢对了")
                    self.Yeszhengque();
                }else{
                    self.NOcuowu();
                    this.yidong2();
                    console.log("错了")
                }
            }else{
                this.yidong2();
            }
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(t){//如果手指出屏幕外
            this.yidong2()
        },this);
    },
    guoguan(){
        cc.find("Canvas/Bg/achievement").getComponent("OnClick").onClickShow();//全部答完，游戏结束
        
    },  
    Yeszhengque(){
        GlobalData.integral+=GlobalData.Fraction;//分数增加
        GlobalData.complete+=1;//个数增加
        
        if(GlobalData.index<GlobalData.data.length){

            GlobalData.Number--;
            GlobalData.index++;

            cc.find("Canvas/Bg").getComponent("game").laji();//很重要的方法
            this.animCtrl.play('suofang');//播放动画
            cc.audioEngine.play(this.audioSource, false, 1);

        
            var animState = this.animCtrl.getAnimationState('suofang');
            if(GlobalData.Number==0){
                this.guoguan();
            }
            if (animState) {
                animState.on('stop', (event) => {
                    // 处理停止播放时的逻辑
                    this.node.destroy();//销毁对象
                    
                }, this);
            }
        }else{
            GlobalData.Number--;
            GlobalData.index++;
            this.animCtrl.play('suofang');//播放动画
             cc.audioEngine.play(this.audioSource, false, 1);
            var animState = this.animCtrl.getAnimationState('suofang');
            if(GlobalData.Number==0){
                this.guoguan();
            }
            if (animState) {
                animState.on('stop', (event) => {
                    // 处理停止播放时的逻辑
                    this.node.destroy();//销毁对象
                    
                }, this);
            }
        }
    },
    NOcuowu(){

        if(GlobalData.index<GlobalData.data.length){
            GlobalData.Number--;
            GlobalData.index++;
            cc.find("Canvas/Bg").getComponent("game").laji();//很重要的方法
            this.animCtrl.play('suofang');//播放动画
             cc.audioEngine.play(this.audioSource, false, 1);
            var animState = this.animCtrl.getAnimationState('suofang');
            if(GlobalData.Number==0){
                this.guoguan();
            }
            if (animState) {
                animState.on('stop', (event) => {
                    // 处理停止播放时的逻辑
                    this.node.destroy();//销毁对象
                }, this);
            }
        }else{
            GlobalData.Number--;
            GlobalData.index++;

            this.animCtrl.play('suofang');//播放动画
             cc.audioEngine.play(this.audioSource, false, 1);
            var animState = this.animCtrl.getAnimationState('suofang');
            if(GlobalData.Number==0){
                this.guoguan();
            }
            if (animState) {
                animState.on('stop', (event) => {
                    // 处理停止播放时的逻辑
                    this.node.destroy();//销毁对象 
                }, this);
            }
        }
    },

    yidong2(){//移动新算法，抛弃老算法的位置不稳定性，大大优化计算能力（推荐使用）(๑•̀ㅂ•́)و✧
        //计算玩家移动的时间
        var playTime =this.startPos.sub(this.endPos).mag()/ this.speed
        var action = cc.moveTo(playTime,this.startPos2);
        this.node.runAction(action);
    },

    yidong(){//移动老算法，由于updte每毫秒计算数据，导致位置参数很不稳定（现已抛弃，不推荐使用）o(╥﹏╥)o
        let dir = this.startPos.sub(this.endPos)
        let len = dir.mag();//计算之间的距离
        if(len<=0){
            return;
        }
        this.walk_time = len / this.speed;
        this.vx = this.speed * dir.x / len;
        this.vy = this.speed * dir.y / len;
        this.passed_time = 0;
        this.is_walking = true;//计时开始
    },
    // called every frame
    update: function (dt) {
        if(this.is_walking == false){
            return;
        }
        this.passed_time += dt;
        if(this.passed_time > this.walk_time){
            dt -=(this.passed_time - this.walk_time);
        }
        
        this.node.x += (this.vx * dt);
        this.node.y += (this.vy * dt);

        console.log('X',this.node.x)
        console.log('Y',this.node.y)
        console.log("坐标", this.startPos2)
        


        console.log('this.passed_time',this.passed_time)
        console.log('this.walk_time',this.walk_time)


        if(this.passed_time >= this.walk_time){
            this.is_walking = false;
        }
    },
});
