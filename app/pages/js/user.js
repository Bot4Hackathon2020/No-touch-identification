window.onload = function() { document.body.className = ''; }
window.ontouchmove = function() { return false; }
window.onorientationchange = function() { document.body.scrollTop = 0; }

function welcome() {
    x = document.getElementById("welcome");
    setTimeout(function () {
        x.innerHTML = "欢迎访问脚本之家 www.jb51.net";//改变内容
        x.style.color="#ff0000"; //改变样式
    }, 3000);
}

const axios = require('axios');

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