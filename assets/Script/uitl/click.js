




cc.Class({
    extends: cc.Component,
  
    properties: {
        pageNode:{//要控制的蒙版
          default: null,
          type: cc.Node
        },
        allNodeContainer:{//要控制的界面
            default: null,
            type: cc.Node
        },
    },
    start () {
        // let FadeInFadeOur = require("FadeInFadeOur");
        // cc.vv.fadeInFadeOut = new FadeInFadeOur();
        // cc.vv.fadeInFadeOut.init();
        // fadeInFadeOut.init();
        this.pageNode.active = true;
        this.allNodeContainer.active = true;
        cc.find("Canvas/Bg").getComponent("FadeInFadeOut").init();
        cc.find("Canvas/Bg").getComponent("FadeInFadeOut").startFadeIn(this.pageNode,this.allNodeContainer)
    },
    onClick(){
        
    },
  
    onClickfalse () {
        cc.find("Canvas/Bg").getComponent("FadeInFadeOut").startFadeOut();
    },
  
  });