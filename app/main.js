// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')

// 热加载
try {
  require('electron-reloader')(module,{});
} catch (_) {}

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    //将frame设为-没有标题栏
    //frame: false,
    //设置背景透明(Linux下好像会变黑)
    transparent:false,
    webPreferences: {
      //支持完整node
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.不要可以直接注释掉
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


//使用nodejs调用python程序的样例(使用子进程的方法)
// let pyProc = null
// let pyPort = null

// const createPyProc = () => {
//   let port = '4242'
//   let script = path.join(__dirname, 'py', 'api.py')
//   pyProc = require('child_process').spawn('python3', [script, port])
//   if (pyProc != null) {
//     console.log('child process success')
//   }
// }

// const exitPyProc = () => {
//   pyProc.kill()
//   pyProc = null
//   pyPort = null
// }

// app.on('ready', createPyProc)
// app.on('will-quit', exitPyProc)