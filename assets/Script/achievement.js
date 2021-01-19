var GlobalData = require("GlobalData")

cc.Class({
    extends: cc.Component,

    properties: {
        integral: {//分数显示
            default: null,
            type: cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.integral.string  = GlobalData.integral+''//把垃圾的分数显示出来
    },
    

    start () {

    },

    // update (dt) {},
});
