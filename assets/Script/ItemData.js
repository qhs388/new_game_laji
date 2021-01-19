var GlobalData = require("GlobalData")

cc.Class({
    extends: cc.Component,

    properties: {
        lajiTag:0,
    },
    onLoad(){
        

    },
    start () {

    },
    Yeszhengque(){
        GlobalData.integral+=GlobalData.Fraction;//分数增加
        GlobalData.complete+=1;//个数增加
        
        if(GlobalData.index<GlobalData.data.length){

            GlobalData.Number--;
            GlobalData.index++;

            cc.find("Canvas/Bg").getComponent("game").laji();//很重要的方法
          
            if(GlobalData.Number==0){
                this.guoguan();
            }
            this.node.destroy();//销毁对象
        }else{
            GlobalData.Number--;
            GlobalData.index++;
            if(GlobalData.Number==0){
                this.guoguan();
            }
            this.node.destroy();//销毁对象
        }
    },
    NOcuowu(){

        if(GlobalData.index<GlobalData.data.length){
            GlobalData.Number--;
            GlobalData.index++;
            cc.find("Canvas/Bg").getComponent("game").laji();//很重要的方法
            if(GlobalData.Number==0){
                this.guoguan();
            }
            this.node.destroy();//销毁对象
        }else{
            GlobalData.Number--;
            GlobalData.index++;

            this.animCtrl.play('suofang');//播放动画
             cc.audioEngine.play(this.audioSource, false, 1);
            var animState = this.animCtrl.getAnimationState('suofang');
            if(GlobalData.Number==0){
                this.guoguan();
            }
            this.node.destroy();//销毁对象 
        }
    },
    
});
