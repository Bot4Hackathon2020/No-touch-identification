window.onload = function() { document.body.className = ''; }
window.ontouchmove = function() { return false; }
window.onorientationchange = function() { document.body.scrollTop = 0; }

var path = require("path")
var fs = require('fs');

var filePath = path.resolve(__dirname, "../py/model/pics/");

count = 0
function displayimg(filedir) {
    var html = '    <div class="box">\n' +
        '        <div class="img" id="'+ 'pic' + count +'">\n' +
        '            <img src="'+filedir+'" class="img-responsive">\n' +
        '        </div>\n' +
        '    </div>';
    document.getElementById("list").innerHTML += html;
}

function scanImag(filePath){
    imgset = [];
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            files.forEach(function(filename){
                var filedir = path.join(filePath,filename);
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();
                        if(isFile){
                            console.log(filedir);
                            displayimg(filedir);
                        }
                    }
                })
            });
        }
    });
}

scanImag(filePath);

$(".img").click(function () {
    let _this = $(this).attr("id");//将当前的pimg元素作为_this传入函数
    imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);
});

$("#testpic").click(function(){
    console.log("1")
    var _this = $(this);//将当前的pimg元素作为_this传入函数
    imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);
});

function imgShow(outerdiv, innerdiv, bigimg, _this){
    var src = $(_this).attr("src");
    $(bigimg).attr("src", src);
    $(_this).attr("src", src).load(function(){
        var windowW = $(window).width();
        var windowH = $(window).height();
        var realWidth = this.width;
        var realHeight = this.height;
        var imgWidth, imgHeight;
        var scale = 0.8;
        if(realHeight>windowH*scale) {
            imgHeight = windowH*scale;
            imgWidth = imgHeight/realHeight*realWidth;
            if(imgWidth>windowW*scale) {
                imgWidth = windowW*scale;
            }
        } else if(realWidth>windowW*scale) {
            imgWidth = windowW*scale;
            imgHeight = imgWidth/realWidth*realHeight;
        } else {
            imgWidth = windowW * scale;
            imgHeight = windowH * scale;
        }
        $(bigimg).css("width",imgWidth);
        var w = (windowW-imgWidth)/2;
        var h = (windowH-imgHeight)/2;
        $(innerdiv).css({"top":h, "left":w, "align" : "center"});
        $(outerdiv).fadeIn("fast");
    });
    $(outerdiv).click(function(){//再次点击淡出消失弹出层
        $(this).fadeOut("fast");
    });
}