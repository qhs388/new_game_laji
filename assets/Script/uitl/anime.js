cc.Class({
    extends: cc.Component,

    properties: {
  
    },
    onLoad(){
    },
    start () {
    },
    startAnime(){
        var animation = this.getComponent(cc.Animation)
        animation.play('suofang')
    },
    // endAnime(){
    //     var animation = this.getComponent(cc.Animation)
    //     animation.play('likaidonghua')
    // },
    update (dt) {},
});
