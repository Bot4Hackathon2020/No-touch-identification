// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
//上面好坑
const myNotification = new Notification('通知', {
    body: '启动'
  })
  
  myNotification.onclick = () => {
    console.log('Notification clicked')
}

// //测试nodejs调用python
// var zerorpc = require("zerorpc");
// var client = new zerorpc.Client();
// client.connect("tcp://127.0.0.1:4242");

// let name = document.querySelector('#name')
// let result = document.querySelector('#result')
// name.addEventListener('input', () => {
//   client.invoke("hello", name.value, (error, res) => {
//     if(error) {
//       console.error(error)
//     } else {
//       result.textContent = res
//     }
//   })
// })
// name.dispatchEvent(new Event('input'))
  
