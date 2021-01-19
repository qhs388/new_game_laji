var GlobalData = require("GlobalData")
 
cc.Class({
    extends: cc.Component,
 
    properties: {
        cishu: {//次数显示
            default: null,
            type: cc.Label
        },
    },
 
    // LIFE-CYCLE CALLBACKS:
 
    onLoad () {
        // var token = localStorage.getItem('_Token')
        // var creds = "token=" + token;
        var self= this

        let url = GlobalData.url+'/api/surpluCount'
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                var resData = JSON.parse(response);
                self.cishu.string=resData.data.count
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
        xhr.send();  
    },
    start () {
 
    },
    // update (dt) {},
});