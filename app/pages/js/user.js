window.onload = function() { document.body.className = ''; }
window.ontouchmove = function() { return false; }
window.onorientationchange = function() { document.body.scrollTop = 0; }

function welcome() {
    x = document.getElementById("welcome");
    setTimeout(function () {
        x.innerHTML = "welcome";//改变内容
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



const {PythonShell}  = require("python-shell");

let MaskOptions = {
    mode: 'text',
    pythonPath: 'C:\\Users\\DRACO\\Anaconda3\\python.exe',
    pythonOptions: [],
    scriptPath: 'C:\\Users\\DRACO\\Downloads\\Mask-detector-master\\Mask-detector-master\\',
    args: []
};

let VoiceOptions = {
    mode: 'text',
    pythonPath: 'C:\\Users\\DRACO\\Anaconda3\\python.exe',
    pythonOptions: [],
    scriptPath: 'C:\\Users\\DRACO\\Downloads\\Mask-detector-master\\Mask-detector-master\\',
    args: []
};

var MaskDetectionResult;
var VoiceDetectionResult;
var text = document.getElementById("title");
function runMaskDetection(){
    return new Promise(resolve => {
        PythonShell.run(
            "mask.py", MaskOptions, function (err, results) {
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

checkButton.onclick = async function(){
    const result = await runMaskDetection();
    if(MaskDetectionResult == "no mask"){
        text.innerText = "没有口罩，说出 “重新检测”后重新检测";
        const restlt = runVoiceDetection();
        if(VoiceDetectionResult == "重新检测。"){
            const result = await runMaskDetection();
            text.innerText = "检测到口罩"
        }
    }
    if(MaskDetectionResult == "have mask"){
        text.innerText = "请通过"
    }
}

// document.getElementById("checkmask").onclick = runMaskDetection()



