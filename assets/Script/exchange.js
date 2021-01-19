var GlobalData = require("GlobalData")

cc.Class({
    extends: cc.Component,

    properties: {
        zimu: {//显示字
            default: null,
            type: cc.Label
        },
        title: {//显示字
            default: null,
            type: cc.Label
        },
        number: {//隐藏
            default: null,
            type: cc.Node
        },
        integral: {//分数显示
            default: null,
            type: cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var token = localStorage.getItem('_Token')

        console.log('token2',token)
        var fraction = GlobalData.complete+''
        
        var creds = "token=" + token + "&fraction=" + fraction;
        var self= this

        let url = GlobalData.url+'/api/exchangeIntegral'
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                var resData = JSON.parse(response);
                console.log('数据',resData)
                if(resData.code==200){
                    self.integral.string  = resData.data.integral+''//把垃圾的个数显示出来
                }else if(resData.code==201){
                    cc.find("Canvas/Bg/exchange/zimu").active = true;//显示界面  
                    self.title.string='兑换失败'
                    // self.zimu.active = true;//显示界面
                    self.zimu.string=resData.msg
                    self.number.active =false
                    
                }
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
        xhr.send(creds);
      
    },

    start () {

    },

    // update (dt) {},
});
