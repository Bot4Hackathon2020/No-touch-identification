window.onload = function() { document.body.className = ''; }
window.ontouchmove = function() { return false; }
window.onorientationchange = function() { document.body.scrollTop = 0; }

function welcome() {
    x = document.getElementById("welcome");
    setTimeout(function () {
        x.innerHTML = "Hi~你好呀，我是智能机器人笨笨！";//改变内容
        talk("Hi~你好呀，我是智能机器人笨笨!")
    }, 3000);
    setTimeout(function () {
        x.innerHTML = "别看我叫笨笨，我可聪明着呢";//改变内容
        talk("别看我叫笨笨，我可聪明着呢")
    }, 6000);
    setTimeout(function () {
        x.innerHTML = "但最重要的是，我可以看见你有没有戴口罩噢，嘻嘻嘻~";//改变内容
        talk("但最重要的是，我可以看见你有没有戴口罩噢，嘻嘻嘻~")
    }, 9000);
    setTimeout(function () {
        x.innerHTML = "快快戴上口罩，不然不许和我聊天";//改变内容
        talk("快快戴上口罩，不然不许和我聊天")
    }, 15000);
}
welcome();

const axios = require('axios');
var Message="";
function chat(content) {
    Message=content;
    axios.post('http://openapi.tuling123.com/openapi/api/v2', {
        perception: {
            inputText: {
                text: Message
            },
        },
        userInfo: {
            // apiKey，需要修改成你在图灵机器人官网申请下来的apiKey
            apiKey: "6b46e978d2ba4de6b01c1f0f97901b95",
            userId: "1"
        }
      })
      .then(function (resp) {
        console.log("response", resp.data);
      }, (err) => {
        console.log(err);
    });
}

function talk(mess) {
    var msg = mess;
    var url = "http://tts.baidu.com/text2audio?cuid=baike&lan=ZH&ctp=1&pdt=301&vol=9&rate=32&per=0&tex=" + encodeURI(msg);
    var n = new Audio(url);
    n.play();
}
