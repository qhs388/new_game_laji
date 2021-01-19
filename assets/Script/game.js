
var GlobalData = require("GlobalData")

cc.Class({
    extends: cc.Component,

    properties: {
        prefab: {//预制件
            default: null,
            type: cc.Prefab
        },
        lajimenPotin:{//垃圾们的位置
            default: null,
            type: cc.Node
        },
        home:{//父节点
            default: null,
            type: cc.Node
        },
        Number: {//剩余多少垃圾显示
            default: null,
            type: cc.Label
        },
        lajiduiLeft: {//垃圾堆左边图片
            default: null,
            type: cc.Sprite
        },
        lajiduiRight: {//垃圾堆右边图片
            default: null,
            type: cc.Sprite
        },
        gameRule:{//开始的说明
            default: null,
            type: cc.Node
        },
    },

    onLoad () {
        var token=this.getQueryVariable('token');
        if(token){
            localStorage.setItem('_Token',token)
        }
       
    },

    start () {
       if(GlobalData.data.length!=0){
        this.active()
       }
       this.gameStart()//游戏开始执行方法
    },
    active(){
        this.gameRule.active=false;
        cc.find("Canvas/Bg/mengban").active=false;
    },
    gameOver(){
        if (cc.sys.isMobile){
            window.history.back()               
        }else{
            console.log("游戏结束")
            cc.game.end()
        }
    },
    getQueryVariable(variable)
    {
           var query = window.location.search.substring(1);
           var vars = query.split("&");
           for (var i=0;i<vars.length;i++) {
                   var pair = vars[i].split("=");
                   if(pair[0] == variable){return pair[1];}
           }
           return(false);
    },
    gameStart(){


        GlobalData.data=[];//公共数据
        GlobalData.index=0;//公共数据的下标
        GlobalData.Number=0;//剩余多少垃圾
        GlobalData.integral=0;//积分
        GlobalData.complete=0;//完成个数

        


        var self = this
        //POST方法，获取垃圾数据
        let url = GlobalData.url+'/api/junkData'
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                var resData = JSON.parse(response);
                GlobalData.data=resData.data//把获取的垃圾数据，存在公共区里面
                GlobalData.Number = GlobalData.data.length;//存垃圾的个数
                self.Percentage()
                self.laji()
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send('');


        // //获取加的分数
        let url2 = GlobalData.url+'/api/keyData'
        var xhr2 = new XMLHttpRequest();
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState == 4 && (xhr2.status >= 200 && xhr2.status < 400)) {
                var response = xhr2.responseText;
               
                var resData = JSON.parse(response);

                GlobalData.Fraction = parseInt(resData.data);
            }
        };
        xhr2.open("POST", url2, true);
        xhr2.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr2.send('type=3');

    },
    Again(){//再玩一次
        cc.director.loadScene('game')
    },
    laji(){
        var self = this
        this.Number.string  = GlobalData.Number+''//把垃圾的个数显示出来

        if(GlobalData.index<GlobalData.data.length){
            var element=GlobalData.data[GlobalData.index]
            console.log("数据",element)
            var monster = cc.instantiate(self.prefab);
            self.Percentage()
            cc.loader.load({url:element.image,type:"png"},function(err,spriteFrame){
                if(err != null){
                    console.log('err',err)
                }
               
                monster.children[1].children[1].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(spriteFrame);
                
            });//更换图片外观
            monster.children[1].children[0].getComponent(cc.Label).string=element.name
            
           // monster.getComponent('drag').lajiTag=element.cid//给拖动的id

            monster.getComponent('ItemData').lajiTag=element.cid

            // var arrColor =[cc.color(233,71,9,255), cc.color(72,181,116,255), cc.color(72,113,181,255),cc.color(180,181,72,255), cc.color(181,72,72,255),cc.color(72,180,181,255), cc.color(172,72,181,255)]            

            // var number = this.randomNum(0,arrColor.length-1)
            // monster.children[0].color = arrColor[number]
            // #e94709   #48b574  #4871b5  #b4b548 #b54848       #48b4b5    #ac48b5
            monster.position=cc.find("Canvas/Bg/lajiHome/weizi").position
            monster.parent = self.home;
        }
    },
     randomNum(minNum,maxNum){ 
        switch(arguments.length){ 
            case 1: 
                return parseInt(Math.random()*minNum+1,10); 
            break; 
            case 2: 
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
            break; 
                default: 
                    return 0; 
            break; 
        } 
    },
    Percentage(){

       var Percentage = this.GetPercent(GlobalData.Number,GlobalData.data.length)
        var self = this 

        if(Percentage<=100&&Percentage>80){
            
            cc.loader.loadRes('img/jindu/90以上/left', cc.SpriteFrame, function (err, spriteFrame) {
                self.lajiduiLeft.spriteFrame = spriteFrame;
            });
            cc.loader.loadRes('img/jindu/90以上/right', cc.SpriteFrame, function (err, spriteFrame) {
                self.lajiduiRight.spriteFrame = spriteFrame;
            });

        }else if(Percentage<=80&&Percentage>60){
            cc.loader.loadRes('img/jindu/60-79/left', cc.SpriteFrame, function (err, spriteFrame) {
                self.lajiduiLeft.spriteFrame = spriteFrame;
            });
            cc.loader.loadRes('img/jindu/60-79/right', cc.SpriteFrame, function (err, spriteFrame) {
                self.lajiduiRight.spriteFrame = spriteFrame;
            });
            
        }else if(Percentage<=60&&Percentage>40){
            cc.loader.loadRes('img/jindu/40-59/left', cc.SpriteFrame, function (err, spriteFrame) {
                self.lajiduiLeft.spriteFrame = spriteFrame;
            });
            cc.loader.loadRes('img/jindu/40-59/right', cc.SpriteFrame, function (err, spriteFrame) {
                self.lajiduiRight.spriteFrame = spriteFrame;
            });

        }else if(Percentage<=40&&Percentage>20){
            
            cc.loader.loadRes('img/jindu/20-39/left', cc.SpriteFrame, function (err, spriteFrame) {
                self.lajiduiLeft.spriteFrame = spriteFrame;
            });
            cc.loader.loadRes('img/jindu/20-39/right', cc.SpriteFrame, function (err, spriteFrame) {
                self.lajiduiRight.spriteFrame = spriteFrame;
            });

        }else if(Percentage<=20&&Percentage>=0){
            cc.loader.loadRes('img/jindu/1-19/left', cc.SpriteFrame, function (err, spriteFrame) {
                self.lajiduiLeft.spriteFrame = spriteFrame;
            });
            cc.loader.loadRes('img/jindu/1-19/right', cc.SpriteFrame, function (err, spriteFrame) {
                self.lajiduiRight.spriteFrame = spriteFrame;
            });
        }
       console.log('当前百分比',Percentage);
    },

     GetPercent(num, total) {
        /// <summary>
        /// 求百分比
        /// </summary>
        /// <param name="num">当前数</param>
        /// <param name="total">总数</param>
        num = parseFloat(num);
        total = parseFloat(total);
        if (isNaN(num) || isNaN(total)) {
            return "-";
        }
        return total <= 0 ? 0: (Math.round(num / total * 10000) / 100.00);
    },

    dddd(){
        
        // var Base64 = {
        //     _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        //     // public method for encoding 
        //         encode: function encode(input) {
        //         var output = "";
        //         var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        //         var i = 0;
        //         //input = Base64._utf8_encode(input); //comment out to encode binary file(like image) 
            
        //         while (i < input.length) {
            
        //             chr1 = input[i++];
        //             chr2 = input[i++];
        //             chr3 = input[i++];
            
        //             enc1 = chr1 >> 2;
        //             enc2 = (chr1 & 3) << 4 | chr2 >> 4;
        //             enc3 = (chr2 & 15) << 2 | chr3 >> 6;
        //             enc4 = chr3 & 63;
            
        //             if (isNaN(chr2)) {
        //                 enc3 = enc4 = 64;
        //             } else if (isNaN(chr3)) {
        //                 enc4 = 64;
        //             }
        //             output = output + Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) + Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
        //         }
        //         return output;
        //         }
        //     };
        //     loadRemoteImg('http://rb.xingyunxc.com/api/junkData')


        //     console.log(element.image)



        //     function loadRemoteImg(url) {

        //         var img = null;
        //         var xmlhttp = new XMLHttpRequest();
        //         var xhr = xmlhttp;
        //         xhr.onreadystatechange = function () {
        //             if (xhr.readyState === 4 && xhr.status === 200) {
        //                 var blob = new Uint8Array(this.response);
                        
        //                 var img = new Image();
        //                 var base = "data:image/png;base64," + Base64.encode(blob);
                        
        //                 console.log('base',base)

        //                 img.src = base;
                        
        //                 var spriteFrame = monster.children[1].children[1].getComponent(cc.Sprite).spriteFrame
        //                 var texture=spriteFrame.getTexture();
        //                 var texture = new cc.Texture2D();
        //                 texture.generateMipmaps = false;
        //                 texture.initWithElement(img);
        //                 texture.handleLoae(dedTextur);
        //                 var newframe = new cc.SpriteFrame(texture);
        //                 monster.children[1].children[1].getComponent(cc.Sprite).spriteFrame = newframe;
        //             }
        //         };
        //         xmlhttp.open("GET", 'http://rb.xingyunxc.com///uploads/images/20190812/93b632feced008e9233c3236db99e51d.png',true);
                
        //         xhr.responseType = 'arraybuffer';
        //         xhr.send();
        //         };
    },

    update (dt) {

    },
    
});


