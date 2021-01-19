// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:

cc.Class({
    extends: cc.Component,

    properties: {
        id:0,
        Garbages:{
            default: null,
            type: cc.Node
        },
    },
    onLoad () {
      
       
    },

    start () {
        var self = this
        
        this.node.on(cc.Node.EventType.TOUCH_START,
            function(t){
                 var item  = self.Garbages.getComponent('ItemData')
                if(item.lajiTag==this.node.getComponent("Trash").tag){
                    console.log("对了")
                    item.Yeszhengque();
                }else{
                    console.log("错了")
                    item.NOcuowu();
                    
                }
        },this)
    },

    update (dt) {
       
        this.Garbages=cc.find("Canvas/Bg/lajiHome/Garbages")


    },
    
});
