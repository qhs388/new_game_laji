
var GlobalData = require("GlobalData")
cc.Class({
    extends: cc.Component,

    properties: {
      
    },


    onLoad () {

    },
    panduan(){
        var token = localStorage.getItem('_Token')

        console.log('token',token)
        if(token){
            console.log('dsadsadsad',GlobalData.integral)
           if(GlobalData.integral<=0){
            cc.find("Canvas/Bg/tishi").getComponent("OnClick").onClickShow();//存在token就兑换
            cc.find("Canvas/Bg/achievement").getComponent("OnClick").onClickfalse();//存在token就兑换
           }else{
            cc.find("Canvas/Bg/achievement").getComponent("OnClick").onClickfalse();//存在token就兑换
            cc.find("Canvas/Bg/exchange").getComponent("OnClick").onClickShow();//存在token就兑换
             
           }
        }else{
            cc.find("Canvas/Bg/achievement").getComponent("OnClick").onClickfalse();//
            cc.find("Canvas/Bg/panduan").getComponent("OnClick").onClickShow();//

        }
    },


    start () {

    },

    // update (dt) {},
});
