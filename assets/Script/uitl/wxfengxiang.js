
var GlobalData = require("GlobalData")
var wx;


cc.Class({
    extends: cc.Component,

    properties: {
    
    },

    onLoad () {
        var self= this 

        let url = GlobalData.url+'/api/jsConfig'
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                var resData = JSON.parse(response);
               console.log('dsadsadsad',resData)
               

               var data={
                title:'垃圾分类从我做起',
                desc:'改变从习惯开始，试试看你能得几分？',
                link:resData.data.url,//分享链接
                imgUrl: GlobalData.url+'/web/h5/init/rule/logo.png',
                }

                self.wxConfig(resData.data,data)
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send( '');
    },
    wxConfig(config,data){
        var _th = this;
        console.log(config)
        wx.config(config);
        wx.ready(function(){
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            //share qq 朋友
            wx.updateAppMessageShareData({
                title: data.title, // 分享标题
                desc: data.desc, // 分享描述
                link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: data.imgUrl, // 分享图标
                success: function () {
                    // 设置成功
                }
            });
            //qq空间 朋友圈
            wx.updateTimelineShareData({
                title: data.title, // 分享标题
                link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: data.imgUrl, // 分享图标
                success: function () {
                    // 设置成功
                }
            })
        });


        wx.error(function(res){
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          alert(res);
        });

    },
    start () {

    },

    // update (dt) {},
});
