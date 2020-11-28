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
    setTimeout(function () {
        x.innerHTML = "";//改变内容
    }, 18000);
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


const {PythonShell}  = require("python-shell");

//path需要是绝对地址
let MaskOptions = {
    mode: 'text',
    pythonPath: '/usr/bin/python3',
    pythonOptions: [],
    scriptPath: '/data/home/chen/课件/project/No-touch-identification/app/py/model',
    args: []
};

let VoiceOptions = {
    mode: 'text',
    pythonPath: 'C:\\Users\\DRACO\\Anaconda3\\python.exe',
    pythonOptions: [],
    scriptPath: 'C:\\Users\\DRACO\\WebstormProjects\\No-touch-identification\\app\\py\\model',
    args: []
};

var MaskDetectionResult;
var VoiceDetectionResult;
var text = document.getElementById("title");
function runMaskDetection(){
    return new Promise(resolve => {
        PythonShell.run(
            "cv2mask.py", MaskOptions, function (err, results) {
                if (err) throw err;
                console.log('finish');
                console.log('results', results);
                MaskDetectionResult = results;
                resolve("ok");
            }
        )
    })
}

function runVoiceDetection(){
    return new Promise(resolve => {
        PythonShell.run(
            //todo
            "Baidu_api.py", VoiceOptions, function (err, results) {
                if (err) throw err;
                console.log('finish');
                console.log('results', results);
                VoiceDetectionResult = results;
                resolve("ok");
            }
        );
    });
}

// async function check() {
//     if(MaskDetectionResult[0] === "no mask"){
//         text.innerText = "没有口罩，说出 “重新检测”后重新检测";
//         const restlt = await runVoiceDetection();
//         if(VoiceDetectionResult[0] === "重新检测。"){
//             const result = runMaskDetection();
//             text.innerText = "检测到口罩"
//         }
//     }
//     if(MaskDetectionResult[0] === "have mask"){
//         text.innerText = "请通过"
//     }
// }

var checkButton = document.getElementById("checkmask");
var text = document.getElementById("text");

checkButton.onclick = async function(){
    const result = await runMaskDetection();
    if(MaskDetectionResult == "no mask"){
        text.innerText = "没有口罩，说出 “重新检测”后重新检测";
        talk("没有口罩，说出 “重新检测”后重新检测");
        const restlt = runVoiceDetection();
        if(VoiceDetectionResult == "重新检测。"){
            const result = await runMaskDetection();
            text.innerText = "检测到口罩";
            talk("检测到口罩");
            
        }
    }
    if(MaskDetectionResult == "have mask"){
        text.innerText = "请通过";
        talk("请通过")
    }
}

//语音识别
var AipSpeechClient = require("baidu-aip-sdk").speech;

// 设置APPID/AK/SK
var APP_ID = "20385348";
var API_KEY = "8G9EPeh6Rv58KEPgKO6Uk4Ka";
var SECRET_KEY = "ZypEqqbXtq1n99AYv5ChSNFmTfqucyLM";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);

var HttpClient = require("baidu-aip-sdk").HttpClient;

// 设置request库的一些参数，例如代理服务地址，超时时间等
// request参数请参考 https://github.com/request/request#requestoptions-callback
HttpClient.setRequestOptions({timeout: 5000});

// 也可以设置拦截每次请求（设置拦截后，调用的setRequestOptions设置的参数将不生效）,
// 可以按需修改request参数（无论是否修改，必须返回函数调用参数）
// request参数请参考 https://github.com/request/request#requestoptions-callback
HttpClient.setRequestInterceptor(function(requestOptions) {
    // 查看参数
    console.log(requestOptions)
    // 修改参数
    requestOptions.timeout = 5000;
    // 返回参数
    return requestOptions;
});

let fs = require('fs');
let voice = fs.readFileSync('//data/home/chen/课件/project/No-touch-identification/app/pages/voice/20201128_214838.m4a');

let voiceBuffer = new Buffer(voice);

// 识别本地文件
client.recognize(voiceBuffer, 'm4a', 16000).then(function (result) {
    console.log('<recognize>: ' + JSON.stringify(result));
}, function(err) {
    console.log(err);
});
