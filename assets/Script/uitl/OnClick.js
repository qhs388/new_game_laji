cc.Class({
    extends: cc.Component,
  
    properties: {
        Interface:{//要控制的界面
          default: null,
          type: cc.Node
        },
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
    },
    onClick(){
      this.Interface.active = true;//显示界面
    },
  
    onClickfalse () {
      this.Interface.active = false;//隐藏界面
    },
    onClickShow(){
      this.pageNode.active = true;
      this.allNodeContainer.active = true;
      cc.find("Canvas/Bg").getComponent("FadeInFadeOut").init();
      cc.find("Canvas/Bg").getComponent("FadeInFadeOut").startFadeIn(this.pageNode,this.allNodeContainer)
  },

    onClickNone () {
        cc.find("Canvas/Bg").getComponent("FadeInFadeOut").startFadeOut();
    },
  
  });