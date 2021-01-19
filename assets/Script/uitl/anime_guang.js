cc.Class({
    extends: cc.Component,

    properties: {
  
    },
    onLoad(){
        var animation = this.getComponent(cc.Animation)
        animation.play('shanguang')

    },
    start () {
    },
    // startAnime(){
    //     var animation = this.getComponent(cc.Animation)
    //     animation.play('fangguang')

    // },

    update (dt) {},
});
